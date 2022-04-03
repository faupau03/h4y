const getDate = (game) => {
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
};

export { getDate };