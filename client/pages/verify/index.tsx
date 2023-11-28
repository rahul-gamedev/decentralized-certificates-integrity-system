import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";
import { useAddress, useContract } from "@thirdweb-dev/react";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";
import { useRouter } from "next/router";

const VerifyCertificate = () => {
  const router = useRouter();
  const { address, Contract, IsOrg, loading } = useAuthContext();

  const [Loading, setLoading] = useState(false);

  const [hash, setHash] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    router.push(`/verify/${hash}`);
  };

  return (
    <div>
      {(loading || Loading) && <Loader props={"Verify"} />}

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
      </div>
    </div>
  );
};

export default VerifyCertificate;
