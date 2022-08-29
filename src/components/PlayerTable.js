import React from "react";
import style from "./PlayerTable.module.css";

export default class PlayerTable extends React.Component {
  getNumTeams = () => {
    let numTeams = -1;
    const element = document.getElementById("numTeams");
    if (element) {
      numTeams = parseInt(element.value);
      numTeams = isNaN(numTeams) ? 0 : numTeams;
    }
    return numTeams;
  };

  getNumInPosition = (players) => {
    const numInPosition = {
      QB: 0,
      RB: 0,
      WR: 0,
      TE: 0,
      K: 0,
      DST: 0,
    };

    for (const player of players) {
      numInPosition[player.position] += 1;
    }

    return numInPosition;
  };

  render() {
    const numTeams = this.getNumTeams();
    if (numTeams === 0) {
      return null;
    }

    // const numInPosition = this.getNumInPosition(this.props.players);

    return (
      <div className={style.container}>
        <table>
          <thead>
            <tr>
              <th className={style.tableHeader}>Rank</th>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Position</th>
              <th className={style.tableHeader}>Points</th>
              <th
                className={style.tableHeader + " " + style.clickable}
                onClick={() => this.props.headerClicked("POR")}
              >
                POR
              </th>
              <th className={style.tableHeader + " " + style.clickable}>
                <span onClick={() => this.props.headerClicked("PON")}>
                  PON{" "}
                </span>
                <input
                  className={style.pointsOverNextNumPicks}
                  type="number"
                  value={this.props.pointsOverNextNumPicks}
                  onChange={this.props.pointsOverNextNumPicksChange}
                ></input>
              </th>
              <th className={style.tableHeader}>Draft</th>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map((player, ix) => (
              <React.Fragment key={player.name}>
                {this.props.positionsInView[player.position] && (
                  <tr
                    className={
                      player.drafted
                        ? style.player + " " + style.drafted
                        : style.player +
                          " " +
                          style.undrafted +
                          " " +
                          style[player.position]
                    }
                  >
                    <td className={style.tableCell}>
                      {player.position +
                        " " +
                        player.positionRank +
                        "  -  " +
                        " Ovr " +
                        player.overallRank +
                        "  -  " +
                        "Rd " +
                        (parseInt(player.overallRank / numTeams) + 1)}
                    </td>
                    <td className={style.tableCell}>{player.name}</td>
                    <td className={style.tableCell}>{player.position}</td>
                    <td className={style.tableCell}>
                      {player.points.toFixed(1)}
                    </td>
                    <td className={style.tableCell}>{player.por.toFixed(1)}</td>
                    <td className={style.tableCell}>{player.pon.toFixed(1)}</td>
                    <td className={style.tableCell}>
                      <button
                        onClick={() => this.props.toggleDrafted(ix)}
                        className={style.draftButton}
                      >
                        {player.drafted ? "Undraft" : "Draft"}
                      </button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
