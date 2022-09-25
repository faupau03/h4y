import { delay } from "./misc";
const fetchTeamGames = async(teamID, classID, clubMatches, showAll) => {
    if (!teamID) {
        //console.log("no teamid");
        // no scoreboard, so no teamid
        // setting matches to mobile api data
        return clubMatches.find(
            (team) => team.gClassID === classID
        ).matches;
    }


    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=0&cmd=ps&cl=" +
        classID +
        "&ct=" +
        teamID
    );
    const json = await response.json();
    //console.log(json);
    const team_games = json[0]["content"]["futureGames"]["games"];
    //console.log(team_games);
    //console.log(showAll);
    if (showAll) {
        return team_games;
    }
    return team_games.filter((game) => {
        const date_split = game.gDate.split(".");
        const time_split = game.gTime.split(":");
        //TODO: this date is hardcoded to the 21st century
        const date = new Date(
            "20" + date_split[2],
            date_split[1] - 1,
            date_split[0],
            time_split[0],
            time_split[1]
        );
        date.setHours(date.getHours() + 2);     // 2 hour puffertime
        return date > new Date();
    });
};

const fetchClassGames = async(classID, showAll) => {
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
        classID
    );
    const json = await response.json();
    
    const class_games = json[0]["content"]["futureGames"]["games"];
    //console.log(class_games);
    //console.log(showAll);
    if (showAll) {
        //console.log("show all");
        return class_games;
    }
    return class_games.filter((game) => {
        const date_split = game.gDate.split(".");
        const time_split = game.gTime.split(":");
        //TODO: this date is hardcoded to the 21st century
        const date = new Date(
            "20" + date_split[2],
            date_split[1] - 1,
            date_split[0],
            time_split[0],
            time_split[1]
        );
        date.setHours(date.getHours() + 2);     // 2 hour puffertime
        return date > new Date();
    });
};

const fetchClass = async(classID) => {
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
        classID
    );
    const json = await response.json();
    return json[0];
};


const fetchTeam = async(teamID, classID, clubMatches) => {
    if (!teamID) {
        // no scoreboard, so no teamid
        // setting matches to mobile api data
        return clubMatches.find(
            (team) => team.gClassID === classID
        ).matches;
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

const fetchTeamID = async(classID, clubName) => {
    await delay(1000);
    const response = await fetch(
        "https://spo.handball4all.de/service/if_g_json.php?ca=1&cmd=ps&cl=" +
        classID
    );
    const json = await response.json();
    if (!json[0]["content"]["score"].length) {
        return null;
    }
    const team_ids = json[0]["content"]["score"].filter((element) =>
        element.tabTeamname.includes(clubName)
    );
    //console.log(team_ids[0].tabTeamID);
    //console.log(team_ids);
    const ids = team_ids.map((team) => {
        //console.log(team.tabTeamname);
        //console.log(team.tabTeamID);
        return team.tabTeamID;
    });
    return ids;
}

const fetchClubClasses = async(club_id) => {
    const json = await fetchClub(club_id);
    return json[0]["content"]["classes"];
}

const getClubClasses = async(json) => {
    return json[0]["content"]["classes"];
}

const fetchClub = async(club_id, period) => {
    let response;
    await delay(1000);
    if (period) {
        response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=pcu&c="
            + club_id + "&p=" + period
        );
    }
    else {
        response = await fetch(
            "https://spo.handball4all.de/service/if_g_json.php?cmd=pcu&c="
            + club_id
        );
    }
    const json = await response.json();
    return json;
}


const fetchTickerInfo = async(token) => {
    const response = await fetch(
        "https://spo.handball4all.de/service/if_ticker_data.php?token=" + token + "&cmd=getAllGameInfo"
    );
    const json = await response.json();
    return json;
}

const fetchTicker = async(token) => {
    const response = await fetch(
        "https://spo.handball4all.de/service/if_ticker_data.php?token=" + token + "&cmd=getAllTickerMessages"
    );
    const json = await response.json();
    return json;
}

export { fetchTeamGames, fetchClassGames, fetchClub, getClubClasses, fetchClass, fetchTeamID, fetchTeam, fetchTickerInfo, fetchTicker };