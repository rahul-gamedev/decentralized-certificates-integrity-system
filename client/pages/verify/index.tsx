import React from 'react'
import Navbar from '../../components/Navbar'
import styles from '../../styles/app.module.css'

const VerifyCertificate = () => {

  const Verify = () =>{

  }

  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      <form className={styles.form} action={Verify}>
          <h1 className={styles.title}>Verify Certificate</h1>
          <label>ID*</label>
          <input type='text' name='id'/>
          <button className={styles.button}>Verify</button>
        </form>
    
    </div>
  )
}

export default VerifyCertificate