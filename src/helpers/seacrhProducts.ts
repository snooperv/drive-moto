import { PageSize } from "../constants/pageSetting";
import { cardProps } from "../components/cards/cardsContent/cardProps";
import { Dispatch, SetStateAction } from "react";

export const searchProducts = (
  res: any,
  search: string,
  searchParams: URLSearchParams,
  setPageCount: (pageCount: number) => void,
  setCards: Dispatch<SetStateAction<cardProps[]>>
) => {
  let filterCards = res.products.filter(
    (card: any) =>
      search.split("+").filter((q) => card.title.toLowerCase().includes(q))
        .length > 0
  );

  setPageCount(
    filterCards.length > PageSize ? Math.ceil(filterCards.length / PageSize) : 1
  );

  const pageNumber = Number(searchParams.get("PageNumber"));
  const start = (pageNumber - 1) * PageSize;
  const end = pageNumber * PageSize;

  setCards(filterCards.slice(start, end));
};
