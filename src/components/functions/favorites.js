const updateFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
};

const getFavorites = async () => {
    const json = localStorage.getItem("favorites");
    if (json) {
        return JSON.parse(json);
    } else {
        return [];
    }
};

export { updateFavorites, getFavorites };