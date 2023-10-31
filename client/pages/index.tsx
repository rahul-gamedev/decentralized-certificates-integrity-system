import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { useSDK } from "@thirdweb-dev/react";
import { useEffect } from "react";

const Home: NextPage = () => {

  const router = useRouter();
  const sdk = useSDK();

  useEffect(() => {
    sdk?.wallet.isConnected()
  }, [])
  

  const HandleClick = () =>{
    router.push("/create-organization");
  }
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar></Navbar>
        <div className={styles.app}> 
          <h1 className={styles.title}>Decentralized Certificates Integrity System</h1>
          <p className={styles.p}>A Decentralized and Secured Way To Issue & Verify Certificates.</p>
          <button className={styles.button} onClick={HandleClick} >Create Organization</button>
        </div>
      </div>
    </main>
  );
};

export default Home;
