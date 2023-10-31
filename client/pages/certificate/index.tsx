import React from 'react'
import Navbar from '../../components/Navbar'
import styles from '../../styles/app.module.css'

const CertificateIssue = () => {
  
  const Issue = () => {
  }

  return (
    <div>
      <div className={styles.container}>
      <Navbar></Navbar>
        <form className={styles.form} action={Issue}>
          <h1 className={styles.title}>Issue Certificate</h1>
          <label>Title*</label>
          <input type='text' name='title'/>

          <label>Description*</label>
          <input name='description' />

          <label>Recipient's Name*</label>
          <input name='name' />

          <label>Date of Issue*</label>
          <input name='date' type='date' />

          <button className={styles.button}>Issue</button>
        </form>
      </div>
    </div>
  )
}

export default CertificateIssue