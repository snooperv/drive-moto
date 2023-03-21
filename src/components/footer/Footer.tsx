import React from "react";
import styles from "./footer.module.scss";
import facebook from "../../assets/img/footer/facebook.svg";
import instagram from "../../assets/img/footer/instagram.svg";
import vk from "../../assets/img/footer/vk.svg";
import youtube from "../../assets/img/footer/youtube.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.content}>
        <div className={styles.content__subscription}>
          <span className={styles.subscribeText}>
            Подпишитесь на нашу рассылку и узнавайте о акция быстрее
          </span>
          <form className={styles.subscribeForm}>
            <input
              className={styles.subscribeForm__email}
              name="email"
              placeholder="Введите ваш e-mail:"
            />
            <button className={styles.subscribeForm__submit} type="submit">
              Отправить
            </button>
          </form>
        </div>
        <div className={styles.content__info}>
          <span>Информация</span>
          <ul>
            <li>
              <Link to="#">О компании</Link>
            </li>
            <li>
              <Link to="#">Контакты</Link>
            </li>
            <li>
              <Link to="#">Акции</Link>
            </li>
            <li>
              <Link to="#">Магазины</Link>
            </li>
          </ul>
        </div>
        <div className={styles.content__shop}>
          <span>Интернет-магазин</span>
          <ul>
            <li>
              <Link to="#">Доставка и самовывоз</Link>
            </li>
            <li>
              <Link to="#">Оплата</Link>
            </li>
            <li>
              <Link to="#">Возврат-обмен</Link>
            </li>
            <li>
              <Link to="#">Новости</Link>
            </li>
          </ul>
        </div>
        <div className={styles.content__contacts}>
          <img src={instagram} alt="Instagram" />
          <img src={vk} alt="ВКонтакте" />
          <img src={facebook} alt="Facebook" />
          <img src={youtube} alt="YouTube" />
        </div>
        <Link to="#" className={styles.content__contract}>
          Договор оферты
        </Link>
        <Link to="#" className={styles.content__politic}>
          Политика обработки персональных данных
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
