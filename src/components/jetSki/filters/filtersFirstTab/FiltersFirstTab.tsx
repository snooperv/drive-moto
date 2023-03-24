import React, { FormEvent, useEffect, useState } from "react";
import styles from "../filters.module.scss";
import FilterChecks from "../typeFilters/FilterChecks";
import FilterSlider from "../typeFilters/FilterSlider";
import FilterButtons from "../typeFilters/FilterButtons";
import { filtersProps } from "../filtersProps";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "../../../../constants/pageSetting";

interface filterProps {
  text: string;
  name: string;
  value: string;
}

const FiltersFirstTab = (filters: filtersProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);
  const [countries, setCountries] = useState<filterProps[]>([]);
  const [brands, setBrands] = useState<filterProps[]>([]);
  const [models, setModels] = useState<filterProps[]>([]);
  const [disabledList, setDisabledList] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const getData = () => {
    countries.length = 0;
    brands.length = 0;
    models.length = 0;
    disabledList.length = 0;
    if (filters.countries) {
      for (let country of filters.countries) {
        countries.push({
          text: country.title,
          name: "Countries",
          value: country.id,
        });
        for (let brand of country.brands) {
          brands.push({
            text: brand.title,
            name: "Brands",
            value: brand.id,
          });
          if (!searchParams.getAll("Countries").includes(country.id)) {
            disabledList.push(brand.id);
          }

          for (let model of brand.models) {
            models.push({ text: model.title, name: "Models", value: model.id });
            if (!searchParams.getAll("Brands").includes(brand.id)) {
              disabledList.push(model.id);
            }
          }
        }
      }
      console.log(disabledList.length, brands.length + models.length);
    }
    setCountries(countries);
    setBrands(brands);
    setModels(models);
    if (disabledList.length === brands.length + models.length) {
      disabledList.length = 0;
    }
    setDisabledList(disabledList);
    setLoaded(true);
  };

  useEffect(getData, [
    brands,
    countries,
    disabledList,
    filters.countries,
    models,
    searchParams,
    loaded,
  ]);

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSearchParams(`PageNumber=1&PageSize=${PageSize}`);
    setIsReset(true);
  };

  useEffect(() => {
    setIsReset(false);
  }, [isReset]);

  return (
    <form className={styles.filters} onSubmit={applyFilters}>
      <FilterChecks
        title="Наличие"
        checks={[
          { text: "В наличие", name: "IsInInventory", value: "true" },
          { text: "Под заказ", name: "IsOnRequest", value: "true" },
        ]}
      />
      <FilterSlider
        title="Цена"
        price={{
          minPrice: filters.minPrice || 1,
          maxPrice: filters.maxPrice || 1000000,
        }}
        isReset={isReset}
      />
      <FilterChecks
        title="Бренд"
        checks={brands}
        isMore
        disabledList={disabledList}
      />
      <FilterChecks
        title="Модель"
        checks={models}
        isInput
        isMore
        disabledList={disabledList}
      />
      <FilterButtons title="Акции" />
      <FilterChecks
        title="Страны"
        checks={countries}
        isMore
        disabledList={disabledList}
      />
      <button type="submit" className={styles.apply}>
        Выбрать
      </button>
      <span className={styles.clear} onClick={clearFilters}>
        Сбросить фильтр
      </span>
    </form>
  );
};

export default FiltersFirstTab;
