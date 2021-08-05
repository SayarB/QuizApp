import Image from "next/image";
import loading from "../public/loading.svg";
import styles from "../styles/Loading.module.css";
export default function Loading() {
  return (
    <div className={styles.loading_container}>
      <Image
        src={loading}
        alt="Vercel Image"
        className={styles.loading_image}
      />
    </div>
  );
}
