;(function($){

	var menu_items = [];

	var App = {
		init: function(){
			this.input_listen();
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
		}
	};	

	App.init();

})(jQuery)