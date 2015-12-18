$(function() {
    $('#submit').on('submit', function(event) {
        // prevent form auto refresh
        event.preventDefault();
        // receives email input
        var email = $("#email").val();
        var pw = $("#password").val();

        $.ajax({
            type: 'GET',
            contentType: "application/json", 
            headers: {
                "email": email,
                "password": pw,
                "api_key": "8baa295c46e0b4ff3e",
            },
            url: 'http://192.241.168.227/api/v1/login', 
            success: function(data){
                if(data.message){
                    alert(data.message);
                }
                else{
                    window.localStorage.setItem("user_id", data.data);
                    window.location.assign("myCoffees.html");
                }
            },
            error: function(data){
                alert('ERROR2');
            }
        });
        return false; 
    });
});