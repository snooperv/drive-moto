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
import { cardProps } from "./cardProps";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "../../constants/pageSetting";

const JetSkiPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PageNumber = Number(searchParams.get("PageNumber")) || 1;
  const [cards, setCards] = useState<cardProps[]>([]);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    if (String(searchParams).length === 0)
      setSearchParams({
        PageNumber: String(PageNumber),
        PageSize: String(PageSize),
      });
  }, [PageNumber, searchParams, setSearchParams]);

  useEffect(() => {
    getProducts(searchParams).then((res) => {
      setPageCount(res.pageCount);
      setCards(res.products);
    });
  }, [searchParams]);

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    let query = [...searchParams];
    query[0][1] = String(page);
    setSearchParams(query);
  };

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
            {cards.length > 0 ? (
              cards.map((card, index) => (
                <Product
                  title={card.title}
                  price={card.price}
                  img={card.img}
                  isSale={card.actions.includes(0)}
                  isInInventory={card.isInInventory}
                  key={index}
                />
              ))
            ) : (
              <div className={styles.cards__empty}>
                К сожалению, список товаров пуст
              </div>
            )}
          </div>
          {cards.length !== 0 && (
            <Stack sx={{ alignItems: "center", margin: "40px 0" }}>
              <Pagination
                count={pageCount}
                shape="rounded"
                onChange={changePage}
                page={PageNumber}
                hidePrevButton={true}
                hideNextButton={true}
                sx={paginationStyles}
              />
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
};

const paginationStyles = {
  ".MuiPagination-ul": {
    gap: "10px",
  },
  ".MuiButtonBase-root": {
    fontFamily: "inherit",
    fontSize: "18px",
    padding: "20px 15px",
    backgroundColor: "#fff",

    "&.Mui-selected": {
      border: "2px solid #1C62CD",
      backgroundColor: "#fff",

      "&:hover": {
        backgroundColor: "#fff",
      },
    },
  },
};

export default JetSkiPage;
