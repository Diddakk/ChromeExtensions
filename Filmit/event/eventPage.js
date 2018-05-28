var menuItem = {
    "id": "filmit",
    "title": "Filmit",
    "contexts": ["selection"]
};
chrome.contextMenus.create(menuItem);

function fixedEncodeUri (str) {
    return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId === "filmit" && clickData.selectionText) {
        var filmitUrl = "https://www.filmaffinity.com/es/search.php?stext=" + clickData.selectionText;
        // var createData = {
        //     "url": filmitUrl,
        //     "type": "popup",
        //     "top": 5,
        //     "left": 5,
        //     "width": screen.availWidth/2,
        //     "height": screen.availHeight/2
        // };
        // chrome.windows.create(createData, function (){});
        var createData = {
            "url": filmitUrl,
            "active": false
        };
        chrome.tabs.create(createData, function (){});
    }
});
