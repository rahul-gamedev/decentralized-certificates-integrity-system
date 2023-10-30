import Image from 'next/image'
import styles from './page.module.css'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link href={"/certificate"} className='button'>Certificate Issuance</Link>
      <Link href={"/verify"} className='button'>Verify</Link>
    <div/>
  )
}
