import React from "react";
import styles from "../favouritePage/favourite.module.scss";
import CustomBreadCrumbs from "../../components/breadcrumbs/CustomBreadCrumbs";
import CardsContent from "../../components/cards/cardsContent/CardsContent";
import { useGlobal } from "../../store";

const CartPage = () => {
  const [globalState] = useGlobal();

  return (
    <div className={styles.container}>
      <CustomBreadCrumbs />
      <div className={styles.title}>
        <span className={styles.title__username}>{globalState.username}</span>
        <span className={styles.title__text}>Корзина</span>
      </div>
      <div className={styles.content}>
        <CardsContent cards={globalState.cart} pageCount={1} />
      </div>
    </div>
  );
};

export default CartPage;
