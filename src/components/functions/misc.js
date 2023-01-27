const getDate = (game) => {

    console.log(game);

    const date_split = game.gDate.split(".");
    const time_split = game.gTime.split(":");
    //TODO: this date is hardcoded to the 21st century
    console.log(date_split[2]);
    console.log(date_split[1]);
    console.log(date_split[0]);
    console.log(time_split[0]);
    console.log(time_split[1]);

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
    console.log(Object.keys(games[0]));
    console.log(games[0]);
    console.log(team_games);
    console.log(Object.keys(games[0]));

    console.log(JSON.stringify(games));
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
    console.log("closestDateIndex");
    console.log(closestDateIndex)
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

const lightOrDark = (color) => {

    // Variables for red, green, blue values
    var r, g, b, hsp;

    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        r = color[1];
        g = color[2];
        b = color[3];
    }
    else {

        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace(
            color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {

        return 'light';
    }
    else {

        return 'dark';
    }
};

const isDark = () => {
    console.log("color");
    console.log(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--b3').split(" ")[2]));
    console.log(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--b3').split(" ")[2]) < 50);
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
    console.log("checkLive");
    console.log(id);
    const classData = classes.find((item) => item.gClassID == id);
    console.log(classData);
    if (classData) {
        return classData.games.some((game) => game.live == true);
    }
    return false;
};

export { getDate, filterGames, isDark, hslToHex, delay, getClosestDate, checkLive };