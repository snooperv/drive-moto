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
          search.split("+").filter((q) => card.title.toLowerCase().includes(q))
            .length > 0
      )
    : products;

  setPageCount(
    filterCards.length > pageSize ? Math.ceil(filterCards.length / pageSize) : 1
  );

  const pageNumber = Number(searchParams.get("PageNumber"));
  const start = (pageNumber - 1) * pageSize;
  const end = pageNumber * pageSize;

  setCards(filterCards.slice(start, end));
};
