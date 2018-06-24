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
            renderSearcherList();
            //logSearchers();
        }
    });
}
function renderSearcherList() {
    var $list = $(".links-section__list");
    $list.html("");
    var tmplt = "<li data-searcher-id='{{id}}'>{{title}}<a href='#' class='js-links-section__delete-searcher'>X</a></li>";
    chrome.storage.sync.get("searchers", function (rs) {
        var searchers = rs.searchers;
        if (searchers) {
            $list.html($.map(searchers, function (searcher, id) {
                var result = tmplt.replace( /{{title}}/, searcher.title).replace( /{{id}}/, id);
                return result;
            }).join(""));
        }
        $(".js-links-section__delete-searcher").on("click", function () {
            var $this = $(this);
            var id = $this.closest("li").data("searcher-id");
            delete searchers[id];
            chrome.storage.sync.set({"searchers": searchers}, function() {});
            renderSearcherList();
        }); 
    }); 
}
function buildnewSearcherObject(newUrl) {
    return {
        name: getName(newUrl),
        title: getName(newUrl),
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
    var $newUrl = $(".new-url__input");
    if ($newUrl.val()) {
        searchers = addNewSearcher($newUrl.val());
        $newUrl.val("");
    }        
});
renderSearcherList();
//logSearchers();
})();
