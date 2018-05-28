var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts": ["selection"],
};
chrome.contextMenus.create(contextMenuItem);
chrome.contextMenus.onClicked.addListener(function (clickData) {        
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (Number.isInteger(Number(clickData.selectionText))) {
            chrome.storage.sync.get(["total","limit"], function (budget) {   
                var newTotal= 0;
                if (budget.total) {
                    newTotal += parseInt(budget.total);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({"total": newTotal}, function () {
                    if (newTotal >= budget.limit) {
                        var notifOptions = {
                            type: "basic",
                            iconUrl: "/img/icon48.png",
                            title: "Limit Reached",
                            message: "Ups! You've reached your limit"
                        };
                        chrome.notifications.create("contextLimitNotif", notifOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function (changes, storageName) {
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
})
