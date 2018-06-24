(function setup() {
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {todo: "selectionRQ"});
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo === "selectionRS") {
        $(".js-selection-section__selection-input").val(request.selection);
        var $list = $(".links-section__list");
        var tmplt = "<li><a href='{{url}}" + request.selection  + "' target='_blank'>{{name}}</a></li>";
        chrome.storage.sync.get("searchers", function (rs) {
            if (rs.searchers) {
                $list.html($.map(rs.searchers, function (searcher) {
                    var result = tmplt.replace( /{{name}}/, searcher.name).replace( /{{url}}/, searcher.url);
                    return result;
                }).join(""));
            }
        });        
    }
});    
})();
/* (function () {
    $("a").on("click", function () {
        var createData = {
            "url": fixedEncodeUri(a.attr("href")),
            "active": false
        };
        chrome.tabs.create(createData, function (){});
    });
})(); */
