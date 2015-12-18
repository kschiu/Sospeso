var items = []
var users = []

function getUsers(){
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/users/', 
        success: function(data){
            if(data.success == "false"){
                alert('Cannot connect to Sospeso Server.');
            }
            else{
                $.each(data.data, function(key,value){
                    var redeemer = {
                        "id": value.id,
                        "name": value.first_name + " " + value.last_name
                    };
                    users.push(redeemer);
                });
            }
        },
        error: function(data){
            console.log('Cannot Connect to Sospeso Server');
        }
    });
}

function getItems(){
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/items/', 
        success: function(data){
            if(data.success == "false"){
                alert('Cannot connect to Sospeso Server.');
            }
            else{
                $.each(data.data, function(key,value){
                    var listItem = {
                        "id": value.id,
                        "name": value.name + " from " + value.store_name
                    };
                    items.push(listItem);
                });
            }
        },
        error: function(data){
            console.log('Cannot Connect to Sospeso Server');
        }
    });
}

function populateFields(){
    console.log("DAS");
    getItems();
    getUsers();
    setTimeout(function(){
        for(var i in items){
            var value = items[i];
            $( "#item_id" ).append('<option value='+ value.id +'>'+ value.name +'</option>');
        }
        for(var u in users){
            var value = users[u];
            $( "#redeemer_id" ).append('<option value='+ value.id +'>'+ value.name +'</option>');
        }  
    }, 500);
}

populateFields();

$(function sendCoffee() {
    $('#submit').on('submit', function(event) {
        // prevent form auto refresh
        event.preventDefault();

        var buyer_id = window.localStorage.user_id;
        var user_id = window.localStorage.user_id;
        var item_id = $("#item_id").val();
        var redeemer_id = $("#redeemer_id").val();
        var card_id = 1;

        var d = {"buyer_id": buyer_id,
                "user_id" : user_id,
                "item_id" : item_id,
                "redeemer_id" : redeemer_id,
                "card_id" : card_id,
                "is_redeemed" : false
        }

        console.log(d);
        $.ajax({
            type: 'POST',
            contentType: "application/json", 
            url: 'http://192.241.168.227/api/v1/createPurchase',
            data: JSON.stringify(d),
            dataType: "json",
            success: function(data){
                alert("Thank you for your purchase!")
            },
            error: function(data){
                alert('ERROR2');
            }
        }); 
    });
});
