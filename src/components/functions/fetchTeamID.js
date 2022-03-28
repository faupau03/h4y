// es6 modules: export default function fetchTeamID(teamName)

export async function fetchTeamID(classID, clubName) {
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
    console.log(team_ids[0].tabTeamID);
    console.log(team_ids);
    const ids = team_ids.map((team) => {
        console.log(team.tabTeamname);
        console.log(team.tabTeamID);
        return team.tabTeamID;
    });
    return ids;
}