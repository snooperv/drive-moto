import { cardProps } from "../components/cards/cardsContent/cardProps";
import { Dispatch, SetStateAction } from "react";

export const searchProducts = (
  products: any,
  searchParams: URLSearchParams,
  pageSize: number,
  setPageCount: (pageCount: number) => void,
  setCards: Dispatch<SetStateAction<cardProps[]>>
) => {
  const search = searchParams.get("search");
  let filterCards = search
    ? products.filter(
        (card: any) =>
          search
            .split("+")
            .filter((q) => card.title.toLowerCase().includes(q.toLowerCase()))
            .length > 0
      )
    : products;

  setPageCount(changePageCount(filterCards, pageSize));

  const pageNumber = Number(searchParams.get("PageNumber"));
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;

  setCards(filterCards.slice(start, end));
};

export const changePageCount = (filterCards: cardProps[], pageSize: number) => {
  return filterCards.length > pageSize
    ? Math.ceil(filterCards.length / pageSize)
    : 1;
};
