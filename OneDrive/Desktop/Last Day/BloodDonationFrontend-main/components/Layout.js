import Head from "next/head";
import styles from "../styles/Layout.module.css"
import { Router, useRouter } from "next/dist/client/router";
import Header from "./Header";
import Footer from "./Footer";
import Featured from "./Featured";
export default function Layout({ title, keywords, description, children }) {


    const router=useRouter();
  return(
    <div className={styles.dve}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header/>
      {router.pathname==="/"&& <Featured/>}
    <div className={styles.container}>
        {children}
    </div>
    <Footer/>
      
    </div>
  );
}

Layout.defaultProps = {
  title: "Sikkim Blood | Create blood relations",
  description: "Request blood and donate",
  keywords: "blood,donate,request",
};
