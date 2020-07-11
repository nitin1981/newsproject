<?php
/**
 * Create info page at admin section
 *
 * @package Mystery Themes
 * @subpackage News Portal Pro
 * @since 1.0.3
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if( !class_exists( 'News_Portal_Welcome' ) ) :

	class News_Portal_Welcome {

		public $tab_sections = array();

		public $theme_name = '';  			// get current theme name
		public $theme_description = '';		// get current theme description
		public $theme_version = ''; 		// get current theme version
		public $support_link = '';			// theme support link
		public $documentation_link = ''; 	// theme Documentation Link
		public $demo_link = '';				// theme Demo link
		public $theme_detail_link = '';		// theme details link
		public $free_plugins = array(); 	// for Storing the list of the Recommended Free Plugins
		public $pro_plugins = array(); 		// for Storing the list of the Recommended Pro Plugins
		public $req_plugins = array(); 		// for Storing the list of the Required Plugins

		/**
		 * Constructor for the Welcome Screen
		 */
		public function __construct() {
			
			/** Useful Variables **/
			$theme_info = wp_get_theme();
			$theme_textdomain = $theme_info->get( 'TextDomain' );
			$this->theme_name = $theme_info->get( 'Name' );
			$this->theme_description = $theme_info->get( 'Description' );
			$this->theme_version = $theme_info->get( 'Version' );
			$this->documentation_link = 'http://docs.mysterythemes.com/'.$theme_textdomain;
			$this->demo_link = 'http://docs.mysterythemes.com/'.$theme_textdomain.'-landing';
			$this->theme_detail_link = 'https://mysterythemes.com/wp-themes/'.$theme_textdomain;
			$this->support_link = 'https://mysterythemes.com/support/'.$theme_textdomain;

			/** List of Companion Plugins **/
			$this->companion_plugins = array();

			/** List of required Plugins **/
			$this->req_plugins = array(
				
				'mt-demo-importer' => array(
					'slug' 		=> 'mt-demo-importer',
					'name' 		=> esc_html__( 'MT Demo Importer', 'news-portal-pro' ),
					'filename' 	=>'mt-demo-importer.php',
					'bundled' 	=> true,
					'class' 	=> 'MT_Demo_Importer',
					'location' 	=> get_template_directory().'/inc/welcome/plugins/mt-demo-importer.zip',
					'info' 		=> esc_html__( 'MT Demo Importer Plugin adds the feature to Import the Demo Conent with a single click.', 'news-portal-pro' ),
				)

			);

			/** Define Tabs Sections **/
			$this->tab_sections = array(
				'getting_started' 		=> esc_html__( 'Getting Started', 'news-portal-pro' ),
				'recommended_plugins' 	=> esc_html__( 'Recommended Plugins', 'news-portal-pro' ),
				'demo_import' 			=> esc_html__( 'Import Demo', 'news-portal-pro' ),
				'support' 				=> esc_html__( 'Support', 'news-portal-pro' ),
			);

			/** List of Recommended Pro Plugins **/
			$this->pro_plugins = array(
				'mystery-theme-updater' => array(
					'slug'		 => 'mystery-theme-updater',
					'name' 		 => esc_html__( 'Mystery Theme Updater', 'news-portal-pro' ),
					'version' 	 => '1.0.0',
					'author'	 => esc_html( 'Mystery Themes', 'news-portal-pro' ),
					'filename'   =>'mystery-theme-updater.php',
					'bundled' 	 => true,
					'location' 	 => get_template_directory().'/inc/welcome/plugins/mystery-theme-updater/mystery-theme-updater.zip',
					'screenshot' => get_template_directory_uri().'/inc/welcome/plugins/mystery-theme-updater/screen.png'
				)
			);

			/** Links **/

			/* Theme Activation Notice */
			add_action( 'load-themes.php', array( $this, 'news_portal_activation_admin_notice' ) );

			/* Create a Welcome Page */
			add_action( 'admin_menu', array( $this, 'news_portal_welcome_register_menu' ) );

			/* Enqueue Styles & Scripts for Welcome Page */
			add_action( 'admin_enqueue_scripts', array( $this, 'news_portal_welcome_styles_and_scripts' ) );

			/** Plugin Installation Ajax **/
			add_action( 'wp_ajax_news_portal_plugin_installer', array( $this, 'news_portal_plugin_installer_callback' ) );

			/** Plugin Installation Ajax **/
			add_action( 'wp_ajax_news_portal_plugin_offline_installer', array( $this, 'news_portal_plugin_offline_installer_callback' ) );

			/** Plugin Activation Ajax **/
			add_action( 'wp_ajax_news_portal_plugin_activation', array( $this, 'news_portal_plugin_activation_callback' ) );

			/** Plugin Activation Ajax (Offline) **/
			add_action( 'wp_ajax_news_portal_plugin_offline_activation', array( $this, 'news_portal_plugin_offline_activation_callback' ) );

			/** Plugin Deactivation Ajax (Offline) **/
			add_action( 'wp_ajax_news_portal_plugin_offline_deactivation', array( $this, 'news_portal_plugin_offline_deactivation_callback' ) );

			add_action( 'init', array( $this, 'get_required_plugin_notification' ));

		}

		public function get_required_plugin_notification() {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' ); 
			$req_plugins = $this->companion_plugins;
			$notif_counter = count( $this->companion_plugins );
			$news_portal_plugin_installed_notif = get_option( 'news_portal_plugin_installed_notif' );

			foreach( $req_plugins as $plugin ) {
				$folder_name = $plugin['slug'];
				$file_name = $plugin['filename'];
				$path = WP_PLUGIN_DIR.'/'.esc_attr( $folder_name ).'/'.esc_attr( $file_name );
				if( file_exists( $path ) ) {
					if( is_plugin_active( $folder_name.'/'.$file_name ) ) {
						$notif_counter--;
					}
				}
			}
			update_option( 'news_portal_plugin_installed_notif', absint( $notif_counter ) );
			return $notif_counter;
		}

		/** Welcome Message Notification on Theme Activation **/
		public function news_portal_activation_admin_notice() {
			global $pagenow;

			if( is_admin() && ( 'themes.php' == $pagenow ) && ( isset( $_GET['activated'] ) ) ) {
				?>
				<div class="notice notice-success is-dismissible">
					<p><?php printf( wp_kses_post( __( 'Welcome! Thank you for choosing %1$s! Please make sure you visit our <a href="%2$s">Welcome page</a> to get started with %1$s.', 'news-portal-pro') ), esc_html( $this->theme_name ), esc_url( admin_url( 'themes.php?page=news-portal-welcome' ) )  ); ?></p>
					<p><a class="button" href="<?php echo esc_url( admin_url( 'themes.php?page=news-portal-welcome' ) ); ?>"><?php esc_html_e( 'Lets Get Started', 'news-portal-pro' ); ?></a></p>
				</div>
				<?php
			}
		}

		/** Register Menu for Welcome Page **/
		public function news_portal_welcome_register_menu() {
			$action_count = get_option( 'news_portal_plugin_installed_notif' );
			$title        = $action_count > 0 ? esc_html__( 'Welcome', 'news-portal-pro' ) . '<span class="badge pending-tasks">' . esc_html( $action_count ) . '</span>' : esc_html__( 'Welcome', 'news-portal-pro' );
			add_theme_page( 'Welcome', $title , 'edit_theme_options', 'news-portal-welcome', array( $this, 'news_portal_welcome_screen' ) );
		}

		/** Welcome Page **/
		public function news_portal_welcome_screen() {
			$tabs = $this->tab_sections;

			$current_section = isset( $_GET['section'] ) ? $_GET['section'] : 'getting_started';
			$section_inline_style = '';
			?>
			<div class="wrap about-wrap mt-welcome-wrap">
				<h1><?php printf( esc_html__( 'Welcome to %1$s - Version %2$s', 'news-portal-pro' ), esc_html( $this->theme_name ), esc_attr( $this->theme_version ) ); ?></h1>
				<div class="about-text"><?php echo wp_kses_post( $this->theme_description ); ?></div>

				<a target="_blank" href="https://www.mysterythemes.com" class="mt-badge wp-badge"><span><?php esc_html_e( 'Mystery Themes', 'news-portal-pro' ); ?></span></a>

			<div class="nav-tab-wrapper clearfix">
				<?php foreach( $tabs as $id => $label ) : ?>
					<?php
						$section = isset( $_REQUEST['section'] ) ? esc_attr( $_REQUEST['section'] ) : 'getting_started';
						$nav_class = 'nav-tab';
						if( $id == $section ) {
							$nav_class .= ' nav-tab-active';
						}
					?>
					<a href="<?php echo esc_url( admin_url( 'themes.php?page=news-portal-welcome&section='.$id ) ); ?>" class="<?php echo esc_attr( $nav_class ); ?>" >
						<?php echo esc_html( $label ); ?>
						<?php if( $id == 'actions_required' ) : $not = $this->get_required_plugin_notification(); ?>
							<?php if( $not ) : ?>
						   		<span class="pending-tasks">
					   				<?php echo esc_html( $not ); ?>
					   			</span>
			   				<?php endif; ?>
					   	<?php endif; ?>
				   	</a>
				<?php endforeach; ?>
		   	</div>

	   		<div class="welcome-section-wrapper">
   				<?php $section = isset( $_REQUEST['section'] ) ? $_REQUEST['section'] : 'getting_started'; ?>
					
					<div class="welcome-section <?php echo esc_attr( $section ); ?> clearfix">
						<?php require_once get_template_directory() . '/inc/welcome/sections/'.esc_html( $section ).'.php'; ?>
				</div>
		   	</div>
		   	</div>
			<?php
		}

		/** Enqueue Necessary Styles and Scripts for the Welcome Page **/
		public function news_portal_welcome_styles_and_scripts() {
			wp_enqueue_style( 'news-portal-welcome-screen', get_template_directory_uri() . '/inc/welcome/css/welcome.css' );
			wp_enqueue_script( 'news-portal-welcome-screen', get_template_directory_uri() . '/inc/welcome/js/welcome.js', array( 'jquery' ) );

			wp_localize_script( 'news-portal-welcome-screen', 'newsportalWelcomeObject', array(
				'admin_nonce'		=> wp_create_nonce( 'news_portal_plugin_installer_nonce' ),
				'activate_nonce'	=> wp_create_nonce( 'news_portal_plugin_activate_nonce' ),
				'deactivate_nonce'	=> wp_create_nonce( 'news_portal_plugin_deactivate_nonce' ),
				'ajaxurl'			=> esc_url( admin_url( 'admin-ajax.php' ) ),
				'activate_btn' 		=> esc_html__( 'Activate', 'news-portal-pro' ),
				'installed_btn' 	=> esc_html__( 'Activated', 'news-portal-pro' ),
				'demo_installing' 	=> esc_html__( 'Installing Demo', 'news-portal-pro' ),
				'demo_installed' 	=> esc_html__( 'Demo Installed', 'news-portal-pro' ),
				'demo_confirm' 		=> esc_html__( 'Are you sure to import demo content ?', 'news-portal-pro' ),
			) );
		}

		/** Plugin API **/
		public function news_portal_call_plugin_api( $plugin ) {
			include_once ABSPATH . 'wp-admin/includes/plugin-install.php';

			$call_api = plugins_api( 'plugin_information', array(
				'slug'   => $plugin,
				'fields' => array(
					'downloaded'        => false,
					'rating'            => false,
					'description'       => false,
					'short_description' => true,
					'donate_link'       => false,
					'tags'              => false,
					'sections'          => true,
					'homepage'          => true,
					'added'             => false,
					'last_updated'      => false,
					'compatibility'     => false,
					'tested'            => false,
					'requires'          => false,
					'downloadlink'      => false,
					'icons'             => true
				)
			) );

			return $call_api;
		}

		/** Check For Icon **/
		public function news_portal_check_for_icon( $arr ) {
			if ( ! empty( $arr['svg'] ) ) {
				$plugin_icon_url = $arr['svg'];
			} elseif ( ! empty( $arr['2x'] ) ) {
				$plugin_icon_url = $arr['2x'];
			} elseif ( ! empty( $arr['1x'] ) ) {
				$plugin_icon_url = $arr['1x'];
			} else {
				$plugin_icon_url = $arr['default'];
			}

			return $plugin_icon_url;
		}

		/** Check if Plugin is active or not **/
		public function news_portal_plugin_active( $plugin ) {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' ); 
			$folder_name = $plugin['slug'];
			$file_name = $plugin['filename'];
			$status = 'install';

			$path = WP_PLUGIN_DIR.'/'.esc_attr( $folder_name ).'/'.esc_attr( $file_name );

			if( file_exists( $path ) ) {
				$status = is_plugin_active( esc_attr( $folder_name ).'/'.esc_attr( $file_name ) ) ? 'inactive' : 'active';
			}

			return $status;
		}

		/** Generate Url for the Plugin Button **/
		public function news_portal_plugin_generate_url( $status, $plugin ) {
			$folder_name = $plugin['slug'];
			$file_name = $plugin['filename'];

			switch ( $status ) {
				case 'install':
					return wp_nonce_url(
						add_query_arg(
							array(
								'action' => 'install-plugin',
								'plugin' => esc_attr( $folder_name )
							),
							network_admin_url( 'update.php' )
						),
						'install-plugin_' . esc_attr( $folder_name )
					);
					break;

				case 'inactive':
					return add_query_arg( array(
	                    'action'        => 'deactivate',
	                    'plugin'        => rawurlencode( esc_attr( $folder_name ) . '/' . esc_attr( $file_name ) . '.php' ),
	                    'plugin_status' => 'all',
	                    'paged'         => '1',
	                    '_wpnonce'      => wp_create_nonce( 'deactivate-plugin_' . esc_attr( $folder_name ) . '/' . esc_attr( $file_name ) . '.php' ),
	                ), network_admin_url( 'plugins.php' ) );
					break;

				case 'active':
					return add_query_arg( array(
	                    'action'        => 'activate',
	                    'plugin'        => rawurlencode( esc_attr( $folder_name ) . '/' . esc_attr( $file_name ) . '.php' ),
	                    'plugin_status' => 'all',
	                    'paged'         => '1',
	                    '_wpnonce'      => wp_create_nonce( 'activate-plugin_' . esc_attr( $folder_name ) . '/' . esc_attr( $file_name ) . '.php' ),
                    ), network_admin_url( 'plugins.php' ) );
					break;
			}
		}

		/* ========== Plugin Installation Ajax =========== */
		public function news_portal_plugin_installer_callback(){

			if ( ! current_user_can( 'install_plugins' ) )
				wp_die( esc_html__( 'Sorry, you are not allowed to install plugins on this site.', 'news-portal-pro' ) );

			$nonce = $_POST["nonce"];
			$plugin = $_POST["plugin"];
			$plugin_file = $_POST["plugin_file"];

			// Check our nonce, if they don't match then bounce!
			if (! wp_verify_nonce( $nonce, 'news_portal_plugin_installer_nonce' ))
				wp_die( esc_html__( 'Error - unable to verify nonce, please try again.', 'news-portal-pro') );


     		// Include required libs for installation
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-ajax-upgrader-skin.php';
			require_once ABSPATH . 'wp-admin/includes/class-plugin-upgrader.php';

			// Get Plugin Info
			$api = $this->news_portal_call_plugin_api( $plugin );

			$skin     = new WP_Ajax_Upgrader_Skin();
			$upgrader = new Plugin_Upgrader( $skin );
			$upgrader->install( $api->download_link );

			$plugin_file = ABSPATH . 'wp-content/plugins/'.esc_html( $plugin ).'/'.esc_html( $plugin_file );

			if($api->name) {
				$main_plugin_file = $this->get_plugin_file( $plugin );
				if( $main_plugin_file ){
					activate_plugin( $main_plugin_file );
					echo "success";
					die();
				}
			}
			echo "fail";

			die();
		}

		/** Plugin Offline Installation Ajax **/
		public function news_portal_plugin_offline_installer_callback() {
			
			$file_location = $_POST['file_location'];
			$file = $_POST['file'];
			$plugin_directory = ABSPATH . 'wp-content/plugins/';

			$zip = new ZipArchive;
			if ( $zip->open( esc_html( $file_location ) ) === TRUE ) {

			    $zip->extractTo( $plugin_directory );
			    $zip->close();
			    
			    activate_plugin( $file );
				echo "success";
				die();
			} else {
			    echo 'failed';
			}

			die();
		}

		/** Plugin Offline Activation Ajax **/
		public function news_portal_plugin_offline_activation_callback() {

			$plugin = $_POST['plugin'];
			$plugin_file = ABSPATH . 'wp-content/plugins/'.esc_html( $plugin ).'/'.esc_html( $plugin ).'.php';

			if( file_exists( $plugin_file ) ) {
				activate_plugin( $plugin_file );
			} else {
				echo "Plugin Doesn't Exists";
			}

			die();
			
		}

		/** Plugin Offline deactivation Ajax **/
		public function news_portal_plugin_offline_deactivation_callback() {

			$plugin = $_POST['plugin'];
			$plugin_file = ABSPATH . 'wp-content/plugins/'.esc_html( $plugin ).'/'.esc_html( $plugin ).'.php';

			if( file_exists( $plugin_file ) ) {
				deactivate_plugins( $plugin_file );
			} else {
				echo "Plugin Doesn't Exists";
			}

			die();
			
		}

		/** Plugin Activation Ajax **/
		public function news_portal_plugin_activation_callback(){

			if ( ! current_user_can( 'install_plugins' ) )
				wp_die( esc_html__( 'Sorry, you are not allowed to activate plugins on this site.', 'news-portal-pro' ) );

			$nonce = $_POST["nonce"];
			$plugin = $_POST["plugin"];

			// Check our nonce, if they don't match then bounce!
			if ( ! wp_verify_nonce( $nonce, 'news_portal_plugin_activate_nonce' ) )
				die( esc_html__( 'Error - unable to verify nonce, please try again.', 'news-portal-pro' ) );


         	// Include required libs for activation
			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			require_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			require_once ABSPATH . 'wp-admin/includes/class-plugin-upgrader.php';


			// Get Plugin Info
			$api = $this->news_portal_call_plugin_api( esc_attr( $plugin ) );


			if( $api->name ){
				$main_plugin_file = $this->get_plugin_file( esc_attr( $plugin ) );
				$status = 'success';
				if( $main_plugin_file ){
					activate_plugin( $main_plugin_file );
					$msg = $api->name .' successfully activated.';
				}
			} else {
				$status = 'failed';
				$msg = esc_html__( 'There was an error activating $api->name', 'news-portal-pro' );
			}

			$json = array(
				'status' => $status,
				'msg' => $msg,
			);

			wp_send_json( $json );

		}

		public function all_required_plugins_installed() {

	      	$companion_plugins = $this->companion_plugins;
			$show_success_notice = false;

			foreach( $companion_plugins as $plugin ) {

				$path = WP_PLUGIN_DIR.'/'.esc_attr( $plugin['slug'] ).'/'.esc_attr( $plugin['filename'] );

				if( file_exists( $path ) ) {
					if( class_exists( $plugin['class'] ) ) {
						$show_success_notice = true;
					} else {
						$show_success_notice = false;
						break;
					}
				} else {
					$show_success_notice = false;
					break;
				}
			}

			return $show_success_notice;
      	}

		public static function get_plugin_file( $plugin_slug ) {
	         require_once ABSPATH . '/wp-admin/includes/plugin.php'; // Load plugin lib
	         $plugins = get_plugins();

	         foreach( $plugins as $plugin_file => $plugin_info ) {

		         // Get the basename of the plugin e.g. [askismet]/askismet.php
		         $slug = dirname( plugin_basename( $plugin_file ) );

		         if($slug){
		            if ( $slug == $plugin_slug ) {
		               return $plugin_file; // If $slug = $plugin_name
		            }
	            }
	         }
	         return null;
      	}

	  	public function get_local_dir_path( $plugin ) {

      		$url = wp_nonce_url( admin_url( 'themes.php?page=news-portal-welcome&section=import_demo' ),'news-portal-file-installation' );
			if ( false === ( $creds = request_filesystem_credentials( $url, '', false, false, null ) ) ) {
				return; // stop processing here
			}

      		if ( ! WP_Filesystem( $creds ) ) {
				request_filesystem_credentials( $url, '', true, false, null );
				return;
			}

			global $wp_filesystem;
			$file = $wp_filesystem->get_contents( $plugin['location'] );

			$file_location = get_template_directory().'/inc/welcome/plugins/'.$plugin['slug'].'.zip';

			$wp_filesystem->put_contents( $file_location, $file, FS_CHMOD_FILE );

			return $file_location;
      	}

	}

	new News_Portal_Welcome();

