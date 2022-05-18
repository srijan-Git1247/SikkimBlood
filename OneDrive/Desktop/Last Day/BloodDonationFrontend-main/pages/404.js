
import Layout from '../components/Layout'
import {FaExclamationTriangle} from "react-icons/fa"
import styles from "../styles/404.module.css"
import Link from "next/link"
export default function NotFound() {
  return (
    <Layout title="Page Not Found">
        <div className={styles.error}>
        <h1><FaExclamationTriangle></FaExclamationTriangle>404</h1>
        <h4>Oops, That page does not exist</h4>
        <Link href="/">Go back home</Link>
        
        </div>
    </Layout>
  )
}