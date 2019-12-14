const tagsHelper = {
    isTagExisting: function (tag, tagSuggestions) {
        return tagSuggestions.filter(suggestion => suggestion.value == tag).length > 0;
    },
    generateTagOption: function (tag) {
        return {label: tag, value: tag};
    }
}

export default tagsHelper;