import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";

import { useContractWrite } from "@thirdweb-dev/react";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";

const CertificateIssue = () => {
  const [Loading, setLoading] = useState(false);

  const [result, setResult] = useState("");

  const { address, contract, IsOrg, loading } = useAuthContext();

  const { mutateAsync: IssueCertificate } = useContractWrite(
    contract,
    "IssueCertificate"
  );

  const PublishCertificate = async (form: any) => {
    try {
      setLoading(true);
      const data = await IssueCertificate({
        args: [address, form.title, form.description, form.recipientName],
      });
      const hash = data.receipt.logs[0].data;
      setLoading(false);

      setResult(hash);
      console.log(hash);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const Issue = async (e: any) => {
    e.preventDefault();
    await PublishCertificate({ ...formData });
  };

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    recipientName: "",
  });

  return (
    <div>
      {Loading || (loading && <Loader props={"Certificate"} />)}

      <div className={styles.container}>
        <Navbar></Navbar>
        <form className={styles.form}>
          <h1 className={styles.title}>Issue Certificate</h1>
          <label>Title*</label>
          <input
            required
            type="text"
            name="title"
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
            }}
          />

          <label>Description*</label>
          <input
            required
            name="description"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
          />

          <label>Recipient Name*</label>
          <input
            required
            name="name"
            onChange={(e) => {
              setFormData({ ...formData, recipientName: e.target.value });
            }}
          />

          <button className={styles.button} onClick={Issue}>
            Issue
          </button>
        </form>
        {result && (
          <div className={styles.form}>
            <h1 className={styles.title}>Result</h1>
            <label>Hash</label>
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificateIssue;
