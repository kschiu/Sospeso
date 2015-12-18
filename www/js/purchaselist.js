var coffees=[];

function getPurchaseList(){
    var userid = window.localStorage.user_id;
    $.ajax({
        type: 'GET',
        contentType: "application/json", 
        url: 'http://192.241.168.227/api/v1/itemsByRedeemer/' + userid, 
        success: function(data){
            if(data.failed){
                alert('Cannot access your coffees.');
            }
            else{
                //store all coffees in this array
                $.each(data.data, function(key,value) {
                    //get all info and store in obj
                    var coffee_info = {
                        "purchaseItemId" : value.id,
                        "item" : getItemById(value.item_id),
                        "buyer" : getUserById(value.buyer_id),
                        "redeemer" : getUserById(value.redeemer_id),
                        "is_redeemed" : value.is_redeemed,
                        "message" : value.message
                    };
                    console.log(coffee_info);
                    coffees.push(coffee_info);  
                });
            }
        },
        error: function(data){
            alert('ERROR');
        }
    });
}

function populateMyCoffees(){
    $( "#coffeeList" ).empty();
    if (coffees.length == 0){
        $( "#coffeeList" ).append('<br><br><center><h3> You have no coffees! </h3> <br> <h3> Try sending a few coffees to your friends instead?</h3><br><center>')
    } else {
        for(var key in coffees) {
            var value = coffees[key];
            if (!value.is_redeemed){
                $( "#coffeeList" ).append( '<li class="table-view-cell media"> \
                    <a class="navigate-right" onClick="setDetailItem('+value.item.id+', '+value.purchaseItemId +', ' + '\'' + value.message + '\'' +')">\
                        <img class="media-object pull-left" src="img/coffeeimg.png" style="width:50px;height:50px;">\
                          <div class="media-body">\
                            '+ value.item.name +'\
                            </h4><h5>From '+ value.buyer.first_name + " " + value.buyer.last_name +'</h5>\
                          </div>\
                    </a>\
                </li>');
            }
        }
    }
}

//stores the item id in local storage
//for the detailed view
function setDetailItem(item_id, purchaseItemId, message){
    window.localStorage.setItem("itemDetail", item_id);
    window.localStorage.setItem("purchaseItemId", purchaseItemId);
    window.localStorage.setItem("message", message);
    window.location.assign("coffeeDetail.html");
}

function loadMyCoffees(){
    $( "#coffeeList" ).append('<center><img src="img/load.gif" style="width:75px;height:75px;"><center>')
    getPurchaseList();
    setTimeout(function(){
        populateMyCoffees();
    }, 500);
}

loadMyCoffees();

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
