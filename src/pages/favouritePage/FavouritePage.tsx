import React, { useCallback, useEffect, useState } from "react";
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
import { searchProducts } from "../../helpers/seacrhProducts";
import { PageSizeFavourites } from "../../constants/pageSetting";

const FavouritePage = () => {
  const [globalState] = useGlobal();
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const updateFavourites = useCallback(() => {
    const search = searchParams.get("search");
    let query = searchParams;
    if (search && search !== "") {
      const newQuery = controlQueries([...query]);
      newQuery.push(["PageSize", "100"]);
      query = new URLSearchParams(newQuery);
    }

    getFavorites(query)
      .then((res) => {
        if (search) {
          searchProducts(
            res.products,
            searchParams,
            PageSizeFavourites,
            setPageCount,
            setCards
          );
        } else {
          setPageCount(res.pageCount || 1);
          setCards(res.products || []);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchParams]);

  const removeFavourite = (idRemove: string) => {
    const currentPage = Number(searchParams.get("PageNumber"));
    const newCards = cards.filter((card) => card.id !== idRemove);

    if (newCards.length === 0 && currentPage > 1) {
      const newQuery = controlQueries(
        [...searchParams],
        "PageNumber",
        String(currentPage - 1)
      );
      setSearchParams(newQuery);
    } else {
      updateFavourites();
    }
  };

  useEffect(() => {
    if (String(searchParams).length === 0) {
      setSearchParams(defaultParamsFavourite);
    } else {
      updateFavourites();
    }
  }, [searchParams, setSearchParams, updateFavourites]);

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
