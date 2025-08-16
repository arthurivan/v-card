jQuery(document).ready(function($) {

	jQuery.noConflict();


	/* ---------------------------------------------------------------------- */
	/*	Input & Textarea Placeholder
	/* ---------------------------------------------------------------------- */ 
	$('input[type="text"], textarea').focus(function(){
		$(this).removeClass('error');
		if($(this).val() == $(this).attr('placeholder'))
			$(this).val('');
	}).blur( function(){ 
		if($(this).val() == '')
			$(this).val($(this).attr('placeholder'));
	});


	/* ---------------------------------------------------------------------- */
	/*	Fancybox Gallery Images
	/* ---------------------------------------------------------------------- */ 
	 try {
		$('#portfolio-list a.image-hover.image').fancybox({
			openEffect	: 'fade',
	    	closeEffect	: 'fade',
	          helpers: {
	              title : {
	                  type : 'float'
	              }
	          }
	      });

	    $('#portfolio-list a.image-hover.video').fancybox({
		
			fitToView	: false,
	
			type: 'iframe',
			autoSize	: false,
			closeClick	: false,
			openEffect	: 'fade',
			closeEffect	: 'fade',
			scrolling : 'no'
		});
	} catch(err) {

	}

	/* ---------------------------------------------------------------------- */
	/*	Social Media Effect
	/* ---------------------------------------------------------------------- */ 
	$('#social-media a').on('mouseenter', function(){
		$(this).children('i').css({'width': '12px', 'height': '12px'}).animate({'width': '16px', 'height': '16px'}, 200);
	});

	/* ---------------------------------------------------------------------- */
	/*	LavaLamp
	/* ---------------------------------------------------------------------- */ 
	$("#portfolio-filter").lavaLamp({
		speed: 300
	});

	/* ---------------------------------------------------------------------- */
	/*	Portfolio
	/* ---------------------------------------------------------------------- */ 

	// Needed variables
	var $container	 	= $('#portfolio-list');
	var $filter 		= $('#portfolio-filter');
		
	// Run Isotope  
	$container.isotope({
		filter				: '*',
		layoutMode   		: 'masonry',
		animationOptions	: {
		duration			: 750,
		easing				: 'linear'
	   }
	});

	$(window).bind('resize', function(){
		var selector = $filter.find('a.active').attr('data-filter');
		$container.isotope({ 
			filter	: selector,
			animationOptions: {
				duration: 750,
				easing	: 'linear',
				queue	: false,
	   		}
		});
	  	return false;
	});
	
	// Isotope Filter 
	$filter.find('a').click(function(){
		var selector = $(this).attr('data-filter');
		$container.isotope({ 
			filter	: selector,
			animationOptions: {
				duration: 750,
				easing	: 'linear',
				queue	: false,
	   		}
		});
	  	return false;
	});

	//Append effect to portfolio image
	$('#portfolio-list li').each(function(){
		if($(this).find(' > a:first').hasClass('image')){
			$(this).append('<a href="'+ $(this).find('a:first').attr('href') +'" class="image-hover image"></a>');
		} else if($(this).find(' > a:first').hasClass('video')){
			$(this).append('<a href="'+ $(this).find('a:first').attr('href') +'" class="image-hover video"></a>');
		}
	});
	
	//Image hover effect
	$('#portfolio-list li').on('mouseenter', function(){
		$(this).children('.image-hover').stop(true,true).slideDown(200);
	}).on('mouseleave', function(){
		$(this).children('.image-hover').stop(true,true).slideUp(200);
	});
	
	// Copy categories to item classes
	$filter.find('a').click(function() {
		var currentOption = $(this).attr('data-filter');
		$filter.find('a').removeClass('active');
		$(this).addClass('active');
	});

	$('#skills li').each(function(){
		$(this).append('<div class="progressbar"></div>');
	});

	$('#header-inner nav a:not(.external)').on('click', function(e){
		e.preventDefault();

		let animating = false;
		if(!$(this).hasClass('active') && !animating){
			$this = $(this);

			animating = true;
			var id_old_active = $('#header-inner nav a.active').attr('href');
			$('#header-inner nav a').removeClass('active');

			var id_active = $(this).attr('href');

			$(id_old_active).removeClass('active').stop().slideUp('slow', function(){
				$this.addClass('active');

				$('#loading-container').show();
				$('#loading').css({'width': '0px'}).animate({'width' : '100%'}, 700, function(){
					$('#loading-container').hide();
					$('#skills li div.progressbar').css({'width':'0px'});
					$(id_active).addClass('active').stop().slideDown('slow', function(){
						$('#skills li').each(function(){
							$(this).children('div.progressbar').css({'width':'0px'}).animate({'width': $(this).attr('data-value') + '%'}, 500);
						});
						create_map();
					});
				});
			});
		}
	});

	
	/* ---------------------------------------------------------------------- */
	/*	Others
	/* ---------------------------------------------------------------------- */ 
	$('#content > section').css({'display':'none'});
	$('#content').css({'visibility':'visible'});
	$('html').css({'overflow':'auto'});

	/* ---------------------------------------------------------------------- */
	/*	First slideDown Effect
	/* ---------------------------------------------------------------------- */ 
	var id_active = $('#header-inner nav a.active').attr('href');
	$('#loading-container').show();
	$('#loading').css({'width': '0px'}).animate({'width' : '100%'}, 700, function(){
		$('#loading-container').hide();
		$(id_active).addClass('active').stop().slideDown('slow');
			$('#skills li div.progressbar').css({'width':'0px'});
	$('#skills li').each(function(){
							$(this).children('div.progressbar').css({'width':'0px'}).animate({'width': $(this).attr('data-value') + '%'}, 500);
						});
	});
});