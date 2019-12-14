const authorsHelper = {
    generateAuthorOption: function (name, id) {
        return {label: name, value: id};
    },
    isAuthorExisting: function (id, authorSuggestions) {
        return authorSuggestions.filter(suggestion => suggestion.value == id).length > 0;
    },
}

export default authorsHelper;