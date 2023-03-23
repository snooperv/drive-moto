import { cardProps } from "../../../pages/jetSkiPage/cardProps";

export interface filtersProps {
  minPrice?: number;
  maxPrice?: number;
  countries?: {
    id: string;
    title: string;
    brands: {
      id: string;
      title: string;
      models: {
        id: string;
        title: string;
      }[];
    }[];
  }[];
  setContent: (res: cardProps[]) => void;
}
