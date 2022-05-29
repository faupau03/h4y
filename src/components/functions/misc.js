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


export { getDate, filterGames };