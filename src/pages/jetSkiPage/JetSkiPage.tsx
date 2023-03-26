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
import { PageSize } from "../../constants/pageSetting";
import { useGlobal } from "../../store";
import CardsContent from "../../components/cards/cardsContent/CardsContent";

const JetSkiPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  const [globalState] = useGlobal();

  useEffect(() => {
    if (String(searchParams).length === 0)
      setSearchParams({
        PageNumber: "1",
        PageSize: String(PageSize),
      });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!globalState.updateDependencies) {
      getProducts(searchParams).then((res) => {
        setPageCount(res.pageCount || 1);
        setCards(res.products || []);
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
