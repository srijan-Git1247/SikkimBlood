import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/RequestItem.module.css";

export default function RequestItem({ evt }) {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={`/images/BloodTypes/${evt.BloodType}.jpg`}
          width={150}
          height={150}
          className={styles.Image}
          alt=""
        ></Image>
      </div>
      <div className={styles.info}>
        <span>
          Required till: {new Date(evt.date).toLocaleDateString("en-UK")} <br></br> at{" "}
          {evt.venue}
        </span>
        <h3>{evt.name + "\t" + "(" + evt.BloodType + ")"}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/requests/${evt.slug}`}>
          <a className="btn">Check Details</a>
        </Link>
      </div>
    </div>
  );
}
