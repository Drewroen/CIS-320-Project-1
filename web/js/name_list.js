// Main Javascript File
function updateTable() {
    var url = "api/name_list_get";

    $.getJSON(url, null, function(json_result) {
            // json_result is an object. You can set a breakpoint, or print
            // it to see the fields. Specifically, it is an array of objects.
            // Here we loop the array and print the first name.
            for (var i = 0; i < json_result.length; i++) {
                var fullName = json_result[i].first + " " + json_result[i].last;
                var id = json_result[i].id;
                var email = json_result[i].email;
                var phoneInitial = json_result[i].phone;
                var phone = phoneInitial.substring(0, 3) + "-" + phoneInitial.substring(3, 6) + "-" + phoneInitial.substring(6, 10);
                var birthday = json_result[i].birthday;
                $('#datatable tr:last').after('<tr><td>'+fullName+'</td><td>'+id+'</td><td>'+email+'</td><td>'+phone+'</td><td>'+birthday+'</td></tr>');
            }
        }
    );
}

// Called when "Add Item" button is clicked
function showDialogAdd() {

    // Print that we got here
    console.log("Opening add item dialog");

    // Clear out the values in the form.
    // Otherwise we'll keep values from when we last
    // opened or hit edit.
    // I'm getting it started, you can finish.
    $('#firstName').val("");
    $('#lastName').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#birthday').val("");

    $('#firstName').removeClass("is-valid");
    $('#firstName').removeClass("is-invalid");
    $('#lastName').removeClass("is-valid");
    $('#lastName').removeClass("is-invalid");
    $('#email').removeClass("is-valid");
    $('#email').removeClass("is-invalid");
    $('#phone').removeClass("is-valid");
    $('#phone').removeClass("is-invalid");
    $('#birthday').removeClass("is-valid");
    $('#birthday').removeClass("is-invalid");

    // Show the hidden dialog
    $('#myModal').modal('show');
}

function saveChanges() {
    if($('#firstName').hasClass("is-valid") && $('#lastName').hasClass("is-valid") && $('#email').hasClass("is-valid") && $('#phone').hasClass("is-valid") && $('#birthday').hasClass("is-valid"))
    {
        var personObj = {"first" : $('#firstName').val(), "last" : $('#lastName').val(), "phone" : $('#phone').val(), "birthday" : $('#birthday').val(), "email" : $('#email').val(), }
        var personJSON = JSON.stringify(personObj);
        var url = "api/name_list_edit";

        $.ajax({
            type: 'POST',
            url: url,
            data: personJSON,
            success: function(personJSON) {
                $("#myModal").modal('hide');
                $('#datatable > thead').html("<tr>\n" +
                    "            <th>Name</th>\n" +
                    "            <th>ID</th>\n" +
                    "            <th>Email</th>\n" +
                    "            <th>Phone Number</th>\n" +
                    "            <th>Birthday</th>\n" +
                    "        </tr>");
                updateTable();
            },
            contentType: "application/json",
            dataType: 'text' // Could be JSON or whatever too
        });
    }
}

function validateFirstName()
{
    var firstName = firstNameBox.val();
    var reg = /^([^0-9,:()?*&\^%$#@!+=\[\]{}~\\|;:<>,\/]){1,45}$/;
    if (reg.test(firstName)) {
        console.log("Valid first name");
        $('#firstName').removeClass("is-invalid");
        $('#firstName').addClass("is-valid");
    } else if (!firstName) {
        $('#firstName').removeClass("is-valid");
        $('#firstName').removeClass("is-invalid");
    } else {
        console.log("Invalid first name");
        $('#firstName').removeClass("is-valid");
        $('#firstName').addClass("is-invalid");
    }
}

function validateLastName()
{
    var lastName = lastNameBox.val();
    var reg = /^([^0-9,:()?*&\^%$#@!+=\[\]{}~\\|;:<>,\/]){1,45}$/;
    if (reg.test(lastName)) {
        console.log("Valid last name");
        $('#lastName').removeClass("is-invalid");
        $('#lastName').addClass("is-valid");
    } else if (!lastName) {
        $('#lastName').removeClass("is-valid");
        $('#lastName').removeClass("is-invalid");
    } else {
        console.log("Invalid last name");
        $('#lastName').removeClass("is-valid");
        $('#lastName').addClass("is-invalid");
    }
}

function validateEmail()
{
    var email = emailBox.val();
    var reg = /[^@]+@[^\.]+\..+/;
    if (reg.test(email)) {
        console.log("Valid email");
        $('#email').removeClass("is-invalid");
        $('#email').addClass("is-valid");
    } else if (!email) {
        $('#email').removeClass("is-valid");
        $('#email').removeClass("is-invalid");
    } else {
        console.log("Invalid email");
        $('#email').removeClass("is-valid");
        $('#email').addClass("is-invalid");
    }
}

function validatePhone()
{
    var phone = phoneBox.val();
    var reg = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
    if (reg.test(phone)) {
        console.log("Valid phone");
        $('#phone').removeClass("is-invalid");
        $('#phone').addClass("is-valid");
    } else if (!phone) {
        $('#phone').removeClass("is-valid");
        $('#phone').removeClass("is-invalid");
    } else {
        console.log("Invalid phone");
        $('#phone').removeClass("is-valid");
        $('#phone').addClass("is-invalid");
    }
}

function validateBirthday()
{
    var birthday = birthdayBox.val();
    var reg = /^[0-9]{4}-(1[0-2]|[1-9]|0[1-9])-(3[0-1]|[1-2][0-9]|0[1-9]|[1-9])$/;
    if (reg.test(birthday)) {
        console.log("Valid birthday");
        $('#birthday').removeClass("is-invalid");
        $('#birthday').addClass("is-valid");
    } else if (!birthday) {
        $('#birthday').removeClass("is-valid");
        $('#birthday').removeClass("is-invalid");
    } else {
        console.log("Invalid birthday");
        $('#birthday').removeClass("is-valid");
        $('#birthday').addClass("is-invalid");
    }
}

updateTable();

// There's a button in the form with the ID "addItem"
// Associate the function showDialogAdd with it.
var addItemButton = $('#addItem');
addItemButton.on("click", showDialogAdd);

var firstNameBox = $('#firstName');
firstNameBox.on("keyup", validateFirstName);

var lastNameBox = $('#lastName');
lastNameBox.on("keyup", validateLastName);

var emailBox = $('#email');
emailBox.on("keyup", validateEmail);

var phoneBox = $('#phone');
phoneBox.on("keyup", validatePhone);

var birthdayBox = $('#birthday');
birthdayBox.on("keyup", validateBirthday);