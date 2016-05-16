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
					if( val['menu_name'].toLowerCase().indexOf( to_find_mil ) != -1 ) {
						$( '#'+menu_id ).removeClass('under_search');
						$( '#'+menu_id ).show();
					}
					if( $( '.under_search' ).length == 0 )
						$('.wp-menu-separator').show();
				});
			});
		}
	};	

	App.init();

})(jQuery)