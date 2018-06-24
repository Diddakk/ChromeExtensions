(function () {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.todo === "selectionRQ") {
            var selection = window.getSelection().toString();    
            console.log(selection);       
            chrome.runtime.sendMessage({todo: "selectionRS", selection: selection});  
        }
    });

})();
