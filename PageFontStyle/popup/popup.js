$(function () {
    var color = $("#fontColor").val();    
    $("#fontColor").on("change paste keyup", function (params) {
        color = $(this).val();
    });

    $("#btnChange").click(function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {todo: "changeColor", clickedColor: color});
        });
        chrome.tabs.getSelected(null, function (tab) {
            var url = new URL(tab.url)
            var domain = url.hostname
            // `domain` now has a value like 'example.com'
            console.log(domain);
          })  
    });
});