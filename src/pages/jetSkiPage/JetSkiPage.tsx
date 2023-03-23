import React, { useEffect, useState } from "react";
import styles from "./jetSki.module.scss";
import Promo from "../../components/jetSki/promo/Promo";
import Banner from "../../components/jetSki/banner/Banner";
import CustomBreadCrumbs from "../../components/jetSki/breadcrumbs/CustomBreadCrumbs";
import SearchName from "../../components/jetSki/searchName/SearchName";
import PageTitle from "../../components/jetSki/pageTitle/PageTitle";
import Filters from "../../components/jetSki/filters/Filters";
import Product from "../../components/jetSki/product/Product";
import { getProducts } from "../../services/data";
import { Pagination, Stack } from "@mui/material";

const JetSkiPage = () => {
  const PageSize = 9;
  const [cards, setCards] = useState<cardProps[]>([]);
  const [PageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    getProducts({ PageNumber, PageSize }).then((res) => {
      setCards(res);
    });
  }, [PageNumber]);

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
        <div className={styles.cardsContent}>
          <div className={styles.cards}>
            {cards.map((card, index) => (
              <Product
                title={card.title}
                price={card.price}
                img={card.img}
                isSale={card.actions.includes(0)}
                isInInventory={card.isInInventory}
                key={index}
              />
            ))}
          </div>
          <Stack spacing={2} sx={{ alignItems: "center", margin: "40px 0" }}>
            <Pagination
              count={2}
              shape="rounded"
              onChange={(e, page: number) => setPageNumber(page)}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

interface cardProps {
  title: string;
  price: number;
  actions: number[];
  isInInventory: boolean;
  brandId: string;
  countryId: string;
  id: string;
  img: string;
  isFavourite: boolean;
  isOnRequest: boolean;
  modelId: string;
}

export default JetSkiPage;
