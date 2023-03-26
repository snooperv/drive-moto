import React, { useEffect, useState } from "react";
import styles from "./favourite.module.scss";
import CustomBreadCrumbs from "../../components/breadcrumbs/CustomBreadCrumbs";
import { useGlobal } from "../../store";
import SearchName from "../../components/jetSki/searchName/SearchName";
import { getFavorites } from "../../services/account";
import { cardProps } from "../../components/cards/cardsContent/cardProps";
import CardsContent from "../../components/cards/cardsContent/CardsContent";

const FavouritePage = () => {
  const [globalState] = useGlobal();
  const [cards, setCards] = useState<cardProps[]>([]);

  useEffect(() => {
    getFavorites().then((res) => {
      setCards(res || []);
    });
  }, []);

  console.log(cards);

  return (
    <div className={styles.container}>
      <CustomBreadCrumbs />
      <div className={styles.title}>
        <span className={styles.title__username}>{globalState.username}</span>
        <span className={styles.title__text}>Избранные товары</span>
      </div>
      <SearchName />
      <div className={styles.content}>
        <CardsContent cards={cards} pageCount={1} />
      </div>
    </div>
  );
};

export default FavouritePage;
