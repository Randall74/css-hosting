// Floating Nav - Sticky Function

// WRAP IT UP
$( '.sidebar' ).wrap( '<div class="wrap"></div>' ); 

// STOP IT!
$( '<div class="sticky-stop"></div>' ).insertAfter( '.constrain-width' );

var sidebarHeight, mainHeight;

function measureHeight() {
    sidebarHeight = $('.sidebar').height();
    mainHeight = $('.content-panels').outerHeight();
    if (mainHeight - sidebarHeight > 0) {
        $('.constrain-width').waypoint(function(direction) {
            $(this).toggleClass('sticky', direction === 'down');
        });
        $('.sticky-stop').waypoint(function(direction) {
            $('.constrain-width').toggleClass('at-bottom', direction === 'down');
        }, {
            offset: function() {
                return sidebarHeight;
            }
        });

    } else {
        $().waypoint('destroy');
    }

    // CONSOLE FOR TESTING
    // console.log('PAGE NAV SIZE: ' + sidebarHeight);
    // console.log('CONTENT PANELS SIZE: ' + mainHeight);
}

// RUN ALL FUNCTIONS AFTER ALL ELEMENTS LOADED IN DOM

$(window).load(function() {
    
	//______________________________________________________________________________________

	// Only shows 5 filters on initial load - Hides remainder in "See All" container

    function navFilters() {

        // Toggles chevron icons in navigation for filter

        $(".nav-item").each(function(){
            var filterOptions = $(this).next(".filter-options");

            if (filterOptions.find("ul li").length > 5) {
                filterOptions.find(".filter-see-all").css("display", "block");

                // FIRST FIND OUT HOW MANY ITEMS ARE IN THE FILTER-OPTIONS LIST

                var filterOptionsCount = $( ".filter-options").length;

                for (y=0;y<filterOptionsCount;y++) {
                    var filterCount = $( ".filter-options").eq(y).find( "li" ).length;

                    var destination = $( ".filter-options").eq(y).find('.filter-see-all .filter-see-all-container ul');
                    var destinationLength = $( ".filter-options").eq(y).find('.filter-see-all .filter-see-all-container ul li').length;
                    if (destinationLength <= 0 && filterCount > 5) {

                        for (x=filterCount - 1; x>=5; x--) 
                        {
                            destination.prepend($( ".filter-options").eq(y).find( "li" )[x].outerHTML);
                            //$( ".filter-options").eq(y).find( "li" )[x].remove(); 
                            $( ".filter-options").eq(y).find( "li" ).eq(x).remove();  
                        }
                    }
                }
            }

            // Add/remove 'active' class for display
            if (filterOptions.hasClass('active')) {
                $(this).children('i').addClass('fa-chevron-up');
                filterOptions.slideDown(measureHeight);
            } else {
                $(this).children('i').addClass('fa-chevron-down');
                filterOptions.slideUp(measureHeight);
            }

        });

        $(".nav-item").click(function () {

            // DISPLAYS FILTERS SECTION
            var filterOptions = $(this).next(".filter-options");

            // Add/remove 'active' class for display
            if (filterOptions.hasClass('active')) {
                $(this).children('i').removeClass('fa-chevron-up');
                $(this).children('i').addClass('fa-chevron-down');
                filterOptions.slideUp(measureHeight);
            } else {
                $(this).children('i').removeClass('fa-chevron-down');
                $(this).children('i').addClass('fa-chevron-up');
                filterOptions.slideDown(measureHeight);
            }

             $(this).next().toggleClass("active");

        });

        // DISPLAYS 'SEE ALL' FILTES SECTION

        $('.filter-see-all-toggle').click(function() {

            // SHOWS 'SEE ALL' CONTAINER
            $(this).next('.filter-see-all-container').css('display', 'block');

            // HIDES 'SEE ALL' CONTAINER
            $(this).css('display','none');

            measureHeight();
        });

    } // END navFilters function


    //______________________________________________________________________________________

    // Re-measure content-panels height when clicking on accordions

    $('.accordion-heading, .accordion-header-sm, .docLocs').click(function() {
        setTimeout(function() {
            measureHeight();
        }, 500);
    });

    //______________________________________________________________________________________

    // Floating Nav - Scrollable Styles if navigation is larger than 500px - height

    function navScroll() {

        $('.page-navigation').removeAttr("style");

        setTimeout(function() {
            var navHeight = $('#page-nav').height();
            var docSizeHeight = window.innerHeight || window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            if (navHeight >= docSizeHeight) {
                $('#page-nav').css({
                   'overflow' : 'auto',
                   'overflow-x' : 'hidden',
                   'overflow-y' : 'scroll',
                   'max-height' : $(window).height()
                });

                measureHeight();

                setTimeout(function() {
                    $('.page-navigation').removeAttr('style');
                    $('.page-navigation').css('width', '100%');
                }, 500);

            } else {
                $('#page-nav').removeAttr('style');

                setTimeout(function() {
                    $('.page-navigation').removeAttr('style');
                    $('.page-navigation').css('width', '100%');
                }, 500);
            }

        }, 500);

    }


    //______________________________________________________________________________________

    // FLOATING NAV W/ FILTERS - DOM MANIPULATION

    function navFiltersDisplay() {

        var docSizeWidth = window.innerWidth;

        var stickyNavWrap = $('.wrap').detach();

        if (docSizeWidth <= 991) {
            stickyNavWrap.prependTo("body");

            $('.filter-search-btn').click(function() {
                $('.floating-nav-filters').slideDown();
                $('.floating-nav-filters').css('visibility', 'visible');
            });
            
            $('.floating-nav-filters .fa-times').click(function() {
                $('.floating-nav-filters').fadeOut();
            });

        } else if (docSizeWidth >= 992) {
            $(".constrain-width > .row").append(stickyNavWrap);
            $('body, #page-nav').removeAttr("style");
        } 

        // CONSOLE FOR TESTING
        // console.log('DOC HEIGHT SIZE: ' + docSizeWidth);
    }


    //______________________________________________________________________________________

    // FLOATING NAV W/ FILTERS - DOM MANIPULATION

    function showSideNav() {

        // Show side nav (floating nav) after everything loads - 992px wide and up
        if (window.innerWidth >= 992) {
            $('.side-nav-container').css('visibility', 'visible');
        }
    }


    //______________________________________________________________________________________

    // FLOATING NAV W/ FILTERS - DOM MANIPULATION

    function mobileFacetOverlay() {

        $(window).scrollTop(0);

        var docSizeHeight = window.innerHeight || window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var docSizeWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var scrollBarWidth=(window.innerWidth-$(window).width());
        var pagePosition = $(window).scrollTop();

        $('body').css({
            'padding-right' : scrollBarWidth
        });

        if (docSizeWidth <= 991) {

            $('body').css({
                'position' : 'fixed',
                'top' : -pagePosition
            });

            setTimeout(function(){ 
                var navHeight = $('body > .wrap > .side-nav-container.floating-nav-filters #page-nav > .page-navigation').height(); 
                if (navHeight > docSizeHeight) {
                    $('#page-nav').css({
                        'height' : docSizeHeight,
                        'overflow-y' : 'scroll',
                        'overflow-x' : 'hidden'
                    });
                } else {
                    $('#page-nav').removeAttr("style");
                }

            }, 100);

        } else if (docSizeWidth >= 992) {

            $('html, body, #page-nav').removeAttr("style");
            $('html, body').css({
                'height' : '100%',
                'position' : 'relative'
            });
            $('body').css({
                'overflow' : 'hidden'
            });
        }

        $('.side-nav-container .fa-times').on('click', function () {

            if (docSizeWidth <= 991) {
                $('html, body, #page-nav').removeAttr("style");
                $('body').css({
                    'position' : 'static'
                });
                $(window).scrollTop(pagePosition);
            } else if (docSizeWidth >= 992) {
                $('html, body, #page-nav').removeAttr("style");
            }

        });

    }

    $('.filterButton').on('click', function() {
        mobileFacetOverlay();
    });

    $('.nav-item, .filter-see-all-toggle, .filterButton').on('click', function() {
        
        $('.page-navigation').removeAttr("style");

        setTimeout(function(){ 
            var navHeight = $('#page-nav').height(); 
            var docSizeHeight = window.innerHeight || window.outerHeight || document.documentElement.clientHeight || document.body.clientHeight;

            if (navHeight >= docSizeHeight) {
                // console.log('nav ', navHeight);
                // console.log('doc ', docSizeHeight);
                $('#page-nav').css({
                    'max-height' : docSizeHeight,
                    'overflow-y' : 'scroll',
                    'overflow-x' : 'hidden'
                });
            } else {
                $('#page-nav').removeAttr("style");
            }
            $('.page-navigation').css('width', '100%');

        }, 500);
    });



// CALL FUNCTIONS ON WINDOW LOAD

	navFilters();
	measureHeight();
	navScroll();
	navFiltersDisplay();
    showSideNav();


// CALL FUNCTIONS ON WHEN WINDOW RESIZES

	$(window).resize(function() {

		measureHeight();
		navScroll();
		navFiltersDisplay();
        showSideNav();

	});

    $(window).on("orientationchange",function(event) {

        measureHeight();
        navScroll();
        navFiltersDisplay();
        showSideNav();

    }); 


});
