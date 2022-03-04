$(document).ready(function() {
    $.ajaxSetup({
      headers: {
          "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
      },
  });
});
var items = JSON.parse(localStorage.getItem('cart')) || [];
var html = "";
var total = 0;
var empty_cart = '<div class="cart-empty"> <p class="cart-empty-text"> Your cart is empty.</p></div>';
items.length == 0 ? $('#cart-body').html(empty_cart) : items.forEach(function(item){
    html+= '<div class="cart-items">';
    html += '<div class="cart-item" id="cart-item'+item.id+'">';
    html += '<div class="cart-item-left">'
    html += '<div class="cart-item-image" style="background-image: '+item.color+'"><div class="cart-block-item"><img src='+item.image+' /></div></div>';
    html += '</div>';
    html += '<div class="cart-item-right">';
    html += '<div class="cart-item-name">'+item.name+'</div>';
    html += '<div class="cart-item-price">$'+item.price+'</div>';
    html += '<div class="cart-item-action">';
    html += '<div class="cart-item-count">';
    html += '<div class="cart-item-decrease" onclick="onDecrease('+item.id+');">-</div>';
    html += '<div class="cart-item-quantity'+item.id+'">'+item.quantity+'</div>';
    html += '<div class="cart-item-increase" onclick="onAdd('+item.id+');">+</div>';
    html += '<div class="cart-item-remove"> <div class="cart-item-remove"><img onclick="remove_cart('+item.id+');"  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC" ></div></div>';
    html += '</div>'; // của cart-item-count
    html += '</div>' // của cart-item-action
    html += '</div>'; // của cart-item-right
    html += '</div>';// của cart item
    html += '</div>';// của cart items
    $('.cart-items').html(html);
    if (item.id)
    {
        $('.card-body #btn-add-to-cart'+item.id).hide();
    }
    total += item.price * item.quantity;
    $('.cart-total').html('$'+total.toFixed(0)+'');
    console.log(total);
});

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
            var item = items.find(item => item.id === data.id);
            if(item){
                item.quantity += 1;
                $('.cart-item-quantity'+id).html(item.quantity);
            }
            else{
                items.push(data);
                html+= '<div class="cart-items">';
                html += '<div class="cart-item" id="cart-item'+data.id+'">';
                html += '<div class="cart-item-left">'
                html += '<div class="cart-item-image" style="background-image: '+data.color+'"><div class="cart-block-item"><img src='+data.image+' /></div></div>';
                html += '</div>';
                html += '<div class="cart-item-right">';
                html += '<div class="cart-item-name">'+data.name+'</div>';
                html += '<div class="cart-item-price">$'+data.price+'</div>';
                html += '<div class="cart-item-action">';
                html += '<div class="cart-item-count">';
                html += '<div class="cart-item-decrease" onclick="onDecrease('+data.id+');">-</div>';
                html += '<div class="cart-item-quantity'+data.id+'">1</div>';
                html += '<div class="cart-item-increase" onclick="onAdd('+data.id+');">+</div>';
                html += '<div class="cart-item-remove"> <div class="cart-item-remove"><img onclick="remove_cart('+data.id+');" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAB2AAAAdgB+lymcgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALISURBVHic7Zs9bxNBEIYfgyUKAhhQUhDRICEBCh0fgkhBNIT8gPwZ6Gig5y8QCUhH5AqE3EZJgQRKEDSpKEAQkTMdcijGRvi8Z+/e3eze4X2kKe40t/Pu+LRfN4bIdNNQbLsJ3ATOFWznC7AJ/C6syCMngC3gsCTb7LdZGx5SXucH9kBD6BGNRoGrNWlTLQEa7R5VaFMtAbXBZwLWkVnHxtZ9iZr6N6Bp6TcHXAOOW/qfz7i36un5X8A28NXSfywrQJfypzVtS4D7ZSRgpwKdyWsfJnXOZincxf7VrxoJcHKcg80g2ClFShg6ZTQyD2xQr3GgC7yi+EYs8t+TZ329gKwJfiLzbRU4Cywh/fmuGegpw/PssmYwS5aAfURTD3ikFegKo4PNe61gDrxjWFMPuGj7sMte4JLh3mWH57VYSF03cDg7cEmAabxQ2aM7UkjX1O8GfSRgHmgjM8YO4wfOFWC379umYguZVcyrrkm0U/4JMGvwm2N0tblh0b5Jk+222csbcCd1PYOsI9KYzhvuqij6Bx8JMO0kZyz91HehcRAMLSA0MQGhBYQmJiC0gNDEBIQWEJqYgNACQhMTEFpAaGICQgsITUxAaAGhiQnwEMP0+axr6af+6c1HAjqp6wQpo02zxWhi3moIykveU+FBfUGCfEq7N8Z3GSlrSbD/vl/oVNiFvAnQpvLH4pUmJsDBN2tEDlnHn1UBZppljLgkYC/j/i2HNspmMeP+nkawY8ABowPOa41gFjSQaTKt5wDRqsKaIeAh8Bjd/x+laQBPMrQ80wy8iJSgmAK/QWpzW4rxW8gndNMvPyiPua0YH4DnGcGrYGuK/f7LGeBjgM5Nsl3gtGK/h7gAfFbukIt96mvySgt4WVB4UesBL4BTyn0dy42+iEGxog/bR8ai60XFlzl1NZFiyllknNDgB/ANKbaq1V9pI1XlD82w8ru3YIVHAAAAAElFTkSuQmCC" ></div></div>';
                html += '</div>'; // của cart-item-count
                html += '</div>' // của cart-item-action
                html += '</div>'; // của cart-item-right
                html += '</div>';// của cart item
                html += '</div>';// của cart items
                $('#cart-body').html(html);
                $('.cart-empty').hide();
                total = items.reduce((a,c) => a + c.quantity * c.price, 0);
                $('.cart-total').html('$'+total.toFixed(0)+'');
                $('.card-body #btn-add-to-cart'+data.id).remove();
                $('#product-price'+id).append('<div class="btn btn-primary btn-add-to-cart check">  <i class="fa-solid fa-check"></i> </div>');
            }
            localStorage.setItem('cart', JSON.stringify(items));
        }
    });
}
window.onAdd = function(id)
{
    var item = items.find(item => item.id === id);
    if (item) {
        item.quantity +=1;
        $('.cart-item-quantity'+id).html( item.quantity);
        localStorage.setItem('cart', JSON.stringify(items));
        total = items.reduce((a,c) => a + c.quantity * c.price, 0);
        $('.cart-total').html('$'+total.toFixed(0)+'');
    }
}
window.onDecrease = function(id){
    var item = items.find(item => item.id === id);
     if (item.quantity == 1) {
        var value_filter = (items.filter((x) => x.id !== id));
        $('#cart-item'+id).remove();
        localStorage.setItem('cart', JSON.stringify(value_filter));
        total = items.reduce((a,c) => a + c.quantity * c.price, 0);
        $('.cart-total').html('$'+0.00+'');
        $(`#product-price${id} .check`).remove();
        $('#product-price'+id).append('<button class="btn-add-to-cart" id="btn-add-to-cart'+id+'" onClick="add_to_cart('+id+')"> Add to cart </button>');
    }
    else
    {
        item.quantity -=1;
        $('.cart-item-quantity'+id).html( item.quantity);
        localStorage.setItem('cart', JSON.stringify(items));
        total = items.reduce((a,c) => a + c.quantity * c.price, 0);
        total = total.toLocaleString('it-IT', {style : 'currency', currency : 'USD'});
        $('.cart-total').html('$'+total.toFixed(0)+'');
    }
    
} 
window.remove_cart = function(id){
        // var item = items.find(item => item.id === id);
        var value_filter = (items.filter((x) => x.id !== id));
        $('#cart-item'+id).remove();
        localStorage.setItem('cart', JSON.stringify(value_filter));
        total = items.reduce((a,c) => a + c.quantity * c.price, 0);
        $('.cart-total').html('$'+0.00+'');
        $(`#product-price${id} .check`).remove();
        $('#product-price'+id).append('<button class="btn-add-to-cart" id="btn-add-to-cart'+id+'" onClick="add_to_cart('+id+')"> Add to cart </button>');
}