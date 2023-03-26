import React, { useEffect, useState } from "react";
import styles from "./jetSki.module.scss";
import Promo from "../../components/jetSki/promo/Promo";
import Banner from "../../components/jetSki/banner/Banner";
import CustomBreadCrumbs from "../../components/breadcrumbs/CustomBreadCrumbs";
import SearchName from "../../components/jetSki/searchName/SearchName";
import PageTitle from "../../components/jetSki/pageTitle/PageTitle";
import Filters from "../../components/jetSki/filters/Filters";
import { getProducts } from "../../services/products";
import { cardProps } from "../../components/cards/cardsContent/cardProps";
import { useSearchParams } from "react-router-dom";
import { useGlobal } from "../../store";
import CardsContent from "../../components/cards/cardsContent/CardsContent";
import { controlQueries } from "../../helpers/controlQueries";
import { searchProducts } from "../../helpers/seacrhProducts";
import { defaultSearchParams } from "../../constants/defaultSearchParams";

const JetSkiPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const [globalState] = useGlobal();

  useEffect(() => {
    if (String(searchParams).length === 0) setSearchParams(defaultSearchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!globalState.updateDependencies) {
      const search = searchParams.get("search");
      let query = searchParams;
      if (search !== "") {
        const newQuery = controlQueries([...query]);
        newQuery.push(["PageSize", "100"]);
        query = new URLSearchParams(newQuery);
      }

      getProducts(query).then((res) => {
        if (!search) {
          setCards(res.products || []);
          setPageCount(res.pageCount || 1);
        } else {
          searchProducts(res, search, searchParams, setPageCount, setCards);
        }
      });
    }
  }, [globalState.updateDependencies, searchParams]);

  return (
    <div className={styles.container}>
      <CustomBreadCrumbs />
      <div className={styles.advert}>
        <Banner />
        <Promo />
      </div>
      <SearchName />
      <PageTitle />
      <div className={styles.mainContent}>
        <Filters />
        <CardsContent cards={cards} pageCount={pageCount} />
      </div>
    </div>
  );
};

export default JetSkiPage;
