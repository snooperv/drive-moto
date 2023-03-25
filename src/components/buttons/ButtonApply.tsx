import React from "react";
import styles from "./buttonApply.module.scss";

const ButtonApply = (props: { text: string; style?: React.CSSProperties }) => {
  return (
    <button type="submit" className={styles.apply} style={props.style}>
      {props.text}
    </button>
  );
};

export default ButtonApply;
