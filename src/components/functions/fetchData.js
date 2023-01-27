import { delay, filterGames } from "./misc";
const fetchTeamGames = async (teamID, classID, clubMatches, showAll) => {
  if (!teamID) {
    console.log("no teamid");
    // no scoreboard, so no teamid
    // setting matches to mobile api data
    return clubMatches.find((team) => team.gClassID === classID).matches;
  }

  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
    classID +
    "&ct=" +
    teamID
  );
  const json = await response.json();
  const team_games = json[0]["content"]["futureGames"]["games"];

  return filterGames(team_games, showAll);
};

const fetchTeamGames2 = async (teamID, classID, showAll) => {
  console.log(teamID);
  if (!teamID) {
    console.log("no teamid");
    // no scoreboard, so no teamid
    // setting matches to whole class
    return fetchClassGames(classID, showAll);
  }

  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
    classID +
    "&ct=" +
    teamID
  );
  const json = await response.json();
  const team_games = json[0]["content"]["futureGames"]["games"];

  return filterGames(team_games, showAll);
};

const fetchClassGames = async (classID, showAll) => {
  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
    classID
  );
  const json = await response.json();

  const class_games = json[0]["content"]["futureGames"]["games"];
  return filterGames(class_games, showAll);
};

const fetchClass = async (classID) => {
  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
    classID
  );
  const json = await response.json();
  return json[0];
};

const fetchTeam = async (teamID, classID, clubMatches) => {
  if (!teamID) {
    // no scoreboard, so no teamid
    // setting matches to mobile api data
    return clubMatches.find((team) => team.gClassID === classID).matches;
  }

  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
    classID +
    "&ct=" +
    teamID
  );
  const json = await response.json();
  return json[0];
};

const fetchTeamID = async (classID, clubName) => {
  const response = await fetch(
    "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
    classID
  );
  const json = await response.json();
  if (!json[0]["content"]["score"].length) {
    return null;
  }
  const team_ids = json[0]["content"]["score"].filter((element) =>
    element.tabTeamname.includes(clubName)
  );
  const ids = team_ids.map((team) => {
    return team.tabTeamID;
  });
  return ids;
};



const fetchClubClasses = async (club_id) => {
  const json = await fetchClub(club_id);
  return json[0]["content"]["classes"];
};

const getClubClasses = async (json) => {
  return json[0]["content"]["classes"];
};

const fetchClub = async (club_id, period) => {
  let response;
  if (period) {
    response = await fetch(
      "https://spo.handball4all.de/service/if_g_json.php?cmd=pcu&c=" +
      club_id +
      "&p=" +
      period
    );
  } else {
    response = await fetch(
      "https://spo.handball4all.de/service/if_g_json.php?cmd=pcu&c=" + club_id
    );
  }
  const json = await response.json();
  return json;
};

const fetchTickerInfo = async (token) => {
  const response = await fetch(
    "https://spo.handball4all.de/service/if_ticker_data.php?token=" +
    token +
    "&cmd=getAllGameInfo"
  );
  const json = await response.json();
  return json;
};

const fetchTicker = async (token) => {
  const response = await fetch(
    "https://spo.handball4all.de/service/if_ticker_data.php?token=" +
    token +
    "&cmd=getAllTickerMessages"
  );
  const json = await response.json();
  return json;
};

export {
  fetchTeamGames,
  fetchTeamGames2,
  fetchClassGames,
  fetchClub,
  getClubClasses,
  fetchClass,
  fetchTeamID,
  fetchTeam,
  fetchTickerInfo,
  fetchTicker,
};
