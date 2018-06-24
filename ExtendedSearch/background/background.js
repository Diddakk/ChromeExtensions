(function manageContextMenu () {
    chrome.storage.onChanged.addListener(function(changes, namespace) {        
        if (changes.hasOwnProperty("searchers")) {
            chrome.contextMenus.removeAll();
            setContextMenu(); 
        }
    });
    function setContextMenu() {
        chrome.storage.sync.get("searchers", function (rs) {
            var searchers = rs.searchers;
            if (searchers) {
                $.map(searchers, function (searcher, key) {
                    chrome.contextMenus.create({
                        "id": key,
                        "title": searcher.title,
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
    }
    chrome.contextMenus.removeAll();
    setContextMenu();
})();