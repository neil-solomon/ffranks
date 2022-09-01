import React from "react";
import style from "./Menu.module.css";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.positions = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"];
  }

  hoursSinceLastUpdate = () => {
    const lastUpdateMs = parseInt(localStorage.getItem("responseTimeEpochMs"));
    const deltaMs = Date.now() - lastUpdateMs;
    const deltaHr = deltaMs / 60 / 60 / 1000;
    const deltaHrStr = deltaHr.toString();
    const decimalIx = deltaHrStr.indexOf(".");
    const hoursSinceLastUpdate =
      decimalIx >= 0 ? deltaHrStr.slice(0, decimalIx + 2) : deltaHrStr;
    return hoursSinceLastUpdate;
  };

  render() {
    return (
      <div
        className={
          style.container +
          " " +
          (this.props.menuOpen ? style.containerOpen : style.containerClosed)
        }
      >
        <div className={style.menuSection}>
          <div>
            <button onClick={() => this.props.refreshData(true)}>
              Refresh Data
            </button>{" "}
            Data is {this.hoursSinceLastUpdate()} hours old.
          </div>
          <div className={style.menuSectionHeader}>Positions In View</div>
          {this.positions
            .filter((position) => position !== "FLEX")
            .map((position) => (
              <div key={"view" + position} className={style.position}>
                <input
                  type="checkbox"
                  name={position + "checkbox"}
                  checked={this.props.positionsInView[position]}
                  onChange={() => this.props.change_positionsInView(position)}
                />
                <label
                  htmlFor={position + "checkbox"}
                  onClick={() => this.props.change_positionsInView(position)}
                  className={style[position]}
                >
                  {position}
                </label>
              </div>
            ))}
        </div>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>
            Number Of Teams In League
            <br />
            <input
              type="number"
              name="numTeams"
              id="numTeams"
              className={style.numberInput}
              onChange={this.props.scoringChange}
            />
          </div>
        </div>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>Number Of Players</div>
          {this.positions.map((position) => (
            <div key={"numPlayers" + position} className={style.position}>
              <input
                type="number"
                name={position + "number"}
                id={"numPlayers_" + position}
                className={style.numberInput}
                onChange={this.props.scoringChange}
              />
              <label htmlFor={position + "number"}>{position}</label>
            </div>
          ))}
        </div>
        <div className={style.menuSection}>
          <div className={style.menuSectionHeader}>Scoring</div>
          {this.props.stats.sort().map((stat) => (
            <div key={stat}>
              <input
                type="number"
                name={stat}
                className={style.numberInput}
                id={"statPoints_" + stat}
                onChange={this.props.scoringChange}
              />
              <label htmlFor={stat}>{stat}</label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
