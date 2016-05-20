;(function($){

	var menu_items = [];

	var App = {
		init: function(){
			this.input_listen();
			this.btn_listen();
			this.menu_listen();
		},
		input_listen : function() {
			$( '.menu-search' ).on('keyup', function() {
				var to_find_mil = $( this ).val().toLowerCase();
				var menus = JSON.parse( $( '.full_menus' ).val() );
				$.each( menus , function( i,val ) {
					var menu_id = val[ 'menu_id' ];
					$('.wp-menu-separator').hide();
					$( '#'+menu_id ).hide();
					$( '#'+menu_id ).addClass( 'under_search' );
					var found = false;
					if( val['menu_name'].toLowerCase().indexOf( to_find_mil ) != -1 ) {
						found = true;
					}
					if( !found ) {
						$.each( val['sub_menu'] , function( sub_i,sub_val ) {
							if( sub_val['menu_name'].toLowerCase().indexOf( to_find_mil ) != -1 ) {
								found = true;
							}
						});
					}
					if( found ) {
						$( '#'+menu_id ).removeClass('under_search');
						$( '#'+menu_id ).show();
					}
					if( $( '.under_search' ).length == 0 ) $('.wp-menu-separator').show();
				});
			});

			$( '.menu-search').on('focusin', function(event) {
				event.preventDefault();
				$( '.menu-search-wrapper' ).addClass('fixed-on-bottom');
			});

			$( '.menu-search').on('focusout', function(event) {
				event.preventDefault();
				$( '.menu-search-wrapper' ).removeClass('fixed-on-bottom');
			});
		},
		btn_listen : function() {
			$( '.menu-search-icon' ).on('click', function() {
				$( '#collapse-menu' ).trigger('click');
				$( '.menu-search-wrapper input.menu-search' ).focus();
			});
		},
		menu_listen : function() {
			$( '#adminmenuwrap' ).on('mouseenter', function(event) {
				var keydown_event = null;

				$(window).one('keydown', function(event) {
					keydown_event = event;

					if ( ! $( 'input' ).is(":focus") ) {
						//event.preventDefault();
						console.log(event);
						$( '.menu-search-wrapper input.menu-search' ).focus();
					}
				});

				$( '#adminmenuwrap' ).on('mouseleave', function(event) {
					$(window).off(keydown_event);
				});
			});
		},
	};	

	App.init();

})(jQuery)