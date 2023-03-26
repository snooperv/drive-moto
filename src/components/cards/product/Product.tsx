import React, { useState } from "react";
import styles from "./product.module.scss";
import FavoriteIcon from "./FavouriteIcon/FavoriteIcon";
import buyIcon from "../../../assets/img/main/buy.svg";
import parsePrice from "../../../helpers/parsePrice";
import { useGlobal } from "../../../store";
import { removeFavorite, setFavorite } from "../../../services/products";
import FavoriteIconFilled from "./FavouriteIcon/FavoriteIconFilled";

const Product = (props: {
  id: string;
  title: string;
  price: number;
  isSale: boolean;
  isInInventory: boolean;
  img: string;
  isFavourite: boolean;
}) => {
  const [globalState] = useGlobal();
  const [isFavourite, setIsFavourite] = useState(props.isFavourite);

  const setFavourite = (id: string) => {
    void setFavorite(id);
    setIsFavourite(true);
  };

  const removeFavourite = (id: string) => {
    void removeFavorite(id);
    setIsFavourite(false);
  };

  return (
    <div className={styles.card}>
      {props.isSale && <span className={styles.sale}>SALE</span>}
      <div className={styles.card__favorite}>
        {globalState.token &&
          (isFavourite ? (
            <FavoriteIconFilled
              onClick={() => {
                removeFavourite(props.id);
              }}
            />
          ) : (
            <FavoriteIcon onClick={() => setFavourite(props.id)} />
          ))}
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