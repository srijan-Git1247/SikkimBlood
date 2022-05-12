import Link from "next/link"
import {FaPencilAlt,FaTimes} from "react-icons/fa"
import styles from "../styles/ProfileRequest.module.css";

import React from 'react'

export default function ProfileRequest({evt,handleDelete}) {
  return (
    <div className={styles.event}>
        <h4>
            <Link href={`/requests/${evt.slug}`}>

                <a><span>Request:&nbsp;</span>{new Date(evt.date).toLocaleDateString("en-UK")}</a>
            </Link>
          <h5>
          <a><span>Venue:&nbsp;</span>{evt.venue}</a>
          </h5>
          <h5>
          <a><span>Address:&nbsp;</span>{evt.address}</a>
          </h5>




        </h4>
        
        <a href="#" className={styles.delete} onClick={()=>handleDelete(evt.id)}>
        <FaTimes/><span>Delete Request</span>
        </a>











        
    </div>
  )
}
