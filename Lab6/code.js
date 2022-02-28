function add() {
    a = parseInt(jQuery("#x").val())
    b = parseInt(jQuery("#y").val())
    jQuery("#p1").html( String(a) + "+" + String(b) + "=" + String(a + b))
    $("div").append("<span id='addbg'>"+String(a) + "+" + String(b) + "=" + String(a + b) + "</span>"+'<br>')
}
function subtract(){
    a = parseInt(jQuery("#x").val())
    b = parseInt(jQuery("#y").val())
    jQuery("#p1").html(String(a) + "-" + String(b) + "=" + String(a - b))
    $("div").append("<span id='subbg'>"+String(a) + "-" + String(b) + "=" + String(a - b) + "</span>"+ '<br>')
}
function multiply(){
    a = parseInt(jQuery("#x").val())
    b = parseInt(jQuery("#y").val())
    jQuery("#p1").html(String(a) + "*" + String(b) + "=" + String(a * b))
    $("div").append("<span id='mulbg'>"+String(a) + "*" + String(b) + "=" + String(a * b) + "</span>"+ '<br>')
}
function divide(){
    a = parseInt(jQuery("#x").val())
    b = parseInt(jQuery("#y").val())
    jQuery("#p1").html(String(a) + "/" + String(b) + "=" + String(a / b))
    $("div").append("<span id='divbg'>"+String(a) + "/" + String(b) + "=" + String(a / b) + "</span>"+ '<br>')

}
function increase(){
    fontsize = parseInt($("div").css("font-size"));
    $("div").css("font-size", fontsize + 10);
}
function decrease(){
    fontsize = parseInt($("div").css("font-size"));
    $("div").css("font-size", fontsize - 10);
}
function setup() {
    jQuery("#add").click(add);
    jQuery("#subtract").click(subtract);
    jQuery("#multiply").click(multiply);
    jQuery("#divide").click(divide);
    jQuery("#increase").click(increase);
    jQuery("#decrease").click(decrease);

}
jQuery(document).ready(setup);