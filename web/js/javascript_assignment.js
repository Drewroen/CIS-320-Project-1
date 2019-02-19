$("#button1").click(function(){
    console.log("Hello");
});

$("#button2").click(function(){
    $("#field3").val(parseInt($("#field1").val()) + parseInt($("#field2").val()));
});

$("#button3").click(function(){
    $("#paragraphToHide").toggle();
});

$("#button4").click(function(){
    var phoneRegex = new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$");
    if (phoneRegex.test($("#phoneField").val())){
        console.log("OK");
    } else {
        console.log("Bad");
    }
});

$("#button5").click(function(){
    var obj = { firstName: $("#firstName").val(), lastName: $("#lastName").val(), email: $("#email").val() };
    var tempJSON = JSON.stringify(obj);
    console.log(tempJSON);
});