<?php
 // Added by WP Rocket
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 * You can get Mysql setttings from your web host.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'rewariyasat_com_wordpress');

/** MySQL database username */
define('DB_USER', 'rewariyasat_com_wordpress');

/** MySQL database password */
define('DB_PASSWORD', 'Oc8204Nb#uNd\'$p3,7(0');

/** MySQL hostname */
define('DB_HOST', 'rewariyasat.com.mysql.service.one.com');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'l-qp7qOgFQlV-elr2ql_U6r7S3mseIdKtS9Wm_69Tis=');
define('SECURE_AUTH_KEY',  'pQnhF_hl1_v3SCUWRO6siR3gVLJxsEzrq74B5Ul1ut4=');
define('LOGGED_IN_KEY',    'c9Loda-Bw8RNFc9-jSCRy1ez2R4ZL_sd6aG5IEOSKmQ=');
define('NONCE_KEY',        'YZeVKgP5IZhN5nSIH23gC3wG9WFokxtc-F6auZpmijA=');
define('AUTH_SALT',        'HkIoi5HemZyPf3sEGho4w9uiqC-yKxqClLh5sLvbfd4=');
define('SECURE_AUTH_SALT', '9YE5TQyCzmfCp6UGEZaiLs3d4xkqUtfgUnaMwQWjVsw=');
define('LOGGED_IN_SALT',   'Z9YI2mnXrrYJelS5PCXOMj9BLnoRqm7UAgu4lUYNzP4=');
define('NONCE_SALT',       '4hnE9w7fRR6OuacXNCpE5Ol04HoIPE4q7mQrvDmYaFU=');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'www1_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'en_GB');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/**
 * Prevent file editing from WP admin.
 * Just set to false if you want to edit templates and plugins from WP admin.
 */
define('DISALLOW_FILE_EDIT', true);

/**
 * API for One.com wordpress themes and plugins
 */
define('ONECOM_WP_ADDONS_API', 'https://wpapi.one.com');


/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
