var item = {}
function getItemFromStorage(){
    //initialize here for variable scope
    var item_id = window.localStorage.itemDetail;
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
}

function populatePage(){
    getItemFromStorage();
    setTimeout(function(){ 
        if (window.localStorage.message == "null"){
            $("#itemName").append(item.name);
        } else {
            $("#itemName").append(item.name + "<br>" + window.localStorage.message);
        }
        new QRCode(document.getElementById("qrcode"), "http://192.241.168.227/api/v1/redeem/" + window.localStorage.purchaseItemId);
    }, 500)
}

populatePage();