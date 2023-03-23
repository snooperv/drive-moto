import React, { FormEvent, useEffect, useState } from "react";
import styles from "../filters.module.scss";
import FilterChecks from "../typeFilters/FilterChecks";
import FilterSlider from "../typeFilters/FilterSlider";
import FilterButtons from "../typeFilters/FilterButtons";
import { filtersProps } from "../filtersProps";
import { useSearchParams } from "react-router-dom";
import { PageSize } from "../../../../constants/pageSetting";

const FiltersFirstTab = (filters: filtersProps) => {
  const [, setSearchParams] = useSearchParams();
  const [isReset, setIsReset] = useState(false);
  let countries = [],
    brands = [],
    models = [];

  if (filters.countries) {
    for (let country of filters.countries) {
      countries.push({
        text: country.title,
        name: "Countries",
        value: country.id,
      });
      for (let brand of country.brands) {
        brands.push({ text: brand.title, name: "Brands", value: brand.id });
        for (let model of brand.models) {
          models.push({ text: model.title, name: "Models", value: model.id });
        }
      }
    }
  }

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const checked = Array.from(
      form.querySelectorAll('input[type="checkbox"]:checked')
    ) as HTMLInputElement[];
    const filters = `PageNumber=1&PageSize=${PageSize}&${checked
      .map((type) => `${type.name}=${type.value}`)
      .join("&")}`;
    setSearchParams(filters);
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
      <FilterChecks title="Бренд" checks={brands} isMore />
      <FilterChecks title="Модель" checks={models} isInput isMore />
      <FilterButtons title="Акции" />
      <FilterChecks title="Страны" checks={countries} isMore />
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
