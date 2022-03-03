$(document).ready(function() {
    $.ajaxSetup({
      headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
  });
});
var cart = [];
window.add_to_cart = function(id)
{
    var data = {
        id: id
    };
    $.ajax({
        type: "POST",
        url: "/add-to-cart",
        data: data,
        dataType: "JSON",
        success: function (response) {
            var data = response.data;
            cart.push(data);
            if(get_data.length == 0) {
                console.log('vao day');
                localStorage.setItem("cart", JSON.stringify(cart));
                get_data = JSON.parse(localStorage.getItem("cart"));
            }
            else
            {
                localStorage.setItem("cart", JSON.stringify(cart));
                get_data.forEach(function(element) {
                    if (element.id == data.id)
                    {
                        localStorage.setItem("cart", JSON.stringify({...element, quantity: element.quantity + 1 }))
                    }
                    else
                    {
                        localStorage.setItem("cart", JSON.stringify(cart));
                    }
                })
                // var exist = get_data.find((x) => x.id == data.id);
                // if (exist)
                // {
                //     get_data.map((x) => x.id == data.id ? localStorage.setItem("cart", JSON.stringify({...exist, quantity: exist.quantity + 1 })) : x )
                // }
                // else
                // {
                //     console.log('khong ton tai id');
                //     get_data = JSON.parse(localStorage.getItem("cart"));
                // }
            }
            // if(cart.length == 0)
            // {
            //     localStorage.setItem("cart", JSON.stringify(cart));
            //     console.log('macbook');
            // }
            // else
            // {
            //     console.log('hhh');

            // }
        }
    });
}