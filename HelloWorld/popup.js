$(function () {
    $("#name").keyup(function () {
        var name = $("#name").val();
        if (name) {
            name = " " + name;
        }         
        $("#greet").text("Hello " + name + "!");        
    })
    
})