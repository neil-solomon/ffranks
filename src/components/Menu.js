import React from "react";
import style from "./Menu.module.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.positions = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"];
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>Positions In View</div>
          {this.positions
            .filter((position) => position !== "FLEX")
            .map((position) => (
              <div className={style.position}>
                <input type="checkbox" name={position + "checkbox"} />
                <label for={position + "checkbox"}>{position}</label>
              </div>
            ))}
        </div>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>Players At Position</div>
          {this.positions.map((position) => (
            <div className={style.position}>
              <input
                type="number"
                name={position + "number"}
                placeholder={0}
                className={style.numberInput}
              />
              <label for={position + "number"} class>
                {position}
              </label>
            </div>
          ))}
        </div>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>Scoring</div>
          {this.props.stats.map((stat) => (
            <div key={stat}>
              <input
                type="number"
                name={stat}
                placeholder={0}
                className={style.numberInput}
              />
              <label for={stat}>{stat}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
