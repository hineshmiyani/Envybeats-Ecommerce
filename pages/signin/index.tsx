import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from "next-auth/react";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { IProvider } from "../../lib/interfaces";
import styles from "./signin.module.css";
import { useStateContext } from "../../context/StateContext";

interface Props {
  providers:
    | {
        google: IProvider;
        facebook: IProvider;
      }
    | undefined;
}

const icons: any = {
  facebook: <BsFacebook />,
  google: <FcGoogle />,
};

const SignIn: React.FC<Props> = ({ providers }) => {
  const [providersList, setProvidersList] = useState<IProvider[] | any>(null);
  const { setShowCart } = useStateContext();

  useEffect(() => {
    let providerList =
      providers &&
      Object.values(providers)?.map((provider: IProvider) => {
        let providerId: "facebook" | "google" | string = provider.id;
        return {
          ...provider,
          className: `${provider?.id}Login`,
          icon: icons[providerId],
        };
      });

    setShowCart(false);
    setProvidersList(providerList);
  }, []);

  return (
    <div className={styles.signIn}>
      <div className={styles.signInBox}>
        <h1 className={styles.boxTitle}>Log in to see more</h1>
        {providersList &&
          providersList?.map((provider: IProvider) => (
            <div key={provider?.id}>
              <button
                className={
                  styles.authProvider + " " + styles?.[provider?.className]
                }
                onClick={() => signIn(provider?.id)}
              >
                <span className={styles.providerIcon}>{provider?.icon}</span>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req } = ctx;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
      props: {
        providers: {},
      },
    };
  }

  return {
    props: {
      providers: await getProviders(),
    },
  };
};

export default SignIn;
