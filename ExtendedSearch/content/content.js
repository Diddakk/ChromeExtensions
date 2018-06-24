(function () {
    var a = window.getSelection().toString();
    
    /* $("body").mouseup(function (params) {
        var selection = window.getSelection().toString();
        if (selection) {
            console.log(selection);  
            chrome.runtime.sendMessage({todo: "getSelection", selection: selection});          
        }
    }); */

    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.todo === "selectionRQ") {
            var selection = window.getSelection().toString();    
            console.log(selection);       
            chrome.runtime.sendMessage({todo: "selectionRS", selection: selection});  
        }
    });

})();
