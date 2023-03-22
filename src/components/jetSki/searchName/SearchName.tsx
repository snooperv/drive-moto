import React from "react";
import styles from "./searchName.module.scss";

const SearchName = () => {
  return (
    <div className={styles.container}>
      <span className={styles.text}>Поиск по названию товара</span>
      <form className={styles.search}>
        <input
          className={styles.search__input}
          type="text"
          placeholder="Введите марку"
          name="model"
        />
        <button type="submit" className={styles.search__submit}>
          искать
        </button>
      </form>
    </div>
  );
};

export default SearchName;
