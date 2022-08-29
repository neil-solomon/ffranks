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
    this.calculatePoints_timeout = null;
    this.initializeScoringValues_timeout = null;
    this.getData_timeout = null;
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
      playersSort: "POR",
      pointsOverNextNumPicks: 10,
    };
  }

  componentDidMount = () => {
    // this.setState({
    //   players: require("../dummyData.json"),
    //   is_getDone: true,
    //   is_dataClean: true,
    // });
    this.refresh_data(false);
  };

  componentWillUnmount = () => {
    this.cancelAxios = true;
    clearTimeout(this.cleanData_timeout);
    clearTimeout(this.calculatePoints_timeout);
    clearTimeout(this.initializeScoringValues_timeout);
    clearTimeout(this.getData_timeout);
  };

  refresh_data = (forceRefresh) => {
    this.setState({
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
    });
    this.getData_timeout = setTimeout(() => this.get_data(forceRefresh), 250);
  };

  get_data = (forceRefresh) => {
    let positions = [
      { name: "QB", data_func: this.make_qb_data },
      { name: "RB", data_func: this.make_rb_data },
      { name: "WR", data_func: this.make_wr_data },
      { name: "TE", data_func: this.make_te_data },
      { name: "DST", data_func: this.make_dst_data },
      { name: "K", data_func: this.make_k_data },
    ];
    for (const position of positions) {
      this.get_position_data(position.name, position.data_func, forceRefresh);
    }
  };

  set_storage_response = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem("responseTimeEpochMs", Date.now().toString());
  };

  get_position_data = (position, make_data_func, forceRefresh) => {
    if (!forceRefresh) {
      let response = JSON.parse(localStorage.getItem(`${position}response`));
      if (response) {
        make_data_func(response);
        return;
      }
    }

    let url = `https://www.cbssports.com/fantasy/football/stats/${position}/2019/season/projections/nonppr/`;
    console.log(`get_position_data(${position}) will hit ${url}`);

    axios
      .get(url)
      .then((response) => {
        if (this.cancelAxios) {
          return;
        }
        this.set_storage_response(`${position}response`, response);
        make_data_func(response);
      })
      .catch((error) => {
        console.log(`get_position_data(${position}) error`, error);
        this.setState({ is_getError: true });
      });
  };

  make_qb_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
    for (const name of table.getElementsByClassName("CellPlayerName--long")) {
      players.push({
        name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
        position: "QB",
        points: 0,
        por: 0,
        drafted: false,
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }

    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;

    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    this.setState({
      players: [...this.state.players, ...players],
      is_get_qb_done: true,
    });

    this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
  };

  make_rb_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
    for (const name of table.getElementsByClassName("CellPlayerName--long")) {
      players.push({
        name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
        position: "RB",
        points: 0,
        por: 0,
        drafted: false,
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }

    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;
    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    this.setState({
      players: [...this.state.players, ...players],
      is_get_rb_done: true,
    });

    this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
  };

  make_wr_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
    for (const name of table.getElementsByClassName("CellPlayerName--long")) {
      players.push({
        name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
        position: "WR",
        points: 0,
        por: 0,
        drafted: false,
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }

    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;
    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    this.setState({
      players: [...this.state.players, ...players],
      is_get_wr_done: true,
    });

    this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
  };

  make_te_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
    for (const name of table.getElementsByClassName("CellPlayerName--long")) {
      players.push({
        name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
        position: "TE",
        points: 0,
        por: 0,
        drafted: false,
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }

    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;
    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    this.setState({
      players: [...this.state.players, ...players],
      is_get_te_done: true,
    });

    this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
  };

  make_dst_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
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
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }
    // console.log(table);
    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;
    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    this.setState({
      players: [...this.state.players, ...players],
      is_get_dst_done: true,
    });

    this.cleanData_timeout = setTimeout(() => this.cleanData(), 250);
  };

  make_k_data = (response) => {
    let tableStart, tableEnd;

    for (let i = 0; i < response.data.length; ++i) {
      if (response.data.slice(i, i + 6) === "<table") {
        tableStart = i;
      } else if (response.data.slice(i, i + 8) === "</table>") {
        tableEnd = i + 8;
        break;
      }
    }

    let domparser = new DOMParser();
    let table = domparser.parseFromString(
      response.data.slice(tableStart, tableEnd),
      "text/html"
    );
    // console.log(table);

    let stats = [];
    for (const stat of table.getElementsByClassName("Tablebase-tooltipInner")) {
      stats.push(stat.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim());
    }

    let players = [];
    for (const name of table.getElementsByClassName("CellPlayerName--long")) {
      players.push({
        name: name.innerText.replace(/\n/g, "").replace(/ +/g, " ").trim(),
        position: "K",
        points: 0,
        por: 0,
        drafted: false,
        positionRank: 0,
        pon: 0,
        overallRank: 0,
      });
    }

    const allStats = table.getElementsByClassName("TableBase-bodyTd--number");
    let ix = 0;
    for (const player of players) {
      for (const stat of stats) {
        player[stat] = parseFloat(
          allStats[ix].innerText.replace(/\n/g, "").replace(/ +/g, " ").trim()
        );
        ix += 1;
      }
    }

    for (const player of players) {
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

      player["Made Field Goals 20-29 Yd"] = player["Field Goals 20-29 Yards"];
      player["Missed Field Goals 20-29 Yd"] =
        player["Field Goals 20-29 Yard Attempts"] -
        player["Field Goals 20-29 Yards"];
      delete player["Field Goals 20-29 Yard Attempts"];
      delete player["Field Goals 20-29 Yards"];

      player["Made Field Goals 30-39 Yd"] = player["Field Goals 30-39 Yards"];
      player["Missed Field Goals 30-39 Yd"] =
        player["Field Goals 30-39 Yard Attempts"] -
        player["Field Goals 30-39 Yards"];
      delete player["Field Goals 30-39 Yard Attempts"];
      delete player["Field Goals 30-39 Yards"];

      player["Made Field Goals 40-49 Yd"] = player["Field Goals 40-49 Yards"];
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

    let newPlayers = JSON.parse(JSON.stringify(this.state.players));
    let allStats = [];

    for (const player of newPlayers) {
      for (const key of unwantedKeys) {
        if (Object.keys(player).includes(key)) {
          delete player[key];
        }
      }
      for (const stat of Object.keys(player)) {
        if (
          stat !== "name" &&
          stat !== "position" &&
          stat !== "points" &&
          stat !== "por" &&
          stat !== "drafted" &&
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
    this.calculatePoints_timeout = setTimeout(
      () => this.calculatePoints(),
      500
    );
    // this.make_dummyData(newPlayers);
  };

  initializeScoringValues = () => {
    let menuData = JSON.parse(localStorage.getItem("menuData"));
    if (menuData) {
      for (const key of Object.keys(menuData)) {
        let element = document.getElementById(key);
        if (element) {
          element.value = menuData[key];
        }
      }
    }
  };

  scoringChange = () => {
    const positions = ["QB", "RB", "WR", "TE", "DST", "K", "FLEX"];
    let storageData = {};
    let value;

    for (const position of positions) {
      value = parseFloat(
        document.getElementById("numPlayers_" + position).value
      );
      storageData["numPlayers_" + position] = isNaN(value) ? 0 : value;
    }

    for (const stat of this.state.allStats) {
      value = parseFloat(document.getElementById("statPoints_" + stat).value);
      storageData["statPoints_" + stat] = isNaN(value) ? 0 : value;
    }

    value = parseFloat(document.getElementById("numTeams").value);
    storageData["numTeams"] = isNaN(value) ? 0 : value;

    localStorage.setItem("menuData", JSON.stringify(storageData));
    this.calculatePoints();
  };

  calculatePoints = (pointsOverNextNumPicks = null) => {
    let players = JSON.parse(JSON.stringify(this.state.players));

    for (const player of players) {
      player["points"] = 0;
      for (const stat of this.state.allStats) {
        if (Object.keys(player).includes(stat)) {
          let value = parseFloat(
            document.getElementById("statPoints_" + stat).value
          );
          player.points += isNaN(value) ? 0 : value * player[stat];
        }
      }
    }

    this.calculateDerivedStats(
      players,
      pointsOverNextNumPicks
        ? pointsOverNextNumPicks
        : this.state.pointsOverNextNumPicks
    );
    this.sortPlayers(players);

    this.setState({ players });
  };

  sortPlayers = (players, sortKey = null) => {
    const sort = sortKey ? sortKey : this.state.playersSort;
    if (sort === "POR") {
      players.sort((a, b) => (a.por > b.por ? -1 : 1));
    } else if (sort === "PON") {
      players.sort((a, b) => (a.pon > b.pon ? -1 : 1));
    }
  };

  calculateDerivedStats = (players, pointsOverNextNumPicks) => {
    let playersSorted = JSON.parse(JSON.stringify(players)).sort((a, b) =>
      a.points > b.points ? -1 : 1
    );

    let benchPlayer = {
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
    let benchPoints = { QB: 0, RB: 0, WR: 0, TE: 0, DST: 0, K: 0 };
    let benchCount = { QB: 0, RB: 0, WR: 0, TE: 0, DST: 0, K: 0 };
    let playerNameToPositionRank = {};
    let playerNameToPon = {};
    let playerNameToOvrRank = {};

    for (let i = 0; i < playersSorted.length; ++i) {
      const player = playersSorted[i];
      benchCount[player.position] += 1;
      playerNameToPositionRank[player.name] = benchCount[player.position];
      if (benchCount[player.position] === benchPlayer[player.position]) {
        benchPoints[player.position] = player.points;
      }
      for (let j = i + pointsOverNextNumPicks; j < playersSorted.length; ++j) {
        const player2 = playersSorted[j];
        if (!player2.drafted && player2.position === player.position) {
          playerNameToPon[player.name] = player.points - player2.points;
          break;
        }
      }
    }

    for (const player of players) {
      player.por = player.points - benchPoints[player.position];
      player.positionRank = playerNameToPositionRank[player.name];
      player.pon = playerNameToPon[player.name]
        ? playerNameToPon[player.name]
        : 0;
      player.overallRank = playerNameToOvrRank[player.name];
    }

    playersSorted = JSON.parse(JSON.stringify(players)).sort((a, b) =>
      a.por > b.por ? -1 : 1
    );
    for (let i = 0; i < playersSorted.length; ++i) {
      playerNameToOvrRank[playersSorted[i].name] = i + 1;
    }

    for (const player of players) {
      player.overallRank = playerNameToOvrRank[player.name];
    }
  };

  change_positionsInView = (position) => {
    let positionsInView = JSON.parse(
      JSON.stringify(this.state.positionsInView)
    );
    positionsInView[position] = !this.state.positionsInView[position];
    this.setState({ positionsInView });
  };

  toggleDrafted = (index) => {
    let players = JSON.parse(JSON.stringify(this.state.players));
    players[index].drafted = !this.state.players[index].drafted;
    this.setState({ players });
  };

  make_dummyData = (newPlayers) => {
    try {
      let blob = new Blob([JSON.stringify(newPlayers)], {
        type: "application/json",
      });
      let url = URL.createObjectURL(blob);
      let link = document.createElement("a");
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

  playerTableHeaderClicked = (headerValue) => {
    let players = JSON.parse(JSON.stringify(this.state.players));
    this.sortPlayers(players, headerValue);
    this.setState({ players: players, playersSort: headerValue });
  };

  pointsOverNextNumPicksChange = (event) => {
    const pointsOverNextNumPicks = parseInt(event.target.value);
    if (isNaN(pointsOverNextNumPicks)) {
      return;
    }
    this.calculatePoints(pointsOverNextNumPicks);
    this.setState({ pointsOverNextNumPicks: pointsOverNextNumPicks });
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
          refreshData={this.refresh_data}
        />
        <PlayerTable
          players={this.state.players}
          positionsInView={this.state.positionsInView}
          toggleDrafted={this.toggleDrafted}
          headerClicked={this.playerTableHeaderClicked}
          pointsOverNextNumPicks={this.state.pointsOverNextNumPicks}
          pointsOverNextNumPicksChange={this.pointsOverNextNumPicksChange}
        />
      </div>
    );
  }
}
