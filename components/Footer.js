import Link from "next/link"
import styles from "../styles/Footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.footer}>
     <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/images/Foot.png" width="400" height="50" alt="" priority/>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            Donate Blood, Save Many Lives.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Hospitals</h1>
          <p className={styles.text}>
            Stnm Hospital,
            <br /> Sochakgang, East Sikkim
            <br /> 737101
          </p>
          <p className={styles.text}>
            Manipal Hospital
            <br /> Tadong, East Sikkim
            <br /> 737101
          </p>
          
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>About</h1>
          <p>Write Your Queries at sikkim.co.blood@gmail.com</p>
          <Link href="/about"> 
           <a> about</a>
          </Link>
        </div>
      </div>
    </div>
  </footer>
  )
}
