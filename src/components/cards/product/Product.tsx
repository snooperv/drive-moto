import React, { useEffect, useState } from "react";
import styles from "./product.module.scss";
import FavoriteIcon from "./FavouriteIcon/FavoriteIcon";
import buyIcon from "../../../assets/img/main/buy.svg";
import parsePrice from "../../../helpers/parsePrice";
import { actions, useGlobal } from "../../../store";
import { removeFavorite, setFavorite } from "../../../services/products";
import FavoriteIconFilled from "./FavouriteIcon/FavoriteIconFilled";
import { cardProps } from "../cardsContent/cardProps";
import { useLocation } from "react-router";

const Product = (props: {
  product: cardProps;
  isSale: boolean;
  removeFavourite?: (idRemove: string) => void;
}) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [globalState] = useGlobal();
  const [isFavourite, setIsFavourite] = useState(props.product.isFavourite);
  const [isAddCart, setAddCart] = useState(false);

  useEffect(() => {
    setIsFavourite(props.product.isFavourite);
  }, [props.product.id, props.product.isFavourite]);

  const setFavourite = (id: string) => {
    void setFavorite(id).catch((error) => {
      console.log(error);
    });
    setIsFavourite(true);
  };

  const removeFavourite = (id: string) => {
    void removeFavorite(id)
      .then(() => {
        props.removeFavourite && props.removeFavourite(id);
      })
      .catch((error) => {
        console.log(error);
      });
    setIsFavourite(false);
  };

  const addCart = () => {
    setAddCart(true);
    actions.addCart(props.product);
    setTimeout(() => {
      setAddCart(false);
    }, 500);
  };

  return (
    <div className={styles.card}>
      {props.product && <span className={styles.sale}>SALE</span>}
      <div className={styles.card__favorite}>
        {globalState.token &&
          (isFavourite ? (
            <FavoriteIconFilled
              onClick={() => {
                removeFavourite(props.product.id);
              }}
            />
          ) : (
            <FavoriteIcon onClick={() => setFavourite(props.product.id)} />
          ))}
      </div>
      <div className={styles.card__image}>
        <div className={styles.card__hover}>посмотреть товар</div>
        <img src={props.product.img} alt="Фото товара" />
      </div>
      <div className={styles.card__description}>
        <div className={styles.card__title}>{props.product.title}</div>
        {props.product.isInInventory ? (
          <div className={styles.card__footer}>
            <div className={styles.card__price}>
              {parsePrice(props.product.price)} ₽
            </div>
            {currentPath === "/cart" ? (
              <div className={styles.card__removeFooter}>
                x
                {
                  globalState.cart.filter(
                    (item) => item.id === props.product.id
                  )[0].count
                }
                <div className={styles.card__removeButtons}>
                  <div
                    className={styles.card__remove}
                    onClick={() => actions.removeCart(props.product)}
                  >
                    Удалить
                  </div>
                  <div
                    className={styles.card__remove}
                    onClick={() => actions.removeCartAll(props.product)}
                  >
                    Удалить все
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.card__addFooter}>
                <span
                  className={
                    isAddCart
                      ? `${styles.card__addText} ${styles.card__addActive}`
                      : styles.card__addText
                  }
                >
                  + Добавлено
                </span>
                <div className={styles.card__buy} onClick={addCart}>
                  <img src={buyIcon} alt="Купить" />
                </div>
              </div>
            )}
          </div>
        ) : (
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
