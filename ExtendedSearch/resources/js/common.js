var searchers = [
    {
        name: "filmaffinity",
        url: "https://www.filmaffinity.com/es/search.php?stext="
    },
    {
        name:"imdb",
        url: "https://www.imdb.com/find?q="
    }
];

function fixedEncodeUri (str) {
    return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}