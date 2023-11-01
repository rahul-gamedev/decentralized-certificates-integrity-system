import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";


const Home: NextPage = () => {

  const btnTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
     
     primaryButtonBg:'#121212',
     primaryButtonText:"#ffffff"
    },
  });

  const router = useRouter();

  const HandleClick = () =>{
    router.push("/create-organization");
  }

  const address = useAddress();
  
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar></Navbar>
        <div className={styles.app}> 
          <h1 className={styles.title}>Decentralized Certificates Integrity System</h1>
          <p className={styles.p}>A Decentralized and Secured Way To Issue & Verify Certificates.</p>
        
          {address ? <button className={styles.button} onClick={HandleClick} >Create Organization</button> : <div className={styles.connect}><ConnectWallet  modalSize='compact' theme={btnTheme}></ConnectWallet></div>}
          
        </div>
      </div>
    </main>
  );
};

export default Home;
