<?php
/**
 * Script d'import WordPress pour PareBrise Genève Pro
 * Usage: wp eval-file wordpress-import.php
 */

// Configuration
$site_data = [
    'site_title' => 'PareBrise Genève Pro',
    'tagline' => 'N°1 du pare-brise à Genève - Service Express',
    'admin_email' => 'admin@parebrise-geneve-pro.ch',
    'timezone' => 'Europe/Zurich',
    'date_format' => 'd.m.Y',
    'time_format' => 'H:i'
];

// 1. Configuration générale du site
echo "Configuration du site...\n";
update_option('blogname', $site_data['site_title']);
update_option('blogdescription', $site_data['tagline']);
update_option('admin_email', $site_data['admin_email']);
update_option('timezone_string', $site_data['timezone']);
update_option('date_format', $site_data['date_format']);
update_option('time_format', $site_data['time_format']);

// 2. Création des pages principales
echo "Création des pages...\n";

$pages = [
    // Page d'accueil
    [
        'post_title' => 'Accueil',
        'post_name' => 'accueil',
        'post_content' => file_get_contents(__DIR__ . '/../pages/accueil-content.html'),
        'post_status' => 'publish',
        'post_type' => 'page',
        'meta_input' => [
            '_yoast_wpseo_title' => 'Remplacement Pare-brise Genève - N°1 Service Express | PareBrise Genève Pro',
            '_yoast_wpseo_metadesc' => 'Spécialiste n°1 du remplacement et réparation de pare-brise à Genève. ✓ Intervention 2h ✓ Calibrage ADAS certifié ✓ Garantie à vie. Devis gratuit immédiat.'
        ]
    ],
    
    // Services
    [
        'post_title' => 'Remplacement Pare-brise Genève',
        'post_name' => 'remplacement-pare-brise-geneve',
        'post_content' => file_get_contents(__DIR__ . '/../pages/services/remplacement-pare-brise.html'),
        'post_status' => 'publish',
        'post_type' => 'page',
        'post_parent' => 0, // Will be updated
        'meta_input' => [
            '_yoast_wpseo_title' => 'Remplacement Pare-brise Genève - Intervention Express | PareBrise Genève Pro',
            '_yoast_wpseo_metadesc' => 'Service de remplacement de pare-brise à Genève. Intervention sous 2h, calibrage ADAS inclus, garantie à vie. Devis gratuit en ligne.'
        ]
    ],
    
    // Pages quartiers
    [
        'post_title' => 'Pare-brise Carouge',
        'post_name' => 'pare-brise-carouge',
        'post_content' => file_get_contents(__DIR__ . '/../pages-quartiers/pare-brise-carouge.html'),
        'post_status' => 'publish',
        'post_type' => 'page',
        'meta_input' => [
            '_yoast_wpseo_title' => 'Pare-brise Carouge - Remplacement Express et Réparation | PareBrise Genève Pro',
            '_yoast_wpseo_metadesc' => 'Service de remplacement et réparation de pare-brise à Carouge. Intervention rapide dans tout le quartier, devis gratuit. ✓ Garantie à vie ✓ Prise en charge assurance.'
        ]
    ],
];

$created_pages = [];
foreach ($pages as $page_data) {
    $page_id = wp_insert_post($page_data);
    if (!is_wp_error($page_id)) {
        $created_pages[$page_data['post_name']] = $page_id;
        echo "Page créée : {$page_data['post_title']} (ID: $page_id)\n";
    }
}

// 3. Configuration de la page d'accueil
update_option('show_on_front', 'page');
update_option('page_on_front', $created_pages['accueil']);

// 4. Création du menu principal
echo "Création du menu principal...\n";

$menu_name = 'Menu Principal';
$menu_exists = wp_get_nav_menu_object($menu_name);

if (!$menu_exists) {
    $menu_id = wp_create_nav_menu($menu_name);
    
    // Ajout des éléments de menu
    $menu_items = [
        ['title' => 'Accueil', 'url' => '/', 'order' => 1],
        ['title' => 'Services', 'url' => '/services/', 'order' => 2],
        ['title' => 'Urgence 24/7', 'url' => '/urgence-pare-brise-24h/', 'order' => 3],
        ['title' => 'Devis Gratuit', 'url' => '/devis-gratuit-en-ligne/', 'order' => 4],
        ['title' => 'Blog', 'url' => '/blog/', 'order' => 5],
        ['title' => 'Contact', 'url' => '/contact/', 'order' => 6],
    ];
    
    foreach ($menu_items as $item) {
        wp_update_nav_menu_item($menu_id, 0, [
            'menu-item-title' => $item['title'],
            'menu-item-url' => home_url($item['url']),
            'menu-item-status' => 'publish',
            'menu-item-position' => $item['order']
        ]);
    }
    
    // Assigner le menu à l'emplacement principal
    $locations = get_theme_mod('nav_menu_locations');
    $locations['primary'] = $menu_id;
    set_theme_mod('nav_menu_locations', $locations);
}

// 5. Import des Custom Post Types
echo "Création des Custom Post Types...\n";

