import React, { MutableRefObject, useRef } from "react";
import styles from "./cardsContent.module.scss";
import Product from "../product/Product";
import { Pagination, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { cardProps } from "./cardProps";

const CardsContent = (props: { cards: cardProps[]; pageCount: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const PageNumber = Number(searchParams.get("PageNumber")) || 1;
  const mainRef = useRef() as MutableRefObject<HTMLDivElement>;

  const changePage = (e: React.ChangeEvent<unknown>, page: number) => {
    mainRef.current.scrollIntoView();
    let query = [...searchParams];
    query[0][1] = String(page);
    setSearchParams(query);
  };

  return (
    <div className={styles.container} ref={mainRef}>
      <div className={styles.cards}>
        {props.cards.length > 0 ? (
          props.cards.map((card, index) => (
            <Product
              id={card.id}
              title={card.title}
              price={card.price}
              img={card.img}
              isSale={card.actions.includes(0)}
              isInInventory={card.isInInventory}
              isFavourite={card.isFavourite}
              key={index}
            />
          ))
        ) : (
          <div className={styles.cards__empty}>
            К сожалению, список товаров пуст
          </div>
        )}
      </div>
      {props.pageCount !== 1 && (
        <Stack sx={{ alignItems: "center", margin: "40px 0" }}>
          <Pagination
            count={props.pageCount}
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

export default CardsContent;
