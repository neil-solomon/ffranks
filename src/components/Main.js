import React from "react";
import axios from "axios";
import style from "./Main.module.css";
import LoadingIcon from "./LoadingIcon.js";
import Menu from "./Menu.js";
import PlayerTable from "./PlayerTable.js";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.cleanData_timeout = null;
    this.cancelAxios = false;
    this.state = {
      players: [],
      allStats: [],
      is_get_qb_done: false,
      is_get_rb_done: false,
      is_get_wr_done: false,
      is_get_te_done: false,
      is_get_dst_done: false,
      is_get_k_done: false,
      is_getError: false,
      is_getDone: false,
      is_dataClean: false,
    };
  }

  componentDidMount = () => {
    // this.setState({
    //   players: require("../dummyData.json"),
    //   is_getDone: true,
    //   is_dataClean: true,
    // });
    this.get_qb();
    this.get_rb();
    this.get_wr();
    this.get_te();
    this.get_dst();
    this.get_k();
  };

  componentWillUnmount = () => {
    this.cancelAxios = true;
    clearTimeout(this.cleanData_timeout);
  };

  get_qb = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/QB/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName(
          "CellPlayerName--long"
        )) {
          players.push({
            name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
            position: "QB",
          });
        }

        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;

        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_qb_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_qb", error);
        this.setState({ is_getError: true });
      });
  };

  get_rb = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/RB/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName(
          "CellPlayerName--long"
        )) {
          players.push({
            name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
            position: "RB",
          });
        }

        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;
        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_rb_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_rb", error);
        this.setState({ is_getError: true });
      });
  };

  get_wr = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/WR/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName(
          "CellPlayerName--long"
        )) {
          players.push({
            name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
            position: "WR",
          });
        }

        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;
        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_wr_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_wr", error);
        this.setState({ is_getError: true });
      });
  };

  get_te = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/TE/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName(
          "CellPlayerName--long"
        )) {
          players.push({
            name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
            position: "TE",
          });
        }

        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;
        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_te_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_te", error);
        this.setState({ is_getError: true });
      });
  };

  get_dst = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/DST/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName("TeamName")) {
          players.push({
            name: name.childNodes[0].innerText
              .replace(/\n/g, "")
              .replace(/ +/g, " ")
              .trim(),
            position: "DST",
          });
        }
        // console.log(table);
        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;
        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_dst_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_dst", error);
        this.setState({ is_getError: true });
      });
  };

  get_k = () => {
    axios
      .get(
        "https://www.cbssports.com/fantasy/football/stats/K/2019/season/projections/nonppr/"
      )
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }

        var tableStart, tableEnd;

        for (let i = 0; i < response.data.length; ++i) {
          if (response.data.slice(i, i + 6) === "<table") {
            tableStart = i;
          } else if (response.data.slice(i, i + 8) === "</table>") {
            tableEnd = i + 8;
            break;
          }
        }

        var domparser = new DOMParser();
        var table = domparser.parseFromString(
          response.data.slice(tableStart, tableEnd),
          "text/html"
        );
        // console.log(table);

        var stats = [];
        for (const stat of table.getElementsByClassName(
          "Tablebase-tooltipInner"
        )) {
          stats.push(
            stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
          );
        }

        var players = [];
        for (const name of table.getElementsByClassName(
          "CellPlayerName--long"
        )) {
          players.push({
            name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
            position: "K",
          });
        }

        const allStats = table.getElementsByClassName(
          "TableBase-bodyTd--number"
        );
        var ix = 0;
        for (var player of players) {
          for (const stat of stats) {
            player[stat] = parseFloat(
              allStats[ix].innerText
                .replace(/\n/g, "")
                .replace(/ +/g, " ")
                .trim()
            );
            ix += 1;
          }
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_k_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 100);
      })
      .catch((error) => {
        console.log("get_k", error);
        this.setState({ is_getError: true });
      });
  };

  cleanData = () => {
    if (
      !this.state.is_get_qb_done ||
      !this.state.is_get_rb_done ||
      !this.state.is_get_wr_done ||
      !this.state.is_get_te_done ||
      !this.state.is_get_dst_done ||
      !this.state.is_get_k_done ||
      this.state.is_dataClean
    ) {
      return;
    }

    const unwantedKeys = [
      "Fantasy Points",
      "Fantasy Points Per Game",
      "Games Played",
      "Net Passing Yards Allowed",
      "Points Allowed Per Game",
      "Rushing Yards Allowed",
      "Yards Against Per Game",
      "Average Yards Per Rush",
      "Passer Rating",
      "Passing Yards Per Game",
      "Longest Field Goal",
      "Field Goal Attempts",
      "Average Yards Per Reception",
      "Average Yards Per Rush",
      "Yards Per Game",
    ];

    var newPlayers = JSON.parse(JSON.stringify(this.state.players));
    var allStats = [];

    for (var player of newPlayers) {
      for (const key of unwantedKeys) {
        if (Object.keys(player).includes(key)) {
          delete player[key];
        }
      }
      for (var stat of Object.keys(player)) {
        if (stat !== "name" && stat != "position" && !allStats.includes(stat)) {
          allStats.push(stat);
        }
      }
    }

    this.setState({
      is_getDone: true,
      is_dataClean: true,
      players: newPlayers,
      allStats,
    });
    // this.make_dummyData(newPlayers);
  };

  make_dummyData = (newPlayers) => {
    try {
      var blob = new Blob([JSON.stringify(newPlayers)], {
        type: "application/json",
      });
      var url = URL.createObjectURL(blob);
      var link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "dummyData.json");
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log("make json Error: ", error);
    }
  };

  render() {
    console.log(this.state.players);
    if (!this.state.is_getDone) {
      return (
        <div className={style.loading} key="loading">
          Loading Player Data<LoadingIcon></LoadingIcon>
        </div>
      );
    }
    if (this.is_getError) {
      return (
        <div className={style.loading} key="error">
          Error Loading Player Data
        </div>
      );
    }
    return (
      <div className={style.container} key="main">
        <Menu stats={this.state.allStats} />
        <PlayerTable players={this.state.players} />
      </div>
    );
  }
}
