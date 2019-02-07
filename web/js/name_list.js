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
                var phone = json_result[i].phone;
                var birthday = json_result[i].birthday;
                $('#datatable tr:last').after('<tr><td>'+fullName+'</td><td>'+id+'</td><td>'+email+'</td><td>'+phone+'</td><td>'+birthday+'</td></tr>');
            }
        }
    );
}

updateTable();