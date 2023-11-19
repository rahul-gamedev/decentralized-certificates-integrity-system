import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import styles from "../../styles/app.module.css";
import { useContractWrite } from "@thirdweb-dev/react";
import Loader from "../../components/Loader";
import { useAuthContext } from "../../context";
import { useRouter } from "next/router";

const CreateOrganization = () => {
  const { address, Contract, IsOrg, loading } = useAuthContext();

  const { mutateAsync: CreateOrganization } = useContractWrite(
    Contract,
    "CreateOrganization"
  );

  const [Loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    website: "",
    email: "",
  });

  const router = useRouter();

  const PublishOrganization = async (form: any) => {
    try {
      console.log("Publishing...");

      setLoading(true);
      const data = await CreateOrganization({
        args: [address, form.name, form.type, form.website, form.email],
      });
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw new Error("Error");

      console.log(error);
    }
  };

  const HandleAction = (e: any) => {
    e.preventDefault();
    PublishOrganization({ ...formData });
  };

  return (
    <div>
      {(Loading || loading) && <Loader props={"Create Organization"} />}

      <div className={styles.container}>
        <Navbar></Navbar>
        <form className={styles.form}>
          <h1 className={styles.title}>Create Organization</h1>
          <label>Name of the Organization*</label>
          <input
            type="text"
            name="Name"
            required
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />

          <label>Type of Organisation*</label>
          <input
            type="text"
            name="type"
            required
            onChange={(e) => {
              setFormData({ ...formData, type: e.target.value });
            }}
          />

          <label>Website*</label>
          <input
            type="text"
            name="website"
            required
            onChange={(e) => {
              setFormData({ ...formData, website: e.target.value });
            }}
          />

          <label>Email*</label>
          <input
            type="email"
            name="email"
            required
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <button className={styles.button} onClick={HandleAction}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
