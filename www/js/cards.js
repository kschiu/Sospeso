function onLoad() {
    console.log('onLoad');
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener("resume", onResume, false);
}

document.addEventListener("resume", onResume, false);
document.addEventListener("deviceready", onDeviceReady, false);
// Handle the resume event
//
function alertDismissed(){
    //Do nothing on dialog box close
    return;
}
function onResume() {
    console.log('onResume');
    /* get new member info */
    getCardData();
}

function getCardData(){
    var userid = window.localStorage.user_id;
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/' + userid +'/cards', 
        success: function(data){
            console.log(JSON.stringify(data));
            if(data.success == "false"){
                alert('Cannot access card information.');
                window.location.assign('login.html');
            }
            else{
                // populate page with information
                window.localStorage.setItem('holder_name',data.card.holder_name);
                window.localStorage.setItem('card_number', data.card.card_number);
                window.localStorage.setItem('exp_month', data.card.expiration_month);
                window.localStorage.setItem('exp_year', data.card.expiration_year);
                window.localStorage.setItem('csv_code', data.card.csv_code);
                window.localStorage.setItem('zip', data.card.zip_code);
            }
            },
        error: function(data){
            console.log('cannot connect to sospeso server');
        }
    });
}

function onDeviceReady(){
    console.log('onDeviceReady');
        onResume();
        setTimeout(function() {
            // delay loading the page, ajax needs to retrieve all request data.
            $("#name").text(window.localStorage.holder_name);
            $("#cardNum").html(window.localStorage.card_number);
            $("#expMonth").html(window.localStorage.exp_month);
            $("#expDate").html(window.localStorage.exp_year);
            $("#csvCode").html(window.localStorage.csv_code);
            $("#zip").html(window.localStorage.zip);
        }, 1500);
}