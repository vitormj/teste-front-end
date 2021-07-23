function jsTest() {
	$('.js-test').html('JavaScript has been compiled!');
	$('body').addClass('js-compiled');
}

function intToreal (int) {
	var tmp = int + '';
	tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
	if (tmp.length > 6) tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
	return tmp;
}

function pegaDados() {
	var settings = {
		"url": "https://corebiz-test.herokuapp.com/api/v1/products",
		"method": "GET",
		"timeout": 0,
	  };
	  
	  $.ajax(settings).done(function (response) {
		console.log(response);
		var i = 0;
		$.each(response,function(){
			
			var produto = $(this).get(0);
			var quantidade ;
			var parcelas ;
			if( produto.installments.length > 0 ){
				quantidade = produto.installments[0].quantity;
				parcelas = produto.installments[0].value;
			}

			$item = $('<li class="shelf-item"><div class="shelf__default--wrapper"><div class="shelf-default--image"><figure><img src="'+produto.imageUrl+'" /></figure></div><div class="shelf-default--info"><span class="shelf-default--product-name">'+produto.productName+'</span><div class="shelf-default--price"><div class="shelf-default---old-price"><span class="old-price">R$ '+intToreal(produto.listPrice)+'</span></div><div class="shelf-default---best-price"><span class="best-price">R$ '+intToreal(produto.price)+'</span></div><div class="shelf-default---installments"><span class="installments">ou em '+quantidade+'x de R$ '+intToreal(parcelas)+'</span></div><div class="shelf__default--buy"><span>comprar</span></div></div></div></li>');

			$('.has-carroussel ul').append($item);
		})

		initCarousel();
	  });
}

function initCarousel (){
	$('.has-carroussel ul').slick({
		dots: true,
		arrows: true, 
		pauseOnHover: false,
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		autoplay: true,
		autoplaySpeed: 4000,
		speed: 600,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					arrows: false,
					slidesToShow: 3,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			}	
		]
	})
}