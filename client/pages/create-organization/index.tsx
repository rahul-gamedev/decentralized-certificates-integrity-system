import React from 'react'
import Navbar from '../../components/Navbar'
import styles from '../../styles/app.module.css'

const CreateOrganization = () => {

    const HandleAction = () =>{

    }

  return (
    <div>
        <div className={styles.container}>
        <Navbar></Navbar>
            <form className={styles.form} action={HandleAction} >
                <h1 className={styles.title}>Create Organization</h1>
                <label>Name of the Organization*</label>
                <input type='text' name='Name'/>
                <button className={styles.button}>Create</button>
            </form>
        </div>
    </div>
  )
}

export default CreateOrganization