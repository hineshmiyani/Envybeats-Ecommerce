import { nanoid } from "nanoid";
import Razorpay from "razorpay";
import { IProduct } from "../../lib/interfaces";

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZOR_PAY_KEY_SECRET,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    const payment_capture = 1;
    const amount = req?.body?.reduce(
      (prevValue: number, item: IProduct | any) => {
        return prevValue + item.price * item.quantity;
      },
      0
    );
    console.log("amount", amount);
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: nanoid(10),
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}
