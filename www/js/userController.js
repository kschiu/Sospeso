document.addEventListener("deviceready", onDeviceReady, false);

function getUsers(){
	$.ajax({
		type: 'GET',
		contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/', 
        success: function(data){
        	console.log(data)
            console.log(JSON.stringify(data));
            if(data.success == "false"){
                alert('Cannot connect to Sospeso Server.');
                window.location.assign('login.html');
            }
            else{
            	console.log("Success");
            }
        },
        error: function(data){
            console.log('Cannot Connect to Sospeso Server');
        }
	});
}

function onDeviceReady(){
	console.log("Device Ready!");
	getUsers();
}

