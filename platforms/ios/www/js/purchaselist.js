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
        url: 'http://192.241.168.227/api/v1/users/' + userid +'/purchases', 
        success: function(data){
            console.log(JSON.stringify(data));
            if(data.success == "false"){
                alert('Cannot access card information.');
                window.location.assign('login.html');
            }
            else{
                // populate page with information
                window.localStorage.setItem('item_id',data.purchased_item.item_id);
                window.localStorage.setItem('purchase_id', data.purchased_item.purchase_id);
                window.localStorage.setItem('buyer_id', data.purchased_item.buyer_id);
                window.localStorage.setItem('redeemer_id', data.purchased_item.redeemer_id);
                window.localStorage.setItem('is_redeemed', data.purchased_item.is_redeemed);
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