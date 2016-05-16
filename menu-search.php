<?php
/*
Plugin Name: Menu Search
Plugin URI: www.apiki.com
Description: Create an input to instantly search for menus
Version: 0.1
Author: João Gusmão - Apiki WordPress
Author URI: http://apiki.com
*/

class MenuSearch
{
	public function __construct(){
		$this->init();
	}

	private function init()
	{
		add_action( 'adminmenu', array( &$this,'create_menu_search') );
		add_action( 'admin_enqueue_scripts', array( &$this, 'load_assets' ) );	
	}

	public function load_assets(){
		wp_enqueue_script( 
			'menu-search', 
			plugins_url( 'assets/javascript/menu-search.js', __FILE__ ), 
			array('jquery'), 
			'1.0.0', 
			true 
		);	 
 	}

	public function create_menu_search()
	{
	?>
		<input type="hidden" class="full_menus" value='<?php echo self::_build_menus(); ?>' />
		<li id="collapse-menu" class="hide-if-no-js" style="position: fixed;bottom: 0;background: #32373C;width: 160px;">
			<input class='menu-search' type="text" placeholder="Search..." style="width: 96%;background: #32373C;border: 1px solid #797979;border-radius: 1px;margin-left: 3px;color: #9CA1A6;">
		</li>
	<?php
	}

	private static function _build_menus()
	{
		global $menu, $submenu;
		$new_menu = array();
		foreach( $menu as $menu_item ) :
			$menu_item[0] = strip_tags( $menu_item[0] );
			$menu_mil = array(
				'menu_name' => $menu_item[0],
				'menu_id' 	=> $menu_item[5]
			);

			if( !empty( $submenu[ $menu_item[2] ] ) ) :
				$menu_mil[ 'sub_menu' ] = array();
				foreach ( $submenu[ $menu_item[2] ] as $key => $sub ) {
					$sub_menu_mil = array(
						'menu_name' => strip_tags( $sub[0] )
					);
					array_push( $menu_mil[ 'sub_menu' ], $sub_menu_mil );
				}
			endif;
			if( !empty( $menu_mil['menu_name']) ) array_push( $new_menu, $menu_mil );
		endforeach;
		return json_encode( $new_menu );
	}
}

new MenuSearch();