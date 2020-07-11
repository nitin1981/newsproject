<?php
/*
Plugin Name: Mystery Theme Updater
Plugin URI:  https://mysterythemes.com
Description: Upgrade themes and plugins using a zip file without having to remove them first.
Author:      Mystery Themes
Author URI:  https://mysterythemes.com
Version:     1.0.0
License:     GNU General Public License v3 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html
Text Domain: mystery-theme-updater

*/

function mystery_theme_updater_init() {

	// Load translations.
	load_plugin_textdomain( 'mystery-theme-updater', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	if ( is_admin() ) {
		require( dirname( __FILE__ ) . '/admin.php' );
	}
	
}
add_action( 'plugins_loaded', 'mystery_theme_updater_init' );
