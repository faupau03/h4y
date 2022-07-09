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

const filterGames = (games, showAll) => {
    if (showAll) {
        return games;
    }
    return games.filter((game) => {
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
    if (hsp>127.5) {

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


export { getDate, filterGames, isDark };