import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar></Navbar>
        <div className={styles.app}> 
          <h1 className={styles.title}>Decentralized Certificates Integrity System</h1>
          <p className={styles.p}>A Decentralized and Secured Way To Issue & Verify Certificates.</p>
        </div>
      </div>
    </main>
  );
};

export default Home;
