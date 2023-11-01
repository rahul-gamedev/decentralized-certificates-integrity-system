import React from 'react'
import icon from '../public/favicon.png'
import Image from 'next/image'
import styles from '../styles/Navbar.module.css'
import { ConnectWallet, darkTheme, useAddress } from "@thirdweb-dev/react";
import Link from 'next/link';

const Navbar = () => {
  const customTheme = darkTheme({
    fontFamily: "Inter, sans-serif",
    colors: {
     
     primaryButtonBg:'#121212',
     primaryButtonText:"#ffffff"
    },
  });

  const address = useAddress();


  return (
    <div className={styles.container}>
      <Link href='/' className={styles.icon}><Image className={styles.icon} src={icon} alt='Logo'></Image></Link>
      <ul className={styles.links}>
        <li><Link href='/verify'>Verify</Link></li>
        <li><Link href='/certificate'>Issue Certificate</Link></li>
        {address && <div className={styles.connect}><ConnectWallet  modalSize='compact' theme={customTheme}></ConnectWallet></div>}
      
      </ul>
    </div>
  )
}

export default Navbar