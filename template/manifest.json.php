<?php 
    if (!isset($is_prod)) {
        header('Content-type: application/json'); 
        include(__DIR__.'/settings.php');
    } else {
        $version = VERSION;
    } ?>{
    "name": "<?php echo TITLE ?>",
    "short_name": "<?php echo TITLE_SHORT ?>",
    "description": "<?php echo DESCRIPTION ?>",
    "id":"<?php echo ID ?>",
    "start_url": "index.html",
    "display_override": ["standalone"],
    "display": "standalone",
    "orientation": "any",
    "background_color": "#444444",
    "theme_color": "<?php echo THEME_COLOR ?>",
    "icons": [
        {
            "src": ".img/icons/48a.png",
            "sizes": "48x48",
            "type": "image/png",
			"purpose": "any"
        },
        {
            "src": "img/icons/48m.png",
            "sizes": "48x48",
            "type": "image/png",
			"purpose": "maskable"
        },
        {
        "src": "img/icons/192a.png",
        "sizes": "192x192",
        "type": "image/png",
                "purpose": "any"
        },
        {
        "src": "img/icons/192m.png",
        "sizes": "192x192",
        "type": "image/png",
                "purpose": "maskable"
        },
        {
        "src": "img/icons/512a.png",
        "sizes": "512x512",
        "type": "image/png",
                "purpose": "any"
        },
        {
        "src": "img/icons/512m.png",
        "sizes": "512x512",
        "type": "image/png",
                "purpose": "maskable"
        }
    ]
}
