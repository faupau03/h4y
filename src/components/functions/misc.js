const getDate = (game) => {

    const date_split = game.gDate.split(".");
    const time_split = game.gTime.split(":");

    //TODO: this date is hardcoded to the 21st century
    let date = new Date(
        "20" + date_split[2],
        date_split[1] - 1,
        date_split[0],
    );
    if (time_split.length > 1) {
        date = new Date(
            "20" + date_split[2],
            date_split[1] - 1,
            date_split[0],
            time_split[0],
            time_split[1]
        );
    }
    return date;
};

const getClosestDate = (games) => {
    const team_games = games[0][Object.keys(games[0])[0]];
    let targetDate = new Date();
    const gameDates = team_games.map((game) => {
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
        return date;
    });

    let closestDate = gameDates.reduce((prev, curr) => {
        return (Math.abs(curr - targetDate) < Math.abs(prev - targetDate) ? curr : prev);
    });
    const closestDateIndex = gameDates.indexOf(closestDate);

    return team_games[closestDateIndex];
}


const filterGames = (games, showAll) => {
    if (showAll) {
        return games;
    }
    const filtered_games = games.filter((game) => {
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
        date.setHours(date.getHours() + 2);     // 2 hour buffer time
        return date > new Date();
    });


    let showLast = 1;
    // load showLast games from local storage
    if (localStorage.getItem("showLast")) {
        showLast = localStorage.getItem("showLast");
    }

    // show last games depending on the settings
    for (let i = 0; i < showLast; i++) {
        if (games.length - filtered_games.length - 1 >= 0) {
            filtered_games.unshift(games[games.length - filtered_games.length - 1]);
        }
    }
    return filtered_games;
};


const isDark = () => {
    return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--b3').split(" ")[2]) < 50;
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}
const delay = (ms = 1000) => new Promise(r => setTimeout(r, ms));

// Get class after id from classes and check if any game is live
const checkLive = (classes, id) => {
    const classData = classes.find((item) => item.gClassID == id);
    if (classData) {
        return classData.games.some((game) => game.live == true);
    }
    return false;
};

export { getDate, filterGames, isDark, hslToHex, delay, getClosestDate, checkLive };