import React, { useEffect, useState } from "react";
import styles from "./favourite.module.scss";
import CustomBreadCrumbs from "../../components/breadcrumbs/CustomBreadCrumbs";
import { useGlobal } from "../../store";
import SearchName from "../../components/jetSki/searchName/SearchName";
import { getFavorites } from "../../services/account";
import { cardProps } from "../../components/cards/cardsContent/cardProps";
import CardsContent from "../../components/cards/cardsContent/CardsContent";
import { changePageCount, searchProducts } from "../../helpers/seacrhProducts";
import { useSearchParams } from "react-router-dom";
import { defaultParamsFavourite } from "../../constants/defaultSearchParams";
import { PageSizeFavourites } from "../../constants/pageSetting";
import { controlQueries } from "../../helpers/controlQueries";

const FavouritePage = () => {
  const [globalState] = useGlobal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);
  const [isRemove, setIsRemove] = useState("");

  useEffect(() => {
    if (isRemove) {
      const currentPage = Number(searchParams.get("PageNumber"));
      const newCards = cards.filter((card) => card.id !== isRemove);

      if (changePageCount(newCards, PageSizeFavourites) < currentPage) {
        const newQuery = controlQueries(
          [...searchParams],
          "PageNumber",
          String(currentPage - 1)
        );
        setSearchParams(newQuery);
        setPageCount(currentPage - 1);
      }

      searchProducts(
        newCards,
        searchParams,
        PageSizeFavourites,
        setPageCount,
        setCards
      );

      setIsRemove("");
    }
  }, [cards, isRemove, searchParams, setSearchParams]);

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
          setIdRemove={setIsRemove}
        />
      </div>
    </div>
  );
};

export default FavouritePage;
