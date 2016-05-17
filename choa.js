$(document).ready(function() {

	//FOR DEV PURPOSES: Live-sense browser size _______________________________________________________________
	//Can comment out or remove when no longer needed.

	function jqUpdateSize(){
		// Get the dimensions of the viewport
		// var width = $(window).width();
		// var height = $(window).height();
		// Get the dimensions of the browser
		var width = $(window).outerWidth(true)+15;    //15
		var height = $(window).outerHeight(true)+101; //101
		//offsets calibrate it to Mozilla 'Resize' tool. Don't know why....

		$('#jqWidth').html(width);      // Display the width
		$('#jqHeight').html(height);    // Display the height
	}

	$(document).ready(jqUpdateSize);    // When the page first loads
	$(window).resize(jqUpdateSize);     // When the browser changes size

	//______________________________________________________________________________________

	// Toggles plus and minus icons when clicked on parent - global
	$(".fa-minus, .fa-plus").parent().click(function () {
		$(this).find('i').toggleClass('fa-minus fa-plus');
	});

	// Toggles plus and minus circle icons when clicked on parent - global
	$(".fa-plus-circle, fa-minus-circle").closest(".panel-heading").click(function () {
		$(this).find('i').toggleClass('fa-minus-circle fa-plus-circle');
	});

	//align accordion carrots
	function accordCarrotAlign(){
		$(window).resize(function(){

			//write them as line-height styles + values to the glyph links
			$('div.accordion-heading h4.panel-title a i.fa, div.panel-heading h2.panel-title i.fa').each(function(){
				//console.log('Line-Height: '+$(this).height());
				$(this).css('line-height',$(this).height()+'px');
			});
		})
		.resize();
	}

	accordCarrotAlign();

	//______________________________________________________________________________________

	// Related Content Carousel

	// Center controls vertically and horizontally

	function centerCarouselControl() {

		$('.jcarousel-wrapper').find('#related-ctrl-l, #related-ctrl-r').css({
			'position' : 'absolute',
			'top' : '50%',
			'margin-top' : -$('#related-ctrl-l, #related-ctrl-r').outerHeight()/2
		});

	}

	function relatedCarousel() {
		$('.relatedContentWrapper').each(function() {

			var jcarousel = $(this).find('.jcarousel');

			jcarousel
				.on('jcarousel:reload jcarousel:create', function () {
					var carousel = $(this),
						width = carousel.innerWidth();
						// console.log(carousel);

					if (width >= 600) {
						width = width / 2;
						
					} else if (width >= 350) {
						
					}

					carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
				})
				.jcarousel({
					wrap: 'circular'
				});

			$(this).find('.jcarousel-control-prev')
				.jcarouselControl({
					target: '-=1'
			});

			$(this).find('.jcarousel-control-next')
				.jcarouselControl({
					target: '+=1'
			});
		});
	}

	relatedCarousel();
			
	centerCarouselControl();

	//______________________________________________________________________________________

	// Finds related content carousel items. Hides controllers if equal or less than two

	function relatedContentControllers(){

		$('.relatedContentWrapper').each(function() {
			var relatedWrapper = $(this).find('.jcarousel ul li');

			// Condition for only two related content pieces
			if (relatedWrapper.length < 2) {
				$(this).find('.related-ctrl-l, .related-ctrl-r').css('pointer-events', 'none');
				$(this).find('.fa-angle-left, .fa-angle-right').css('display', 'none');
			} else if ($(window).width() >= 768) {
				$(this).find('.related-ctrl-l, .related-ctrl-r').css('pointer-events', 'visible');
				$(this).find('.fa-angle-left, .fa-angle-right').css('display', 'block');
			} else {
				$(this).find('.related-ctrl-l, .related-ctrl-r').css('pointer-events', 'visible');
				$(this).find('.fa-angle-left, .fa-angle-right').css('display', 'block');
			}

			// Condition for only one related content piece

			if (relatedWrapper.length === 1) {
				$(this).find('.jcarousel ul').css('width', 'auto');
				$(this).find('.jcarousel ul li').attr('style', 'width: 100% !important; list-style: none; min-width: 100% !important');
				$(this).find('.jcarousel ul li a').addClass('col-sm-12, col-md-12, col-lg-12').queue(function(){
					$(this).removeClass('col-sm-6 col-md-6');
				});

			}

			if ( $(window).width() >= 700 && relatedWrapper.length === 2 ) {
				$(this).find('.related-ctrl-l, .related-ctrl-r').css('pointer-events', 'none');
				$(this).find('.fa-angle-left, .fa-angle-right').css('display', 'none');
			}

		});
	}

	relatedContentControllers();

	//______________________________________________________________________________________

	// // Place holder for search
	$('input.search-bar').placeholder();

	//Hover effect to menus
	jQuery('ul.nav li.dropdown').hover(function() {
	  if ($(window).width() > 767) {
	   jQuery(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn();
	  }
	}, function() {
	 if ($(window).width() > 767) {
		 jQuery(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut();
		}
	});


	// Remove/add disabled class to first level nav for mobile/desktop
	function dualNav() {
		if ($(window).width() >= 768) {
			$('.dual-action').addClass('disabled');
		} else {
			$('.dual-action').removeClass('disabled');
		}
	}
	// Call function for dual action navigation
	dualNav();

	//______________________________________________________________________________________

	//Figure out width of all breadcrumb LIs to center them in the window

	function setBreadcrumbsWidth() {
		setTimeout(function(){
			var accum_width = 0;

			$('.bread-container ul').find('li').each(function() {
				accum_width += $(this).outerWidth()+10;
			});

			$('.bread-container ul').width(accum_width);
		}, 150);

		setTimeout(function(){
			$('.bread-container ul').css({"visibility": "visible"});
		}, 50);
	}

	setBreadcrumbsWidth();


	//______________________________________________________________________________________


	//Truncate the titles in news pods. Limit resize callbacks until user is finished resizing window.
	function truncateText() {
		var delay = (function(){
		  var timer = 0;
		  return function(callback, ms){
			clearTimeout (timer);
			timer = setTimeout(callback, ms);
		  };
		})();

		/* delay(function(){
			$('a.photo-pod .pod-text h3').trunk8({
				lines: 2
			});
		}, 500); */

	}

	if ($('*').hasClass('photo-pod')) { 
		truncateText();
	}

	//______________________________________________________________________________________
	
	//For mobile panels
	$('.panel-heading').on('click', function(e){

		// Toggles section arrows in mobile view
		if ($(this).not(".active")) {
			$('.panel-heading i').removeClass('fa-chevron-up');
			$('.panel-heading i').addClass('fa-chevron-down');
		}
			$(document).on('click','.panel-heading',function(){

				if ($(this).is(".active")) {
					$('.panel-heading.active i').removeClass('fa-chevron-down');
					$('.panel-heading.active i').addClass('fa-chevron-up');
				}

			});

		e.preventDefault();
		// console.log(this);
		var $panelHeading = $(this);
		var $panel        = $panelHeading.parent();

		var current       = $(this).parent().is($('.panel.active'));
		//don't know if just ading "relatedContent" without it's own VAR is the best idea. TEST! At the breakpoiont, need to make "relatedContent" display: none.
		$('.panel.active, .panel-heading.active').removeClass('active').find('.panelWrapper').slideUp(100, function(){
			$(this).removeAttr('style');
		});

		if(current) {
			return false;
		}

		$panelHeading.parent().find('.panelWrapper').slideToggle();
		$panelHeading.toggleClass('active');
		$panel.toggleClass('active');

		// Calls accordion caret alignment function
		accordCarrotAlign();
		//truncate text if collapsable section - mobile
		truncateText();
	});

	// Displays .panelWrapper & .relatedContent if static (non-expanding) header is present
	if ($(".panelWrapper").prev().hasClass("panel-heading-static")) {
		$(this).css("display", "block");
	}

	//______________________________________________________________________________________

	// Related content video and overlays

	//Read height of videoContainer, apply to parent vid container and overlay 
	function relatedVideoSize(){
		$(".videoContainer").each(function() {
			var videoHeight = $(this).css('height');
			$('.relatedContent .video').css('height',videoHeight);
			// console.log("Related video div are: "+videoHeight);
		});
	}

	$(document).ready(relatedVideoSize);    // When the page first loads
	$(window).resize(relatedVideoSize);     // When the browser changes size

	//______________________________________________________________________________________

	// Related Content - enables video and photo gallery capability

	// If download is empty. remove it
	$('*[download=""]').removeAttr("download");
	// If data-toggle is empty. remove it
	$('*[data-toggle=""]').removeAttr("data-toggle");
	// If data-remote is empty. remove it
	$('*[data-remote=""]').removeAttr("data-remote");
	// If data-gallery is empty. remove it
	$('*[data-gallery=""]').removeAttr("data-gallery");


	//______________________________________________________________________________________

	// Lightbox for videos and photos

	$(document).delegate('*[data-toggle="lightbox"]', 'click', function(event) {
		var itemIndex = '';
		var numImgs = $(this).next('.otherGalleryImages').children('a.img').length+1;

		event.preventDefault();
		$(this).ekkoLightbox({
			keyboard: true,
			always_show_close: true,
			loadingMessage: 'Content is Loading....',
			allowfullscreen: true,
			
			//get the index of the image.
			onShown: function() { 
				if (numImgs > 1) {
					// Single-image galleries have no counter, videos only have one item.
					$('.modal-footer').after('<span class="imageCounter">'+'1'+'/'+numImgs+' images</span>');
				}
			},
			onNavigate: function(direction, itemIndex) {
				var offsetNum = itemIndex+1;
				$('span.imageCounter').replaceWith('<span class="imageCounter">'+offsetNum+'/'+numImgs+' images</span>');
			}
		});
	});

	//______________________________________________________________________________________

	// Back To Top Button - Global

	// Append "Back To Top" link to all HTML pages
	$('body').append($('<div id="top-link-block" class="hidden"><a href="#top""><img src="Content/Childrens/assets/images/icons/back_top_icon.png"></a></div>'));
	
	// Only enable if the document has a long scroll bar
	// Note the window height + offset
	if ( ($(window).height() + 100) < $(document).height() ) {
		$('#top-link-block').removeClass('hidden').affix({

			// How far to scroll down before link "slides" into view
			offset: {
				top: 100
			}
		});
		$('#top-link-block').hide().fadeIn(700);
	}

	// Hides back to top button if document is less than 1500px in height
	if ($('body').height() < 1500) {
		$('#top-link-block').css('display', 'none');
	}


	// console.log("Window ", $(window).height());
	// console.log("Document ", $(document).height());
	$("#top-link-block, .filter-search-btn").click(function () {
		$('html,body').animate({
			scrollTop: 0
		},'slow');
		return false;
	});

	//______________________________________________________________________________________

	// Toggles Menu Icon - Mobile - Global
	
	$('.navbar-header button').on('click', function(){
		var $i = $(this).parent().find('.fa');
		if($i.hasClass('fa-bars')){
			$i.removeClass('fa-bars').addClass('fa-times');
		} else {
			$i.removeClass('fa-times').addClass('fa-bars');
		}
	});

	//______________________________________________________________________________________

	// Header Carousel


	// Checks for one or more hero images in hero container. If less than one removes elements
	if ($('.hero-carousel > .row > .hero-headline').is(':empty')) { 
		$(".hero-headline").parent(".row").css('display','none');
	}

	if ($('.hero-container > .item').length > 1) {
		$(".hero-container .carousel-indicators, .hero-container .carousel-control .glyphicon-chevron-left, .hero-container .carousel-control .glyphicon-chevron-right").css('display', 'block');
	}

	function headerCarousel() {
		$('.hero-carousel,.pageCarousel').carousel({
			//int in milliseconds, or false to remove auto interval.
			interval: 7000,
			pause: "hover",
			wrap: true,
			keyboard: true
		});
	}

	//If Hero/Carousel CTA buttons have data, show them
	$("button.cta p").each(function(){
		//if it has content, show parent button.
		if($(this).text().trim().length) {
			$(this).parents("button.cta").css("display", "block");
		}
	});

	//mobile swipe events from jQ Mobile custom set.
	function carouselSwipe() {

		$('.pageCarousel').each(function() {
			$(this).swiperight(function() {  
				$(this).carousel('prev');  
			});

			$(this).find('.right.carousel-control').click(function(){
				$(this).parents('.pageCarousel').carousel('next');
			});

			$(this).swipeleft(function() {  
				$(this).carousel('next');  
			});  

			$(this).find('.left.carousel-control').click(function(){
				$(this).parents('.pageCarousel').carousel('prev');
			});
		});

		$('.hero-carousel').each(function() {
			$(this).swiperight(function() {  
				$(this).carousel('prev');  
			});

			$(this).find('.right.carousel-control').click(function(){
				$(this).parents('.hero-carousel').carousel('next');
			});

			$(this).swipeleft(function() {  
				$(this).carousel('next');  
			});  

			$(this).find('.left.carousel-control').click(function(){
				$(this).parents('.hero-carousel').carousel('prev');
			});
		});
	}

	// Only calls both functions if there is more than 1 .jumbotron
	if ($(".item").length > 1) {
		headerCarousel();
		carouselSwipe();
	}

	//______________________________________________________________________________________

	// Twitter Carousel
	function twitterCarousel() {
		$('#twitterCarousel').carousel({
			//int in milliseconds, or false to remove auto interval.
			interval: 4000,
			pause: "hover",
			wrap: true,
			keyboard: true
		});
	}

	//mobile swipe events from jQ Mobile custom set. --Repeated--  so it doesn't call twice with another carousel on page.
	function twitterSwipe() {
		$('#twitterCarousel').swiperight(function() {
			$('#twitterCarousel').carousel('prev');
		});  
		$('#twitterCarousel').swipeleft(function() {
			$('#twitterCarousel').carousel('next');
		});
	}

	// Only calls function if #twitterCarousel is loaded in DOM
	if ($("#twitterCarousel").length > 0) {
		twitterCarousel();
		twitterSwipe();
	}

	//______________________________________________________________________________________

	// More Details Dropdown

	//More Details section dropdown for Leader Bios
	function moreDetails() {
		//If one Bootstrap Bio div is opened, close the others
		$("[data-collapse-group='leaderDivs']").click(function () {
			var $this = $(this);

			//for the parents
			$("[data-collapse-group='leaderDivs']:not([data-target='" + $this.data('target') + "'])").each(function () {
				$($(this).data('target')).removeClass('in').addClass('collapse');
			});
			//for the "more_details" children
			$("[data-collapse-group='moreDetailsDivs']:not([data-target='" + $this.data('target') + "'])").each(function () {
				$($(this).data('target')).removeClass('in').addClass('collapse');
				//always put the dropdown icon to "+" on the way out
				$(this).find('i').removeClass('fa-minus').addClass('fa-plus');
			});
		});
	}

	// Only calls both functions if .moreDetails is loaded DOM
	if ($('*').hasClass('moreDetails')) { 
		moreDetails();
	}

	//______________________________________________________________________________________

	// Toggle displays with filter buttons

	// Toggle list and map in filter results for "Meet the Team" page
	function filterDisplayToggle() {
		$(".filter_btn").click(function() {
			$(".filter_btn").toggleClass('active inactive');
			$(".map_filter").toggleClass('show hidden');
			$(".list_filter").toggleClass('hidden show');
		});
	}

	// Only calls both functions if .moreDetails is loaded DOM
	if ($('*').hasClass('filter_btn')) { 
		filterDisplayToggle();
	}

	//______________________________________________________________________________________
	
	// Stops click event from bubbling up to parent element/container
	$(document).on('click', '.yamm .dropdown-menu', function(e) {
		e.stopPropagation();
	});

	//______________________________________________________________________________________

	// Applies border bottom on l2 nav - mobile only
	function navBorderBottom() {
		$(".dropdown").click(function () {
			if ($(window).width() <= 768) {
				$(".dropdown-menu").css({"border-bottom": "1px solid #eeeeee"});
			} else {
				$(".dropdown-menu").css({"border-bottom": "none"});
			}
		});

	}

	// Calls functions for bottom border - mobile only
	navBorderBottom();

	//______________________________________________________________________________________

	// Accordions - Displays only one at a time

	// Hide all accordion contents
	$(".accordion_content").hide();

	// $(".accordion_content").find('*').css('height', '0px');

	// Display accordion contents on click
	$(".accordion-heading").click(function() {

		$(this).toggleClass('active');
		
		$(".accordion-heading").not(this).each(function() {
			$(this).removeClass('active');
		});

		// Find parent container of accordion
		var accordion_content = $(this).closest('.panel').find('.accordion_content');

		if ($(this).not(".active")) {
			$('.accordion-heading i').removeClass('fa-angle-up');
			$('.accordion-heading i').addClass('fa-angle-down');
		}

		// Hides/slides up any open accordions
		$(".accordion_content").slideUp();

			// Display clicked accordion content
			if(accordion_content.css('display') === 'none') {
				accordion_content.slideDown();
			}

			$(document).on('click','.accordion-heading',function(){

				if ($(this).is(".active")) {
					$('.accordion-heading.active i').removeClass('fa-angle-down');
					$('.accordion-heading.active i').addClass('fa-angle-up');
				}

			});

		}); // End click event

	//______________________________________________________________________________________
	
	// Smooth scrolling to sections

	$(function() {
		$('a[href*=#]:not([href=#])').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 250);
					return false;
				}
			}
		});
	});

	//______________________________________________________________________________________

	// Local Bootstrap custom-select styling and carrot
	function selectStyling(){

		//Be able to sense focus/blur and add glow styling
		$('.custom-select').focus(function(){
			  $('.select-wrapper').addClass('custom-selectFocus');
		});
		$('.custom-select').blur(function(){
			  $('.select-wrapper').removeClass('custom-selectFocus');
		});
		//Add wrappers to be able to add custom arrows, etc.
		$(".custom-select").each(function(){
			$(this).wrap("<span class='select-wrapper'></span>");
			$(this).after("<span class='holder'></span>");
		});
		$(".custom-select").change(function(){
			var selectedOption = $(this).find(":selected").text();
			$(this).next(".holder").text(selectedOption);
		}).trigger('change');
	} //END selectStyling

	// Only calls functions if Bootstrap .custom-select is in the DOM
	if ($('*').hasClass('custom-select')) { 
		selectStyling();
	}

	//______________________________________________________________________________________

	// Iterate through colors for medical service landing page buttons (mobile)

	function fourShadesOfGARY() {

		var colors = [ "#f6b221","#00a94f","#4bbbeb","#bd2f92"];
		var litags = $( ".additional_specials" ).find($('li'));
		var index = 0;
		var defaultColor = "#bd2f92";

		for(var i=0;i<litags.length;i++)
		{
		   
		   litags[i].outerHTML =  litags[i].outerHTML.replace("\">", "\" style=\"background-color:" + colors[index] + "\">");
			
			index = index + 1;
			if (index >= colors.length)
			{
			   index = 0;
			}
		}
	}

	fourShadesOfGARY();

	// Landing page pod color loop

	function podColors() {

		$('.pod-landing-pg i, .pod-landing-pg h3').removeAttr("style");

		var docSizeWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

		var landingPods = $('.pod-landing-pg');
		var k = 0;

		for(var i=0;i<landingPods.length;i++)

		{
			// console.log("landingPods[i].outerHTML = ", landingPods[i].outerHTML);
			// console.log("landingPods[i].innerHTML = ", landingPods[i].innerHTML);
			k += 1;
			var aTag = $(landingPods[i]);
			var img = aTag.find("i");
			var title = aTag.find("h3");

			if (docSizeWidth >= 768) {

				if (k % 4 === 0)
				{
				   img.css('color','#f6b221');
				   title.css('color','#f6b221');
				   k = 0;
				}
				else if (k % 3 === 0)
				{
				   img.css('color','#bd2f92');
				   title.css('color','#bd2f92');
				}
				else if (k % 2 === 0)
				{
				   img.css('color','#4bbbeb');
				   title.css('color','#4bbbeb');
				}
				else
				{
					img.css('color','#00a94f');
					title.css('color','#00a94f');	
				}

			} else if (docSizeWidth < 768) {

				if (k % 4 === 0)
				{
				   aTag.css('background-color','#f6b221');
				   k = 0;
				}
				else if (k % 3 === 0)
				{
				   aTag.css('background-color','#bd2f92');
				}
				else if (k % 2 === 0)
				{
				   aTag.css('background-color','#4bbbeb');
				}
				else
				{
					aTag.css('background-color','#00a94f');	
				}

			}

		}

		$('#pod-empty').removeAttr("style");

		landingPods.css('visibility', 'visible');
	}

	if ($('*').hasClass('pod-landing-pg')) { 
		podColors();
	}


	//______________________________________________________________________________________


	// Displays/Mobile Nav Search Overlay
	function mobileNavSearch() {
		//if ($(window).width() < 991) {
			$('.mobile-search-btn').click(function() {
				$('.search-mobile').slideDown();
			});
			
			$('.search-nav-mobile-header .fa-times').click(function() {
				$('.search-mobile').fadeOut();
			});

			$('.search-mobile').prependTo("body");
		//}
	}

	mobileNavSearch();


	//______________________________________________________________________________________

	// Function to call calendar in floating nav

	function calendarCall() {
		$('.datetimepickerInline').datetimepicker({
			inline: true,
			sideBySide: false
		});
	}

	calendarCall();

	// Only calls functions if Bootstrap .custom-select is in the DOM
	if ($('*').hasClass('datetimepickerInline')) { 
		calendarCall();
	}

	//______________________________________________________________________________________

	// Filter Nav Scripts

	// Checks/Unchecks Filter Box

	$('.filter-options ul li label').click(function (event) {

		if($(this).prev('input[type=checkbox]').is(':checked')){
		  $(this).attr('checked',true);
		}else{
		  $(this).attr('checked',false);
		}

	});

	//Tooltip call
	//was
	//$('[data-toggle="tooltip"]').tooltip();

	//hide onClick. Wasn't working reliably before.
	var showTooltip = function () {
		$(this).tooltip('show');
	};
	var hideTooltip = function () {
		$(this).tooltip('hide');
	};
	$('[data-toggle="tooltip"]').tooltip({
		trigger: 'manual'
	}).click(hideTooltip).hover(showTooltip, hideTooltip);



	//
	$('.row .btn.docLocs').on('click', function(e) {
		e.preventDefault();
		var $this = $(this);
		var $collapse = $this.closest('.collapse-group').find('.collapse');
		$collapse.collapse('toggle');
	});

	//______________________________________________________________________________________

	// Search functionality in header component
	var submitIcon = $('.searchbox-icon');
	var inputBox = $('.searchbox-input');
	var searchBox = $('.searchbox');
	var isOpen = false;
	submitIcon.click(function(){
		if(isOpen !== true){
			searchBox.addClass('searchbox-open');
			inputBox.focus();
			isOpen = true;
		} else {
			searchBox.removeClass('searchbox-open');
			inputBox.focusout();
			isOpen = false;
		}
	});  
	submitIcon.mouseup(function(){
		return false;
	});
	searchBox.mouseup(function(){
		return false;
	});
	$(document).mouseup(function(){
		if(isOpen === true){
			$('.searchbox-icon').css('display','block');
			submitIcon.click();
		}
	});

	//______________________________________________________________________________________

	// Toggles content for Inner Accordion component

	$('.accordion-header-sm').click(function() {
		$(this).next('.collapse').slideToggle();
	});

	//______________________________________________________________________________________

	//rPage pagination
	//$("ul.pagination").rPage();

	//Breaks List page Filter
	$("div.pagination ul.pagination").not('div.pagination.alpha-filter ul.pagination').rPage();


	//______________________________________________________________________________________

	// Pod Filler Image Conditions

	function podFillerImage() {
		$(".pod-landing-pg .pod-image-filler").each(function() {

			if($(this).attr('src') === '') { 
			  $(this).remove();
			} else if($(this).attr('src') !== '') {
				$(this).parent().find('.pod-caret, .pod-text, .pod-icon').remove();
			}

			if (window.innerWidth >= 768) {

			   $(this).parents('.pod-landing-pg').css('display', 'table');
			   $(this).parents('a').css({
				  'display' : 'table-cell',
				  'vertical-align' : 'middle',
				  'pointer-events' : 'none'
			   });

			}
			else if (window.innerWidth <= 767) {
				$(this).parents('.pod-landing-pg').css('display', 'none');
			}

			if ($(this).width() > $(this).height()) {
				$(this).css({
				  'width' : '100%',
				  'max-width' : '300px'
			   });
			}

		});
	}

	if ($('*').hasClass('pod-landing-pg')) { 
		podFillerImage();
	}

	//______________________________________________________________________________________

	// Announcement Pod Image Height Definition - IE 10/11 Fix

	function getPodHeight() {
		$('.ann-pod.image').each(function() {
			var annPodHeight = $(this).find('.ann-pod-container').height();
			$(this).find('.podImage').css('min-height', annPodHeight);
			// console.log(annPodHeight);
		});
	}

	if ($('*').hasClass('ann-pod-img')) { 
		getPodHeight();
	}

	//______________________________________________________________________________________

	// Infographic Carousel Overlay Script

	// Remove carousel dark overlay if no background image
	$('.pageCarousel.infoGraphic .item').each(function() {
		if($(this).attr("style") === "background-image:url();" || $(this).attr("style") === "background-image:url('');") { 
			$(this).find('.jumbotron .carouselOverlay').remove();
		}
	});

	// Second Color Cadence option w/ first image in carousel
	$('.pageCarousel.infoGraphic .item').each(function(i, el) {
		if (i === 0) {
		   if($(this).find('.carouselOverlay').hasClass('carouselOverlay')) { 
				$(this).parents('.infoGraphic').addClass('option-2');
		   }
		}
	});

	//______________________________________________________________________________________

	// Set width for announcement pods (inside of panel body)

	function announcementPodWidth() {

		var annPodWidth = $('.panel.panel-default').width();

		$('.ann-pod').css('width', annPodWidth);

	}

	if ($('*').hasClass('ann-pod')) { 
		announcementPodWidth();
	}

	//______________________________________________________________________________________

	// Remove photo gallery content div if empty

	$('.jcarousel-wrapper li').each(function() {

		var carouselGallery = $(this).find('.otherGalleryImages');

		if(!$.trim( carouselGallery.html() ).length) {
			carouselGallery.remove();
		}

	});

	//______________________________________________________________________________________

	// Page Link script

	// Insert break after page link arrow
	$("<br>").insertAfter($('.english-spanish-link').siblings('.link-arrow'));

	//______________________________________________________________________________________

	$('.panel-body').each(function() {
		$(this).find('.returnContainer:last').css('border-bottom', 'none');
	});

	


	//______________________________________________________________________________________
	
	// Run scripts on window resize

	$(window).resize(function(){

		//______________________________________________________________________________________

		//Hover effect to menus
		$('ul.nav li.dropdown').hover(function() {
		  if ($(window).width() > 767) {
		   $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeIn();
		  }
		}, function() {
		 if ($(window).width() < 767) {
			 $(this).find('.dropdown-menu').stop(true, true).delay(50).fadeOut();
			}
		});

		//______________________________________________________________________________________

		setBreadcrumbsWidth();

		//______________________________________________________________________________________

		// Call function for dual action navigation
		dualNav();

		//______________________________________________________________________________________

		// Calls functions for bottom border - applies on mobile only
		navBorderBottom();

		//______________________________________________________________________________________

		relatedCarousel();
		centerCarouselControl();
		//______________________________________________________________________________________

		relatedContentControllers();

		//______________________________________________________________________________________

		podFillerImage();

		//______________________________________________________________________________________

		//truncate long news titles

		truncateText();

		//______________________________________________________________________________________

		// Recalculate Announcement Pod Height

		getPodHeight();

		//______________________________________________________________________________________

		// Landing page pod background, text, and icon color loop

		podColors();

		//______________________________________________________________________________________

		// Reset width for announcement pods

		announcementPodWidth();

		//______________________________________________________________________________________

		// NEXT SCRIPT TO RUN ON RESIZE

	}); //END Window Resize function

}); // END Page Document Ready function


