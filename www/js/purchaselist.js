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
    getPurchaseList();
}

function getPurchaseList(){
    var userid = window.localStorage.user_id;
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/' + "1" +'/purchased_item', 
        success: function(data){
            if(data.failed){
                alert('Cannot access your coffees.');
            }
            else{
                $.each(data.data, function(key,value) {
                    console.log(value.item_id);
                });
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
            $("#item").text(window.localStorage.item_id);
            $("#purchase").html(window.localStorage.purchase_id);
            $("#buyer").html(window.localStorage.buyer_id);
            $("#redeemer").html(window.localStorage.redeemer_id);
            $("#is_redeemed").html(window.localStorage.is_redeemed);
        }, 1500);
}