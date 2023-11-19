import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";
import { useRouter } from "next/router";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircle } from "react-icons/io5";

const VerifyCertificate = () => {
  const router = useRouter();
  const hash = router.query.hashId;

  const { Contract, loading } = useAuthContext();

  const [Loading, setLoading] = useState<boolean>();

  const [verified, setVerified] = useState(Boolean);
  const [result, setResult] = useState([]);

  const Verify = async (hash: string | string[] | undefined) => {
    setLoading(true);
    try {
      if (hash != undefined) {
        console.log("Verifying..");
        const data = await Contract?.call("VerifyCertificate", [hash]);
        setVerified(data[0]);
        setResult(data[1]);
        setLoading(false);
        console.log(data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!verified && hash) Verify(hash);
  }, [hash, []]);

  return (
    <div>
      {Loading && <Loader props={"Verify"} />}

      <div className={styles.container}>
        <Navbar></Navbar>
        {verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>
              Verification Status:{" "}
              {verified && <FaCheckCircle style={{ color: "green" }} />}
            </label>
            <br />
            <label>Name</label>
            <p>{result[5]}</p>

            <label>Certificate Title</label>
            <p>{result[3]}</p>

            <label>Certificate Description</label>
            <p>{result[4]}</p>

            <label>Hash</label>
            <p>{result[2]}</p>

            <label>Issuer Address</label>
            <p>{result[0]}</p>
          </div>
        )}

        {!verified && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>

            <label>
              Verification Status:{" "}
              {verified && <IoCloseCircle style={{ color: "red" }} />}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyCertificate;
