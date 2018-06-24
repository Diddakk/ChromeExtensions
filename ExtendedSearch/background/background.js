(function manageContextMenu () {    
    var menuItem = {
        "id": "ExtendedSearch",
        "title": "Extend Search",
        "contexts": ["selection"]
    };    

    $.map(searchers, function (searcher) {
        chrome.contextMenus.create({
            "id": searcher.name,
            "title": searcher.url,
            "contexts": ["selection"]
        });
    });

    chrome.contextMenus.onClicked.addListener(function (clickData) {
        $.map(searchers, function (searcher) {
            if (clickData.menuItemId === searcher.name && clickData.selectionText) {
                var createData = {
                    "url": fixedEncodeUri(searcher.url + clickData.selectionText),
                    "active": false
                };
                chrome.tabs.create(createData, function (){});
            }
        });        
    });
})();
