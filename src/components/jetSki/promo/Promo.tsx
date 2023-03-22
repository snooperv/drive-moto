import React from "react";
import styles from "./promo.module.scss";
import promo from "../../../assets/img/main/promo.png";

const Promo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.description}>акция</div>
      <div className={styles.priceNew}>190 000 &#8381;</div>
      <div className={styles.priceOld}>
        <span>225 000 &#8381;</span>
      </div>
      <div className={styles.content}>
        <div>
          <img src={promo} alt="Акция" />
        </div>
        <span>Лодочный мотор Suzuki DF9.9BRS</span>
      </div>
      <div className={styles.footer}>
        <span className={styles.footer__text}>Акция действует до</span>
        <span className={styles.footer__date}>31.08.2020</span>
      </div>
    </div>
  );
};

export default Promo;
