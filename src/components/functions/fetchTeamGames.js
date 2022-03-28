export async function fetchTeamGames(teamID, classID, clubMatches, showAll) {
    if (!teamID) {
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
    console.log(json);
    const team_games = json[0]["content"]["futureGames"]["games"];
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