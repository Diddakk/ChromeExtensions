(function manageContextMenu () {
    var searchers;
    chrome.storage.sync.get("searchers", function (rs) {
        searchers = rs.searchers;
        if (searchers) {
            $.map(searchers, function (searcher, key) {
                chrome.contextMenus.create({
                    "id": key,
                    "title": searcher.name,
                    "contexts": ["selection"]
                });
            });
            chrome.contextMenus.onClicked.addListener(function (clickData) {
                $.map(searchers, function (searcher, key) {
                    if (clickData.menuItemId === key && clickData.selectionText) {
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