const imagesHelper = {
    REST_URL: "https://cors-anywhere.herokuapp.com/https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1",
    REST_ACTIONS: {
        FETCH_IMAGES: "FETCH_IMAGES"
    },
    ACTIONS: {
        CHANGE_VIEW_MODE: "CHANGE_VIEW_MODE",
        CHANGE_COLUMN_VIEW_SIZE: "CHANGE_COLUMN_VIEW_SIZE",
    },
    viewMode: {
        Table: "table",
        Column: "column"
    },
    defaultColumnViewSize: 3
}

export default imagesHelper;