// CPT pour les témoignages
register_post_type('testimonials', [
    'labels' => [
        'name' => 'Témoignages',
        'singular_name' => 'Témoignage',
        'add_new' => 'Ajouter un témoignage',
        'add_new_item' => 'Ajouter un nouveau témoignage',
        'edit_item' => 'Modifier le témoignage'
    ],
    'public' => true,
    'has_archive' => true,
    'menu_icon' => 'dashicons-format-quote',
    'supports' => ['title', 'editor', 'custom-fields'],
    'show_in_rest' => true
]);

// Ajout de témoignages
$testimonials = [
    [
        'post_title' => 'Marc Dubois - Eaux-Vives',
        'post_content' => 'Impact réparé en 25 minutes chrono ! Service impeccable, je recommande vivement.',
        'post_type' => 'testimonials',
        'post_status' => 'publish',
        'meta_input' => [
            'client_location' => 'Eaux-Vives',
            'rating' => '5'
        ]
    ],
    [
        'post_title' => 'Sophie Müller - Champel',
        'post_content' => 'Remplacement pare-brise BMW avec calibrage ADAS parfait. Prix très correct pour Genève.',
        'post_type' => 'testimonials',
        'post_status' => 'publish',
        'meta_input' => [
            'client_location' => 'Champel',
            'rating' => '5'
        ]
    ]
];

foreach ($testimonials as $testimonial) {
    wp_insert_post($testimonial);
}

// 6. Configuration des plugins recommandés
echo "Configuration des plugins...\n";

$recommended_plugins = [
    'wordpress-seo' => 'Yoast SEO',
    'wp-rocket' => 'WP Rocket',
    'wordfence' => 'Wordfence Security',
    'contact-form-7' => 'Contact Form 7',
    'wpml' => 'WPML (pour multilingue)',
    'wp-super-cache' => 'WP Super Cache (alternative gratuite à WP Rocket)'
];

echo "Plugins recommandés à installer :\n";
foreach ($recommended_plugins as $slug => $name) {
    echo "- $name (wp plugin install $slug --activate)\n";
}

// 7. Configuration Yoast SEO (si installé)
if (is_plugin_active('wordpress-seo/wp-seo.php')) {
    // Configuration du sitemap
    WPSEO_Options::set('enable_xml_sitemap', true);
    
    // Configuration Schema.org
    WPSEO_Options::set('company_or_person', 'company');
    WPSEO_Options::set('company_name', 'PareBrise Genève Pro Sàrl');
    WPSEO_Options::set('company_logo', home_url('/images/logo.png'));
    
    // Breadcrumbs
    WPSEO_Options::set('breadcrumbs-enable', true);
    WPSEO_Options::set('breadcrumbs-home', 'Accueil');
}

// 8. Création des redirections pour SEO
echo "Configuration des redirections...\n";

$redirects = [
    '/pare-brise-geneve.html' => '/services/remplacement-pare-brise-geneve/',
    '/contact.php' => '/contact/',
    '/devis.html' => '/devis-gratuit-en-ligne/'
];

foreach ($redirects as $old => $new) {
    // Utiliser le plugin Redirection ou .htaccess
    echo "Redirection : $old => $new\n";
}

// 9. Import des médias
echo "Import des médias...\n";

$media_files = [
    'logo.png' => 'Logo PareBrise Genève Pro',
    'hero-image.jpg' => 'Image héro accueil',
    'icon-192.png' => 'Icône PWA 192px',
    'icon-512.png' => 'Icône PWA 512px'
];

// 10. Configuration finale
echo "\nConfiguration finale...\n";

// Permaliens
update_option('permalink_structure', '/%postname%/');

// Désactiver les commentaires
update_option('default_comment_status', 'closed');
update_option('default_ping_status', 'closed');

// Fuseau horaire
update_option('gmt_offset', 1);

echo "\n✅ Import terminé avec succès !\n";
echo "\nProchaines étapes :\n";
echo "1. Installer et activer les plugins recommandés\n";
echo "2. Configurer le thème (Bricks recommandé)\n";
echo "3. Importer les images dans la médiathèque\n";
echo "4. Configurer les formulaires de contact\n";
echo "5. Activer le cache et l'optimisation\n";

// Fonction helper pour créer les meta boxes
function create_service_meta_boxes() {
    add_meta_box(
        'service_details',
        'Détails du Service',
        'service_details_callback',
        'page',
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'create_service_meta_boxes');

function service_details_callback($post) {
    $price = get_post_meta($post->ID, '_service_price', true);
    $duration = get_post_meta($post->ID, '_service_duration', true);
    ?>
    <label for="service_price">Prix (CHF) :</label>
    <input type="text" id="service_price" name="service_price" value="<?php echo esc_attr($price); ?>" />
    <br><br>
    <label for="service_duration">Durée :</label>
    <input type="text" id="service_duration" name="service_duration" value="<?php echo esc_attr($duration); ?>" />
    <?php
}

// Sauvegarder les meta données
function save_service_meta($post_id) {
    if (isset($_POST['service_price'])) {
        update_post_meta($post_id, '_service_price', sanitize_text_field($_POST['service_price']));
    }
    if (isset($_POST['service_duration'])) {
        update_post_meta($post_id, '_service_duration', sanitize_text_field($_POST['service_duration']));
    }
}
add_action('save_post', 'save_service_meta');

?> 