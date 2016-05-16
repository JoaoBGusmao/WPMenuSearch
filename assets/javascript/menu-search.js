;(function($){

	var menu_items = [];

	var App = {
		init: function(){
			this.fetchIds();
			this.input_listen();
		},
		fetchIds: function(){

			var menus = JSON.parse( $( '.full_menus' ).val() );

			$.each( menus, function( i, val ) {
				if( val[0] != '' ) {
					menu_items.push({
						id: val[5],
						phil: val[0]
					});

					if( val['sub_menu'] && 1==2 ) {
						$.each( val['sub_menu'] , function( j, valj ) {
							if( valj[0] != '' ) {
								menu_items.push({
									id: val[5],
									phil: valj[0]
								});
							}
						});
					}
				}
			});
			console.log(menu_items);
		},
		input_listen : function() {
			$( '.menu-search' ).on('keyup', function() {
				var to_find_mil = $( this ).val().toLowerCase();

				$.each( menu_items , function( i,val ) {
					$('.wp-menu-separator').hide();
					$( '#'+val.id ).hide();
					$( '#'+val.id ).addClass('under_search');
					if( val.phil.toLowerCase().indexOf( to_find_mil ) != -1 ) {
						$( '#'+val.id ).removeClass('under_search');
						$( '#'+val.id ).show();
					}
					if( $( '.under_search' ).length == 0 )
						$('.wp-menu-separator').show();
				});
			});
		}
	};	

	App.init();

})(jQuery)