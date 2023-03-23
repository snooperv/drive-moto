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
import { useNavigate, useParams } from "react-router";

const JetSkiPage = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const PageSize = 9;
  const currentPage = Number(page) || 1;
  const [cards, setCards] = useState<cardProps[]>([]);
  const [PageNumber, setPageNumber] = useState<number>(currentPage);
  const [pageCount, setPageCount] = useState<number>(1);

  useEffect(() => {
    getProducts({ PageNumber, PageSize }).then((res) => {
      setPageCount(res.pageCount);
      setCards(res.products);
    });
  }, [PageNumber]);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
    navigate(`/jet-skis/${page}`);
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
