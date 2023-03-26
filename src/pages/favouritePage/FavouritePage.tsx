import React, { useEffect, useState } from "react";
import styles from "./favourite.module.scss";
import CustomBreadCrumbs from "../../components/breadcrumbs/CustomBreadCrumbs";
import { useGlobal } from "../../store";
import SearchName from "../../components/jetSki/searchName/SearchName";
import { getFavorites } from "../../services/account";
import { cardProps } from "../../components/cards/cardsContent/cardProps";
import CardsContent from "../../components/cards/cardsContent/CardsContent";
import { useSearchParams } from "react-router-dom";
import { defaultParamsFavourite } from "../../constants/defaultSearchParams";
import { controlQueries } from "../../helpers/controlQueries";

const FavouritePage = () => {
  const [globalState] = useGlobal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const removeFavourite = (idRemove: string) => {
    return new Promise((resolve) => {
      const currentPage = Number(searchParams.get("PageNumber"));
      const newCards = cards.filter((card) => card.id !== idRemove);

      if (newCards.length === 0 && currentPage > 1) {
        const newQuery = controlQueries(
          [...searchParams],
          "PageNumber",
          String(currentPage - 1)
        );
        resolve(newQuery);
      } else {
        const newQuery = controlQueries(
          [...searchParams],
          "PageNumber",
          String(pageCount)
        );
        getFavorites(new URLSearchParams(newQuery))
          .then((res) => {
            if (res.products.length > 0 && pageCount !== currentPage)
              newCards.push(res.products[0]);
            if (res.products.length === 1) setPageCount(res.pageCount - 1 || 1);
            setCards(newCards);
            resolve(false);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  useEffect(() => {
    if (String(searchParams).length === 0) {
      setSearchParams(defaultParamsFavourite);
    } else {
      getFavorites(searchParams)
        .then((res) => {
          setPageCount(res.pageCount || 1);
          setCards(res.products || []);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [searchParams, setSearchParams]);

  return (
    <div className={styles.container}>
      <CustomBreadCrumbs />
      <div className={styles.title}>
        <span className={styles.title__username}>{globalState.username}</span>
        <span className={styles.title__text}>Избранные товары</span>
      </div>
      <SearchName />
      <div className={styles.content}>
        <CardsContent
          cards={cards}
          pageCount={pageCount}
          removeFavourite={removeFavourite}
        />
      </div>
    </div>
  );
};

export default FavouritePage;
