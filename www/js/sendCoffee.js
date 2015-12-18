$(function sendCoffee() {
    $('#submit').on('submit', function(event) {
        // prevent form auto refresh
        event.preventDefault();

        var buyer_id = window.localStorage.user_id;
        var user_id = window.localStorage.user_id;
        var item_id = 1; //$("#item_id").val();
        var redeemer_id = 2; //$("#redeemer_id").val();
        var card_id = 1;

        var d = {"buyer_id": buyer_id,
                "user_id" : user_id,
                "item_id" : item_id,
                "redeemer_id" : redeemer_id,
                "card_id" : card_id,
                "is_redeemed" : false
        }

        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8", 
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