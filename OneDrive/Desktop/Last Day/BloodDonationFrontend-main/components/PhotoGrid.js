import styles from "../styles/PhotoItem.module.css";
import Image from "next/image";
import Link from "next/link";

function PhotoGrid({ evt}) {
  return (
    <div className={styles.gridcontainer}>
      <div className={styles.griditem}>
        <Image
          className={styles.img}
          src={evt}
          width={150}
          height={150}
          alt=""
        ></Image>
      </div>
    </div>
  );
}

export default PhotoGrid;
