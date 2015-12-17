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
    var coffees = [];
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/' + "1" +'/purchased_item', 
        success: function(data){
            if(data.failed){
                alert('Cannot access your coffees.');
            }
            else{
                //store all coffees in this array
                $.each(data.data, function(key,value) {
                    //get all info and store in obj
                    var coffee_info = {
                        "item" : getItemById(value.item_id),
                        "buyer" : getUserById(value.buyer_id),
                        "redeemer" : getUserById(value.redeemer_id),
                        "is_redeemed" : value.is_redeemed
                    };
                    coffees.push(coffee_info);  
                });
            }
        },
        error: function(data){
            alert('ERROR');
        }
    });
    return coffees;
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


function getItemById(item_id){
    //initialize here for variable scope
    var item = {}
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/items/' + item_id, 
        success: function(data){
            if(data.failed){
                alert('Cannot access your coffees.');
            }
            else{
                item["id"] = data.data.id;
                item["name"] = data.data.name;
                item["price"] = data.data.price;
            }
        },
        error: function(data){
            alert('ERROR');
        }
    });
    return item;
}

function getUserById(user_id){
    //initialize here for variable scope
    var user = {}
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/' + user_id, 
        success: function(data){
            if(data.failed){
                alert('Cannot access your Sospeso Server');
            }
            else{
                user["id"] = data.data.id;
                user["first_name"] = data.data.first_name;
                user["last_name"] = data.data.last_name;
                user["email"] = data.data.email;
            }
        },
        error: function(data){
            alert('ERROR');
        }
    });
    return user;
}
