import React from "react";
import styles from "./jetSki.module.scss";
import Promo from "../../components/jetSki/promo/Promo";
import Banner from "../../components/jetSki/banner/Banner";
import CustomBreadCrumbs from "../../components/jetSki/breadcrumbs/CustomBreadCrumbs";
import SearchName from "../../components/jetSki/searchName/SearchName";
import PageTitle from "../../components/jetSki/pageTitle/PageTitle";
import Filters from "../../components/jetSki/filters/Filters";
import Product from "../../components/jetSki/product/Product";

const JetSkiPage = () => {
  const cards = [
    {
      title: "Гидроцикл BRP SeaDoo GTI 130hp SE Black\\Mango",
      price: 1049500,
      isSale: true,
      isInInventory: true,
    },
    {
      title: "Гидроцикл BRP SeaDoo GTI 130hp SE Black\\Mango",
      price: 1049500,
      isSale: false,
      isInInventory: false,
    },
    {
      title: "Гидроцикл BRP SeaDoo GTI 130hp SE Black\\Mango",
      price: 1049500,
      isSale: true,
      isInInventory: true,
    },
    {
      title: "Гидроцикл BRP SeaDoo GTI 130hp SE Black\\Mango",
      price: 1049500,
      isSale: false,
      isInInventory: true,
    },
    {
      title: "Гидроцикл BRP SeaDoo GTI 130hp SE Black\\Mango",
      price: 1049500,
      isSale: true,
      isInInventory: true,
    },
  ];

  return (
    <div className={styles.container}>
      <CustomBreadCrumbs />
      <div className={styles.advert}>
        <Banner />
        <Promo />
      </div>
      <SearchName />
      <PageTitle />
      <div className={styles.mainContent}>
        <Filters />
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <Product
              title={card.title}
              price={card.price}
              isSale={card.isSale}
              isInInventory={card.isInInventory}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JetSkiPage;
