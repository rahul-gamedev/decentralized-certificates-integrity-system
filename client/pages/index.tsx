import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import Loader from "../components/Loader";
import { useAuthContext } from "../context";

const Home: NextPage = () => {
  const btnTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      primaryButtonBg: "#121212",
      primaryButtonText: "#ffffff",
    },
  });

  const router = useRouter();

  const { address, IsOrg, loading } = useAuthContext();

  const HandleClick = () => {
    router.push("/create-organization");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar></Navbar>
        <div className={styles.app}>
          {loading && <Loader props={"Home Page"} />}
          <h1 className={styles.title}>
            Decentralized Certificates Integrity System
          </h1>
          <p className={styles.p}>
            A Decentralized and Secured Way To Issue & Verify Certificates.
          </p>
          <div style={{ display: "flex", width: "fit-content" }}>
            {!IsOrg && address && (
              <button className={styles.button} onClick={HandleClick}>
                Create Organization
              </button>
            )}
            <div className={styles.connect}>
              <ConnectWallet
                modalSize="compact"
                theme={btnTheme}
              ></ConnectWallet>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
