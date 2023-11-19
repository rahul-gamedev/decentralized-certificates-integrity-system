import React from "react";
import icon from "../public/favicon.png";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useAuthContext } from "../context";

const Navbar = () => {
  const { address, IsOrg } = useAuthContext();

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.icon}>
        <Image className={styles.icon} src={icon} alt="Logo"></Image>
      </Link>
      <ul className={styles.links}>
        <li>
          <Link href="/verify">Verify</Link>
        </li>
        {address && IsOrg && (
          <li>
            <Link href="/certificate">Issue Certificate</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
