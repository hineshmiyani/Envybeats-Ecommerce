import { loadStripe } from "@stripe/stripe-js";
let stripePromise: any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY || "");
  }
  return stripePromise;
};

export default getStripe;
