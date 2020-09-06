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
              <th className={style.tableHeader}>Points Over Replacement</th>
            </tr>
          </thead>
          <tbody>
            {this.props.players.map((player) => (
              <tr key={player.name}>
                <td className={style.tableCell}>{player.name}</td>
                <td className={style.tableCell}>{player.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
