(function () {
    function addNewSearcher(newUrl) {
        //chrome.storage.sync.set({"searchers":{}}, function() {});
        chrome.storage.sync.get("searchers", function (rs) {
            var searchers = rs.searchers;
            var key = getName(newUrl);
            if (key) {
                var newSearcherObject = {};
                var newSearcher = buildnewSearcherObject(newUrl);
                
                if ($.isEmptyObject(searchers)) {
                    newSearcherObject[key] = newSearcher;
                    searchers = newSearcherObject;
                }else{
                    if (searchers.hasOwnProperty(key)) {
                        key, keyCounter = 0;
                        while (searchers.hasOwnProperty(key + "+" + keyCounter)) {
                            keyCounter ++;
                        }
                        newSearcherObject[key + "+" + keyCounter] = newSearcher;
                    }else{
                        newSearcherObject[key] = newSearcher;
                    }
                    $.extend(searchers, newSearcherObject);                    
                }
                chrome.storage.sync.set({"searchers": searchers}, function() {
                });
                logSearchers();
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
    function logSearchers() {
        var searchers;
        chrome.storage.sync.get("searchers", function (rs) {
            searchers = rs.searchers;
            console.table(searchers);
        });
    }
    $(".new-url__save").on("click", function () {
        var newUrl = $(".new-url__input").val();
        if (newUrl) {
            searchers = addNewSearcher(newUrl);
        }        
    });
    logSearchers();
})();
