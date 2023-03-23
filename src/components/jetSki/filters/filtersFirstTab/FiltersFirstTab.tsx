import React, { FormEvent } from "react";
import styles from "../filters.module.scss";
import FilterChecks from "../typeFilters/FilterChecks";
import FilterSlider from "../typeFilters/FilterSlider";
import FilterButtons from "../typeFilters/FilterButtons";
import filtersProps from "../filtersProps";

const FiltersFirstTab = (filters: filtersProps) => {
  let countries = [],
    brands = [],
    models = [];

  if (filters.countries) {
    for (let country of filters.countries) {
      countries.push({ text: country.title, name: country.id });
      for (let brand of country.brands) {
        brands.push({ text: brand.title, name: brand.id });
        for (let model of brand.models) {
          models.push({ text: model.title, name: model.id });
        }
      }
    }
  }

  const applyFilters = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className={styles.filters} onSubmit={applyFilters}>
      <FilterChecks
        title="Наличие"
        checks={[
          { text: "В наличие", name: "IsInInventory" },
          { text: "Под заказ", name: "IsOnRequest" },
        ]}
      />
      <FilterSlider
        title="Цена"
        price={{
          minPrice: filters.minPrice || 1,
          maxPrice: filters.maxPrice || 1000000,
        }}
      />
      <FilterChecks title="Бренд" checks={brands} isMore />
      <FilterChecks title="Модель" checks={models} isInput isMore />
      <FilterButtons title="Акции" />
      <FilterChecks title="Страны" checks={countries} isMore />
      <button type="submit" className={styles.apply}>
        Выбрать
      </button>
    </form>
  );
};

export default FiltersFirstTab;
