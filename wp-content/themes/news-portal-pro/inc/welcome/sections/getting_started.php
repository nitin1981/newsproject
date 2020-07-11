<?php
/**
 * File to get content for Getting Started tab
 *
 * @package Mystery Themes
 * @subpackage News Portal Pro
 * @since 1.0.3
 */
?>

<div class="theme-steps-list">	
	
	<div class="theme-steps">
		<h3><?php esc_html_e( 'Step 1 - Customizer Options Panel', 'news-portal-pro' ); ?></h3>
		<p><?php esc_html_e( 'Using the WordPress Customizer you can easily customize every aspect of the theme.', 'news-portal-pro' ); ?></p>
		<a class="button button-primary" href="<?php echo esc_url( admin_url( 'customize.php' ) ); ?>"><?php esc_html_e( 'Go to Customizer Panels', 'news-portal-pro' ); ?></a>
	</div>

	<div class="theme-steps">
		<h3><?php esc_html_e( 'Step 2 - Recommended Actions', 'news-portal-pro' ); ?></h3>
		<p><?php esc_html_e( 'Before you start setting up the theme, there are few recommended action that you need to follow. These recommendation helps you to set up the theme more easily and quickly.', 'news-portal-pro' ); ?></p>
		<a class="button" href="<?php echo esc_url( admin_url( '/themes.php?page=news-portal-welcome&section=demo_import' ) ); ?>"><?php esc_html_e( 'Recommended Actions', 'news-portal-pro' ); ?></a>
	</div>

	<div class="theme-steps">
		<h3><?php esc_html_e( 'Step 3 - Check for Theme Update', 'news-portal-pro' ); ?></h3>
		<p><?php esc_html_e( 'If you want to use latest version of premium theme, please check on this page.', 'news-portal-pro' ); ?></p>
		<a class="button" href="<?php echo esc_url( $this->theme_detail_link ); ?>" target="_blank"><?php esc_html_e( 'Check for newer version', 'news-portal-pro' ); ?></a>
	</div>

</div>

<div class="theme-image">
	<img src="<?php echo esc_url( get_template_directory_uri() . '/screenshot.jpg' ); ?>">
</div>