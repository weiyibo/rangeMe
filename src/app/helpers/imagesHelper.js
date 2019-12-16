const imagesHelper = {
    REST_URL: "https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1",
    REST_ACTIONS: {
        FETCH_IMAGES: "FETCH_IMAGES"
    },
    ACTIONS: {
        CHANGE_VIEW_MODE: "CHANGE_VIEW_MODE",
        CHANGE_COLUMN_VIEW_SIZE: "CHANGE_COLUMN_VIEW_SIZE",
        CHANGE_IS_SHOW_ALL_TAGS: "CHANGE_IS_SHOW_ALL_TAGS",
        CHANGE_CURRENT_PAGE: "CHANGE_CURRENT_PAGE"
    },
    viewMode: {
        Table: "table",
        Column: "column"
    },
    generateId: () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    },
    defaultColumnViewSize: 3,
    defaultAmountOfTagToShow: 5,
    pagination: {
        totalPages: 1,
        numberPerPage: 10,
        currentPage: 1
    }
}

export default imagesHelper;