import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface Props {
  children: JSX.Element;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="layout">
      <Head>
        <title>Envy Beats Store</title>
      </Head>
      <header>
        <NavBar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
