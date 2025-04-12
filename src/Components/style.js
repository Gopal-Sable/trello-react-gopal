export const boardStyle = (prefs,CARD_HEIGHT,CARD_WIDTH) => {
    return {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: 2,
        p: 2,
        cursor: "pointer",
        boxShadow: 1,
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundImage: prefs?.backgroundImage
            ? `url(${prefs.backgroundImage})`
            : undefined,
        backgroundColor: prefs?.backgroundColor || "#0079bf",
    };
};

export const cardStyle = (CARD_HEIGHT,CARD_WIDTH) => {
    return {
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        borderRadius: 2,
        bgcolor: "grey.200",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover": { bgcolor: "grey.300" },
    };
};
