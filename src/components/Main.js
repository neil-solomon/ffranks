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
    this.calculatePointsAndPOR_timeout = null;
    this.initializeScoringValues_timeout = null;
    this.cancelAxios = false;
    this.state = {
      positionsInView: {
        QB: true,
        RB: true,
        WR: true,
        TE: true,
        DST: true,
        K: true,
      },
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
    clearTimeout(this.calculatePointsAndPOR_timeout);
    clearTimeout(this.initializeScoringValues_timeout);
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
            points: 0,
            por: 0,
            drafted: false,
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

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
            points: 0,
            por: 0,
            drafted: false,
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

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
            points: 0,
            por: 0,
            drafted: false,
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

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
            points: 0,
            por: 0,
            drafted: false,
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

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
            points: 0,
            por: 0,
            drafted: false,
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

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
            points: 0,
            por: 0,
            drafted: false,
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

        for (var player of players) {
          delete player["Field Goals Made"];

          player["Made Extra Points"] = player["Extra Points Made"];
          player["Missed Extra Points"] =
            player["Extra Points Attempted"] - player["Extra Points Made"];
          delete player["Extra Points Attempted"];
          delete player["Extra Points Made"];

          player["Made Field Goals 1-19 Yd"] = player["Field Goals 1-19 Yards"];
          player["Missed Field Goals 1-19 Yd"] =
            player["Field Goals 1-19 Yard Attempts"] -
            player["Field Goals 1-19 Yards"];
          delete player["Field Goals 1-19 Yard Attempts"];
          delete player["Field Goals 1-19 Yards"];

          player["Made Field Goals 20-29 Yd"] =
            player["Field Goals 20-29 Yards"];
          player["Missed Field Goals 20-29 Yd"] =
            player["Field Goals 20-29 Yard Attempts"] -
            player["Field Goals 20-29 Yards"];
          delete player["Field Goals 20-29 Yard Attempts"];
          delete player["Field Goals 20-29 Yards"];

          player["Made Field Goals 30-39 Yd"] =
            player["Field Goals 30-39 Yards"];
          player["Missed Field Goals 30-39 Yd"] =
            player["Field Goals 30-39 Yard Attempts"] -
            player["Field Goals 30-39 Yards"];
          delete player["Field Goals 30-39 Yard Attempts"];
          delete player["Field Goals 30-39 Yards"];

          player["Made Field Goals 40-49 Yd"] =
            player["Field Goals 40-49 Yards"];
          player["Missed Field Goals 40-49 Yd"] =
            player["Field Goals 40-49 Yard Attempts"] -
            player["Field Goals 40-49 Yards"];
          delete player["Field Goals 40-49 Yard Attempts"];
          delete player["Field Goals 40-49 Yards"];

          player["Made Field Goals 50+ Yd"] = player["Field Goals 50+ Yards"];
          player["Missed Field Goals 50+ Yd"] =
            player["Field Goals 50+ Yards Attempts"] -
            player["Field Goals 50+ Yards"];
          delete player["Field Goals 50+ Yards Attempts"];
          delete player["Field Goals 50+ Yards"];
        }

        this.setState({
          players: [...this.state.players, ...players],
          is_get_k_done: true,
        });

        this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
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
        if (
          stat !== "name" &&
          stat != "position" &&
          stat != "points" &&
          stat != "por" &&
          stat != "drafted" &&
          !allStats.includes(stat)
        ) {
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
    this.initializeScoringValues_timeout = setTimeout(
      () => this.initializeScoringValues(),
      250
    );
    this.calculatePointsAndPOR_timeout = setTimeout(
      () => this.calculatePointsAndPOR(),
      500
    );
    // this.make_dummyData(newPlayers);
  };

  initializeScoringValues = () => {
    var menuData = JSON.parse(localStorage.getItem("menuData"));
    if (menuData) {
      for (const key of Object.keys(menuData)) {
        var element = document.getElementById(key);
        if (element) {
          element.value = menuData[key];
        }
      }
    }
  };

  scoringChange = () => {
    const positions = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"];
    var storageData = {};

    for (const position of positions) {
      var value = parseFloat(
        document.getElementById("numPlayers_" + position).value
      );
      storageData["numPlayers_" + position] = isNaN(value) ? 0 : value;
    }

    for (const stat of this.state.allStats) {
      var value = parseFloat(
        document.getElementById("statPoints_" + stat).value
      );
      storageData["statPoints_" + stat] = isNaN(value) ? 0 : value;
    }

    var value = parseFloat(document.getElementById("numTeams").value);
    storageData["numTeams"] = isNaN(value) ? 0 : value;

    localStorage.setItem("menuData", JSON.stringify(storageData));
    this.calculatePointsAndPOR();
  };

  calculatePointsAndPOR = () => {
    var players = JSON.parse(JSON.stringify(this.state.players));

    for (var player of players) {
      player["points"] = 0;
      for (const stat of this.state.allStats) {
        if (Object.keys(player).includes(stat)) {
          var value = parseFloat(
            document.getElementById("statPoints_" + stat).value
          );
          player.points += isNaN(value) ? 0 : value * player[stat];
        }
      }
    }

    players.sort((a, b) => (a.points > b.points ? -1 : 1));

    var benchPlayer = {
      QB:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_QB").value) +
        1,
      RB:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_RB").value) +
        1,
      WR:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_WR").value) +
        1,
      TE:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_TE").value) +
        1,
      DST:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_DST").value) +
        1,
      K:
        parseInt(document.getElementById("numTeams").value) *
          parseInt(document.getElementById("numPlayers_K").value) +
        1,
    };
    var benchPoints = { QB: 0, RB: 0, WR: 0, TE: 0, DST: 0, K: 0 };
    var benchCount = { QB: 0, RB: 0, WR: 0, TE: 0, DST: 0, K: 0 };

    for (var player of players) {
      benchCount[player.position] += 1;
      if (benchCount[player.position] === benchPlayer[player.position]) {
        benchPoints[player.position] = player.points;
      }
    }

    for (var player of players) {
      player.por = player.points - benchPoints[player.position];
    }

    players.sort((a, b) => (a.por > b.por ? -1 : 1));

    this.setState({ players });
  };

  change_positionsInView = (position) => {
    var positionsInView = JSON.parse(
      JSON.stringify(this.state.positionsInView)
    );
    positionsInView[position] = !this.state.positionsInView[position];
    this.setState({ positionsInView });
  };

  toggleDrafted = (index) => {
    var players = JSON.parse(JSON.stringify(this.state.players));
    players[index].drafted = !this.state.players[index].drafted;
    this.setState({ players });
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
        <Menu
          stats={this.state.allStats}
          scoringChange={this.scoringChange}
          positionsInView={this.state.positionsInView}
          change_positionsInView={this.change_positionsInView}
        />
        <PlayerTable
          players={this.state.players}
          positionsInView={this.state.positionsInView}
          toggleDrafted={this.toggleDrafted}
        />
      </div>
    );
  }
}
