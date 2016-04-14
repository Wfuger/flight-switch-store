// This identifies your website in the createToken call below
Stripe.setPublishableKey('pk_test_WxKLpM1zo3D4vjzfAZcWiaBV');

$(function() {
  window.setTimeout(function(){$('.success, .error').slideUp(500)}, 3000)
  $(".cart").on('click', '#cartbutton',function(){
    $(".cart tbody").toggle();
  });

  $(".cart td").mouseenter(function(){
    $(this).css('color', '#00a4e4')
    .mouseleave(function(){
      $('.cart td').css('color', 'black');
    })
  });

  $("#adminproducts").click(function(){
    $("#productsshow").show();
    $("#usersshow").hide();
    $("#ordersshow").hide();
  });

  $("#adminorders").click(function(){
    $("#ordersshow").show();
    $("#productsshow").hide();
    $("#usersshow").hide();
  });

  $("#adminusers").click(function(){
    $("#usersshow").show();
    $("#ordersshow").hide();
    $("#productsshow").hide();
  });

  $("#adminproducts").mouseenter(function(){
    $(this).css('color', '#00a4e4')
    .mouseleave(function(){
      $('#adminproducts').css('color', 'black');
    })
  });

  $("#adminorders").mouseenter(function(){
    $(this).css('color', '#00a4e4')
    .mouseleave(function(){
      $('#adminorders').css('color', 'black');
    })
  });

  $("#adminusers").mouseenter(function(){
    $(this).css('color', '#00a4e4')
    .mouseleave(function(){
      $('#adminusers').css('color', 'black');
    })
  });

  $('#payment-form').on('submit', function(event) {
    event.preventDefault();
    var $form = $(this);

    // Disable the submit button to prevent repeated clicks
    $form.find('button').prop('disabled', true);
    Stripe.card.createToken($form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });

  $.ajax({
    method: 'get',
    url: '/cart',
  }).then(function(response){
    console.log(response);
    if(response.messages.errors){
      // Render errors to user
    }else{
      $('.cart').empty().html(response.html)
    }
  })

  $('form[action="/cart/update"]').on('submit', function(event){
      event.preventDefault();
      console.log($(this));
  }

  $('form[action="/cart"]').on('submit', function(event){
    event.preventDefault();
    console.log($(this).serialize());
    data = $(this).serialize()
    $.ajax({
      method: 'post',
      url: '/cart',
      data: data
    }).then(function(response){
      console.log(response);
      if(response.messages.errors){
        // Render errors to user
      }else{
        $('.cart').empty().html(response.html)
      }
    })
  })
});

// ***Outside of jquery


function stripeResponseHandler(status, response) {
  var $form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    $form.find('.payment-errors').text(response.error.message);
    $form.find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    $form.get(0).submit();
  }
};