//Other functions. Call from the page(s). __________________________________________________

// Numbers only input field - zip code search field (find a doc)
function numbersOnly(myfield, e, dec) {
	var key;
	var keychar;

	if (window.event) {
	   key = window.event.keyCode;
	}
	else if (e) {
	   key = e.which;
	}
	else {
	   return true;
	}
	keychar = String.fromCharCode(key);

	// Control Keys
	if ((key===null) || (key===0) || (key===8) || (key===9) || (key===13) || (key===27) ) {
	   return true;
	}

	// Numbers
	else if ((("0123456789").indexOf(keychar) > -1)) {
	   return true;
	}

	// Decimal Point Jump
	else if (dec && (keychar === ".")) {
	   myfield.form.elements[dec].focus();
	   return false;
	}
	else {
	   return false;
	}
}

//Do I need these --TWO(?)-- functions below? Search whole project - where are they called?

// lightGallery photogallery with thumbnails

/* To be deprecated. - JGN 9-15-15 */

//Dynamic  Example
function lightGalleryThumbs() {
	$('#dynamic').click(function(e){
		$(this).lightGallery({
			dynamic: 			true,	// Set to true to build a gallery based on the data from "dynamicEl" opt.
			html: 				true,
			useCSS: 			true,
			preload: 			1,
			controls: 			true,
			showThumbByDefault: true,	// Whether to display thumbnails by default.
			mobileSrc: 			false,	// If "data-responsive-src" attr. should be used for mobiles.
			//mobileSrcMaxWidth:  640,	// Max screen resolution for alternative images to be loaded for.  //ONLY if they want to support lower-res images for mobile.
			swipeThreshold: 	50,		// How far user must swipe for the next/prev image (in px).
			enableTouch: 		true,	// Enables touch support
			enableDrag: 		true,	// Enables desktop mouse drag support
			loop: 				true,
			counter: 			true,	//Whether to show total number of images and index number of currently displayed image.
			speed: 				600,
			lang: 				{allPhotos: 'All photos (Use arrow keys & Esc. too.)'},
			// Array of objects (src, thumb, caption, desc, mobileSrc) for gallery els. *NEED TO SET UP A DATA SOURCE FOR THIS.
			dynamicEl:[
				{"src":"img/galleries/83663422.jpg",
				"thumb":"img/galleries/83663422.jpg",
				"sub-html":"<div class='title'>Girl Title</div><div class='caption'>Girl Caption 1.</div>", 
				"mobileSrc":"lightGallery-master/demo/mobile1.jpg"},

				{"src":"img/galleries/83663429.jpg",
				"thumb":"img/galleries/83663429.jpg",
				"sub-html":"<div class='title'>Boy Title</div><div class='caption'>Boy Caption 2.</div>",
				"mobileSrc":"lightGallery-master/demo/mobile2.jpg"},

				{"src":"img/galleries/83663433.jpg",
				"thumb":"img/galleries/83663433.jpg",
				"sub-html":"<div class='title'>Bubbles Title</div><div class='caption'>Bubbles Caption 3.</div>",
				"mobileSrc":"lightGallery-master/demo/mobile3.jpg"},

				{"src":"img/galleries/83663435.jpg",
				"thumb":"img/galleries/83663435.jpg",
				"sub-html":"<div class='title'>Toddler Title</div><div class='caption'>Toddler Caption 4.</div>",
				"mobileSrc":"lightGallery-master/demo/mobile3.jpg"},

				{"src":"img/galleries/83663436.jpg",
				"thumb":"img/galleries/83663436.jpg",
				"sub-html":"<div class='title'>Baby Title</div><div class='caption'>Baby Caption 5.</div>",
				"mobileSrc":"lightGallery-master/demo/mobile3.jpg"},
			]
		});
	});
}

	//______________________________________________________________________________________

	//Search functionality in header component (the click function part)

	//clean these up - combine

	function buttonUpBig(){
		var inputVal = $('.searchbox-input-big').val();
		inputVal = $.trim(inputVal).length;
		if( inputVal !== 0){
			$('.searchbox-icon').css('display','none');
		} else {
			$('.searchbox-input-big').val('');
			$('.searchbox-icon').css('display','block');
		}
	}

		function buttonUpSmall(){
		var inputVal = $('.searchbox-input-small').val();
		inputVal = $.trim(inputVal).length;
		if( inputVal !== 0){
			$('.searchbox-icon').css('display','none');
		} else {
			$('.searchbox-input-small').val('');
			$('.searchbox-icon').css('display','block');
		}
	}

//______________________________________________________________________________________
