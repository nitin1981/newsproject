<?php
/**
 * File to get content for Support tab
 *
 * @package Mystery Themes
 * @subpackage News Portal Pro
 * @since 1.0.3
 */
?>
<div class="support-process">
	<h3><?php esc_html_e( 'Documentation', 'news-portal-pro' ); ?></h3>
	<p><?php printf( esc_html__( 'Read the detailed documentation of the theme. The documentation contain all the necessary information required to setup the theme %s.', 'news-portal-pro' ), esc_html( $this->theme_name ) ); ?></p>
	<a class="button" target="_blank" href="<?php echo esc_url( $this->documentation_link ); ?>"><?php esc_html_e( 'Read Full Documentation', 'news-portal-pro' ); ?></a>
</div>

<div class="support-process">
	<h3><?php esc_html_e( 'Create Support Topic', 'news-portal-pro' ); ?></h3>
	<p><?php esc_html_e( 'Still having problem after reading all the documentation? No Problem!! Please create a support ticket. Our dedicated support team will help you to solve your problem', 'news-portal-pro' ); ?></p>
	<a class="button" target="_blank" href="<?php echo esc_url( $this->support_link ); ?>"><?php esc_html_e( 'Create Support Topic', 'news-portal-pro' ); ?></a>
</div>