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
            },
            url: 'http://192.241.168.227/api/v1/login', 
            success: function(data){
                if(data.success == "false"){
                    alert('ERROR');
                }
                else{
                    console.log(JSON.stringify(data));
                }
            },
            error: function(data){
                alert('ERROR2');
            }
        });
        return false; 
    });
});