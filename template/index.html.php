<!DOCTYPE html>
<html lang="ja">

<head>
<?php
    $date = date("ymdHis");
    $indentDepth = 0;
    $dir = __DIR__;
    include($dir . '/settings.php');
    include($dir . '/parts/head/_head.php');
    if (isset($is_prod)) {
        $version = VERSION;
    }
?>
</head>

<body lang="ja">
<div id="l-wrapper">

<?php
    include($dir . '/parts/body/_header.php');
    $menuItems = [
        [
            'url' => '#',
            'isSubmenu' => true,
            'isStrong' => false,
            'id' => 'bingo-settings',
            'icon' => 'settings-3-fill',
            'ja' => 'ビンゴ設定',
            'en' => 'Bingo Settings',
        ],
        [
            'url' => '#',
            'isSubmenu' => true,
            'isStrong' => false,
            'id' => 'settings',
            'icon' => 'paint-brush-fill',
            'ja' => '外観',
            'en' => 'Design',
        ],
        [
            'url' => '#',
            'isSubmenu' => true,
            'isStrong' => false,
            'id' => 'backup',
            'icon' => 'file-download-fill',
            'ja' => 'バックアップ',
            'en' => 'Backup',
        ],
        // [
        //     'url' => '#',
        //     'isSubmenu' => true,
        //     'isStrong' => false,
        //     'id' => 'help',
        //     'icon' => 'question-fill',
        //     'ja' => 'ヘルプ',
        //     'en' => 'Help',
        // ],
    ];
    include($dir . '/parts/body/_nav.php');
    include($dir . '/parts/body/_main.php');
    $dialogs = [
        'center-item', 'compleat'
    ];
    include($dir . '/parts/body/_dialog.php');
    include($dir . '/parts/body/_footer.php');
?>

</div>
</body>

</html>
