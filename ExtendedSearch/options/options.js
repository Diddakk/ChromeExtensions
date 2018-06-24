(function () {
    function addNewSearcher(newUrl) {
        var newSearcherObject = buildnewSearcherObject(newUrl);
        chrome.storage.sync.get("searchers", function (rs) {
            var searchers = rs.searchers;

            if (searchers) {
                searchers.push(newSearcherObject);
                chrome.storage.sync.set({"searchers": searchers}, function() {
                });
            }else{
                chrome.storage.sync.set({"searchers": [newSearcherObject]}, function() {
                });
            }
        });
    }
    function buildnewSearcherObject(newUrl) {
        return {
            name: getName(newUrl),
            url: newUrl
        };
    }
    function getName(newUrl) {
        var newUrlArrayIndex = newUrl.includes("http")? 2: 0;
        var splittedFullUrl = newUrl.split("/")[newUrlArrayIndex].split(".");
        return splittedFullUrl[splittedFullUrl.length - 2];
    }
    $(".new-url__save").on("click", function () {
        var newUrl = $(".new-url__input").val();
        if (newUrl) {
            searchers = addNewSearcher(newUrl);
        }        
    });
    (function getSearchers() {
        var searchers;
        chrome.storage.sync.get("searchers", function (rs) {
            searchers = rs.searchers;
            console.table(searchers);
        });
    })();
})();