endif;

/** Initializing Demo Importer if exists **/
if( class_exists( 'MT_Demo_Importer' ) ) :

	$demoimporter = new MT_Demo_Importer();

	if( is_woocommerce_activated() ) {
		$demoimporter->demos = array(
			'default-woo-demo' 	=> array(
				'title' 		=> esc_html__( 'Default Demo', 'news-portal-pro' ),
				'name' 			=> 'default-woo-demo',
				'screenshot' 	=> get_template_directory_uri().'/inc/welcome/demos/default-woo-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary menu' 	=> 'news_portal_primary_menu',
					'footer menu' 	=> 'news_portal_footer_menu',
					'top menu' 		=> 'news_portal_top_menu'
				)
			),

			'fashion-demo' => array(
				'title' 		=> esc_html__( 'Fashion Demo', 'news-portal-pro' ),
				'name' 			=> 'fashion-demo',
				'screenshot'	=> get_template_directory_uri().'/inc/welcome/demos/fashion-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary menu' => 'news_portal_primary_menu'
				)
			)
		);
	} else {
		$demoimporter->demos = array(
			'default-demo' 	=> array(
				'title' 		=> esc_html__( 'Default Demo', 'news-portal-pro' ),
				'name' 			=> 'default-demo',
				'screenshot' 	=> get_template_directory_uri().'/inc/welcome/demos/default-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary menu' 	=> 'news_portal_primary_menu',
					'footer menu' 	=> 'news_portal_footer_menu',
					'top menu' 		=> 'news_portal_top_menu'
				)
			),

			'fashion-demo' => array(
				'title' 		=> esc_html__( 'Fashion Demo', 'news-portal-pro' ),
				'name' 			=> 'fashion-demo',
				'screenshot'	=> get_template_directory_uri().'/inc/welcome/demos/fashion-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary menu' => 'news_portal_primary_menu'
				)
			),

			'sports-demo' => array(
				'title' 		=> esc_html__( 'Sports Demo', 'news-portal-pro' ),
				'name' 			=> 'sports-demo',
				'screenshot'	=> get_template_directory_uri().'/inc/welcome/demos/sports-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary' => 'news_portal_primary_menu'
				)
			),

			'blog-demo' => array(
				'title' 		=> esc_html__( 'Blog Demo', 'news-portal-pro' ),
				'name' 			=> 'blog-demo',
				'screenshot'	=> get_template_directory_uri().'/inc/welcome/demos/blog-demo/screen.jpg',
				'home_page' 	=> 'home',
				'menus' 		=> array(
					'primary menu' => 'news_portal_primary_menu'
				)
			)
		);
	}

	

	$demoimporter->demo_dir = get_template_directory().'/inc/welcome/demos/'; // Path to the directory containing demo files
	
	$demoimporter->option_name = ''; // Set the the name of the option if the theme is based on theme option
	
endif;
?>