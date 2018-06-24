/*-------------------- Utils ---------------------*/
function fixedEncodeUri (str) {
    return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

(function () {
/*-------------------- Lang Section ---------------------*/

var langId = "es";
var lang = {};
lang.label = function (id) {
    $.getJSON("/resources/lang/labels.json", function(json) {
        $(".lang").each(function() {
            var $this = $(this);
            $this.text(json[$this.data("lang")][langId]);
        });
    });    
};
lang.label();
})();
