import React from "react";
import styles from "./product.module.scss";
import FavoriteIcon from "./FavoriteIcon";
import buyIcon from "../../../assets/img/main/buy.svg";
import parsePrice from "../../../helpers/parsePrice";

const Product = (props: {
  title: string;
  price: number;
  isSale: boolean;
  isInInventory: boolean;
  img: string;
}) => {
  return (
    <div className={styles.card}>
      {props.isSale && <span className={styles.sale}>SALE</span>}
      <div className={styles.card__favorite}>
        <FavoriteIcon />
      </div>
      <div className={styles.card__image}>
        <div className={styles.card__hover}>посмотреть товар</div>
        <img src={props.img} alt="Фото товара" />
      </div>
      <div className={styles.card__description}>
        <div className={styles.card__title}>{props.title}</div>
        {props.isInInventory && (
          <div className={styles.card__footer}>
            <div className={styles.card__price}>
              {parsePrice(props.price)} ₽
            </div>
            <div className={styles.card__buy}>
              <img src={buyIcon} alt="Купить" />
            </div>
          </div>
        )}
        {!props.isInInventory && (
          <div className={styles.card__footer}>
            <div className={styles.card__notAvailable}>нет в наличии</div>
            <div className={styles.card__report}>Сообщить о поступлении</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
