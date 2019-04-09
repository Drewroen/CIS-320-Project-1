// This calls our back-end Java program that sets our session info
function login() {

    var url = "api/login_servlet";

    // Grab data from the HTML form
    var loginID = $("#loginID").val();
    if(loginID != "")
    {
        // Create a JSON request based on that data
        var dataToServer = {loginID : loginID};

        // Post
        $.post(url, dataToServer, function (dataFromServer) {
            // We are done. Write a message to our console
            console.log("Finished calling servlet.");
            console.log(dataFromServer);
            // Clear the form
            $("#loginID").val("");
            getLogin();
        });
    }

}

// This gets session info from our back-end servlet.
function getLogin() {

    var url = "api/get_login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        // Update the HTML with our result
        if(dataFromServer.indexOf("Not logged in.") == -1)
        {
            $('#getLoginText').html(dataFromServer);
            $('#loginInfo').html("Get login info");
            $('#mainTitle').html("Welcome!");
            $('#loginID').hide();
            $('#loggedInText').html(dataFromServer.substring(dataFromServer.indexOf("You are logged in as")));
            $('#logOutDiv').show();
            button = $('#login');
            button.on("click", getLogin);
        }
        else
        {
            $('#getLoginText').html("");
            $('#loginInfo').html("Login");
            $('#mainTitle').html("Login");
            $('#loginID').show();
            $('#loggedInText').html("");
            $('#logOutDiv').hide();
            button = $('#login');
            button.off("click", getLogin);
        }
    });
}

// This method calls the servlet that invalidates our session
function invalidateSessionButton() {

    var url = "api/login_servlet";

    $.post(url, null, function (dataFromServer) {
        console.log("Finished calling servlet.");
        console.log(dataFromServer);
        getLogin();
    });
}

// Hook the functions above to our buttons
button = $('#getLogin');
button.on("click", getLogin);

button = $('#login');
button.on("click", login);

button = $('#invalidateSession');
button.on("click", invalidateSessionButton);

getLogin();