import React from "react";
import style from "./LoadingIcon.module.css";

export default class LoadingIcon extends React.Component {
  render() {
    return (
      <div className={style.loadingIcon}>
        <div className={style.loadingIcon1}></div>
        <div className={style.loadingIcon2}></div>
        <div className={style.loadingIcon3}></div>
        <div className={style.loadingIcon4}></div>
      </div>
    );
  }
}
