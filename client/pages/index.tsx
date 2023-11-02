import styles from "../styles/Home.module.css";
import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import {
  ConnectWallet,
  darkTheme,
  useAddress,
  useContract,
} from "@thirdweb-dev/react";
import { contractID } from "../context/context";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const Home: NextPage = () => {
  const btnTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
      primaryButtonBg: "#121212",
      primaryButtonText: "#ffffff",
    },
  });

  const router = useRouter();

  const address = useAddress();

  const { contract } = useContract(contractID);
  const [IsOrganization, setIsOrganization] = useState(false);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const getOrganization = async () => {
      try {
        setLoading(true);
        const data = await contract?.call("isOrganization", [address]);
        setIsOrganization(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (!IsOrganization) getOrganization();
  }, [[], address, IsOrganization]);

  const HandleClick = () => {
    router.push("/create-organization");
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Navbar></Navbar>
        <div className={styles.app}>
          {Loading && <Loader />}
          <h1 className={styles.title}>
            Decentralized Certificates Integrity System
          </h1>
          <p className={styles.p}>
            A Decentralized and Secured Way To Issue & Verify Certificates.
          </p>

          {address ? (
            <div>
              {!IsOrganization && (
                <button className={styles.button} onClick={HandleClick}>
                  Create Organization
                </button>
              )}
            </div>
          ) : (
            <div className={styles.connect}>
              <ConnectWallet
                modalSize="compact"
                theme={btnTheme}
              ></ConnectWallet>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
