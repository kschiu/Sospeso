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
                        "is_redeemed" : value.is_redeemed
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
        $( "#coffeeList" ).append('<center><p> You have no coffees!</p><center>')
    } else {
        for(var key in coffees) {
            var value = coffees[key];
            if (!value.is_redeemed){
                $( "#coffeeList" ).append( '<li class="table-view-cell media"> \
                    <a class="navigate-right" onClick="setDetailItem('+value.item.id+', '+value.purchaseItemId +')">\
                        <img class="media-object pull-left" src="img/tazza.jpeg" style="width:50px;height:50px;">\
                          <div class="media-body">\
                            '+ value.item.name +'\
                            <p>From '+ value.buyer.first_name +'</p>\
                          </div>\
                    </a>\
                </li>');
            }
        }
    }
}

//stores the item id in local storage
//for the detailed view
function setDetailItem(item_id, purchaseItemId){
    window.localStorage.setItem("itemDetail", item_id);
    window.localStorage.setItem("purchaseItemId", purchaseItemId);
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
