<?php
/**
 * Added extra info field about author
 *
 * @package Mystery Themes
 * @subpackage News Portal Pro
 * @since 1.0.0
 *
 */

/**
 * Adds additional user fields
 * more info: http://justintadlock.com/archives/2009/09/10/adding-and-using-custom-user-profile-fields
 */

add_action( 'show_user_profile', 'news_portal_additional_user_fields' );
add_action( 'edit_user_profile', 'news_portal_additional_user_fields' );

function news_portal_additional_user_fields( $user ) { 

	wp_nonce_field( basename( __FILE__ ), 'news_portal_pro_author_meta_nonce' );

	$user_img_url = get_the_author_meta( 'user_meta_image', $user->ID );
	$user_img_id = news_portal_get_image_id_from_url( $user_img_url );
	$user_thumb_img_url = wp_get_attachment_image_src( $user_img_id, 'thumbnail', true );
?>
    <h3><?php esc_html_e( 'Additional User Meta', 'news-portal-pro' ); ?></h3>
    
    <?php
        $image = $image_class = "";
        $author_avatar = get_the_author_meta( 'user_meta_image', $user->ID );
        if( !empty( $author_avatar ) ) {
            $image = '<img src="'.esc_url( $author_avatar ).'" style="max-width:100%;"/>';    
            $image_class = ' hidden';
        }
    ?>
    <table class="form-table">
        <tr class="user-custom-profile-picture">
            <th><?php esc_html_e( 'Custom Profile Picture', 'news-portal-pro' ); ?></th>
            <td>
                <div class="attachment-media-view">                
                    <div class="placeholder<?php echo esc_attr( $image_class ); ?>">
                        <?php esc_html_e( 'No image selected', 'news-portal-pro' ); ?>
                    </div>
                    <div class="thumbnail thumbnail-image">
                        <?php echo $image; ?>
                    </div>

                    <div class="actions np-clearfix">
                        <button type="button" class="button np-delete-button align-left"><?php esc_html_e( 'Remove', 'news-portal-pro' ); ?></button>
                        <button type="button" class="button np-upload-button alignright"><?php esc_html_e( 'Upload Image', 'news-portal-pro' ); ?></button>
                        
                        <input name="user_meta_image" class="upload-id" type="hidden" value="<?php echo esc_url_raw( $author_avatar ); ?>"/>
                    </div>
                </div>
            </td>
        </tr>
    </table><!-- end form-table -->
<?php } // news_portal_additional_user_fields

/**
* Saves additional user fields to the database
*/
function news_portal_save_additional_user_meta( $user_id ) {

	// Verify the nonce before proceeding.
    if ( !isset( $_POST[ 'news_portal_pro_author_meta_nonce' ] ) || !wp_verify_nonce( $_POST[ 'news_portal_pro_author_meta_nonce' ], basename( __FILE__ ) ) ) {
        return;
    }
 
    // only saves if the current user can edit user profiles
    if ( !current_user_can( 'edit_user', $user_id ) ) {
        return false;
    }
 
    update_user_meta( $user_id, 'user_meta_image', $_POST['user_meta_image'] );
}
 
add_action( 'personal_options_update', 'news_portal_save_additional_user_meta' );
add_action( 'edit_user_profile_update', 'news_portal_save_additional_user_meta' );


$news_portal_user_social_array = array(
    'behance'           => esc_html__( 'Behance', 'news-portal-pro' ),
    'delicious'         => esc_html__( 'Delicious', 'news-portal-pro' ),
    'deviantart'        => esc_html__( 'DeviantArt', 'news-portal-pro' ),
    'digg'              => esc_html__( 'Digg', 'news-portal-pro' ),
    'dribbble'          => esc_html__( 'Dribbble', 'news-portal-pro' ),
    'facebook'          => esc_html__( 'Facebook', 'news-portal-pro' ),
    'flickr'            => esc_html__( 'Flickr', 'news-portal-pro' ),
    'github'            => esc_html__( 'Github', 'news-portal-pro' ),
    'google-plus'       => esc_html__( 'Google+', 'news-portal-pro' ),
    'html5'             => esc_html__( 'Html5', 'news-portal-pro' ),
    'instagram'         => esc_html__( 'Instagram', 'news-portal-pro' ),    
    'linkedin'          => esc_html__( 'LinkedIn', 'news-portal-pro' ),
    'paypal'            => esc_html__( 'PayPal', 'news-portal-pro' ),
    'pinterest'         => esc_html__( 'Pinterest', 'news-portal-pro' ),
    'reddit'            => esc_html__( 'Reddit', 'news-portal-pro' ),
    'rss'               => esc_html__( 'RSS', 'news-portal-pro' ),
    'share'             => esc_html__( 'Share', 'news-portal-pro' ),
    'skype'             => esc_html__( 'Skype', 'news-portal-pro' ),
    'soundcloud'        => esc_html__( 'SoundCloud', 'news-portal-pro' ),
    'spotify'           => esc_html__( 'Spotify', 'news-portal-pro' ),
    'stack-exchange'    => esc_html__( 'StackExchange', 'news-portal-pro' ),
    'stack-overflow'    => esc_html__( 'Stackoverflow', 'news-portal-pro' ),
    'steam'             => esc_html__( 	'Steam', 'news-portal-pro' ),
    'stumbleupon'       => esc_html__( 'StumbleUpon', 'news-portal-pro' ),
    'tumblr'            => esc_html__( 'Tumblr', 'news-portal-pro' ),
    'twitter'           => esc_html__( 'Twitter', 'news-portal-pro' ),
    'vimeo'             => esc_html__( 'Vimeo', 'news-portal-pro' ),
    'vk'                => esc_html__( 'VKontakte', 'news-portal-pro' ),
    'windows'           => esc_html__( 'Windows', 'news-portal-pro' ),
    'wordpress'         => esc_html__( 'WordPress', 'news-portal-pro' ),
    'yahoo'             => esc_html__( 'Yahoo', 'news-portal-pro' ),
    'youtube'           => esc_html__( 'YouTube', 'news-portal-pro' )
);

add_filter( 'user_contactmethods', 'news_portal_author_meta_contact' );

function news_portal_author_meta_contact() {
    global $news_portal_user_social_array;
    foreach( $news_portal_user_social_array as $icon_id => $icon_name ) {
        $contactmethods[$icon_id] = $icon_name;
    }
    return $contactmethods;
}