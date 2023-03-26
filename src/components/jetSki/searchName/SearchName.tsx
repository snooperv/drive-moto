import React, { useState } from "react";
import styles from "./searchName.module.scss";
import { useSearchParams } from "react-router-dom";

const SearchName = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || ""
  );

  const submitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.model.value) {
      setSearchParams({
        PageNumber: "1",
        search: form.model.value,
      });
    } else {
      setSearchParams("");
    }
  };

  return (
    <div className={styles.container}>
      <span className={styles.text}>Поиск по названию товара</span>
      <form className={styles.search} onSubmit={submitSearch}>
        <input
          className={styles.search__input}
          type="text"
          placeholder="Введите марку"
          name="model"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className={styles.search__submit}>
          искать
        </button>
      </form>
    </div>
  );
};

export default SearchName;
