import React from "react";
import style from "./PlayerTable.module.css";

export default class PlayerTable extends React.Component {
  render() {
    return (
      <div className={style.container}>
        <table>
          <thead>
            <tr>
              <th className={style.tableHeader}>Name</th>
              <th className={style.tableHeader}>Position</th>
              <th className={style.tableHeader}>Points</th>
              <th className={style.tableHeader}>POR</th>
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
                    <td className={style.tableCell}>{player.name}</td>
                    <td className={style.tableCell}>{player.position}</td>
                    <td className={style.tableCell}>
                      {player.points.toFixed(1)}
                    </td>
                    <td className={style.tableCell}>{player.por.toFixed(1)}</td>
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
