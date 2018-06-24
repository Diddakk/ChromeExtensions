(function manageContextMenu () {
    var searchers;
    chrome.storage.sync.get("searchers", function (rs) {
        searchers = rs.searchers;
        if (searchers) {
            $.map(searchers, function (searcher) {
                chrome.contextMenus.create({
                    "id": searcher.name,
                    "title": searcher.name,
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
        }
    });            
})();