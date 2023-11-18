import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";

const VerifyCertificate = () => {
  const { address, contract, IsOrg, loading } = useAuthContext();

  const [Loading, setLoading] = useState(false);

  const [hash, setHash] = useState("");
  const [verified, setVerified] = useState(Boolean);
  const [result, setResult] = useState([]);

  const Verify = async (hash: string) => {
    try {
      setLoading(true);
      const data = await contract?.call("VerifyCertificate", [hash]);
      setVerified(data[0]);
      setResult(data[1]);
      setLoading(false);
      console.log(data[0]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    Verify(hash);
  };

  return (
    <div>
      {Loading || (loading && <Loader />)}

      <div className={styles.container}>
        <Navbar></Navbar>
        <form className={styles.form}>
          <h1 className={styles.title}>Verify Certificate</h1>
          <label>ID*</label>
          <input
            type="text"
            name="id"
            onChange={(e) => {
              setHash(e.target.value);
            }}
          />
          <button className={styles.button} onClick={handleClick}>
            Verify
          </button>
        </form>

        {verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>Is Verified</label>
            <p>{verified.toString()}</p>
            <label>Hash</label>
            <p>{result[2]}</p>

            <label>Address</label>
            <p>{result[0]}</p>

            <label>Name</label>
            <p>{result[5]}</p>

            <label>Certificate Title</label>
            <p>{result[3]}</p>

            <label>Certificate Description</label>
            <p>{result[4]}</p>
          </div>
        )}

        {!verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>Is Verified</label>
            <p>{verified.toString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
