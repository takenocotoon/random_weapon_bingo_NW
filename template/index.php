<!DOCTYPE html>
<html lang="ja">

<head>
<?php
    $date=date("ymdHis");
    $title='Splatoon3 ブキビンゴ';
    $title_en='Splatoon3 Weapon Bingo';
    $description='A tool to play Bingo with Splatoon 3 weapons.';
    $url='https://takenocotoon.github.io/random_weapon_bingo_nw/';
    $twitter='@takenocotoon';
    $theme_color='#FE6345';
    $cssPaths=['./css/style.min.css', './remixicon/remixicon.css'];
    $modulePaths=['./js/main.min.js'];
    $scriptPaths=[];
    $base_folder='./';
    $version='2.0.2';
    include(__DIR__ . '/parts/head/_head.php');
?>
</head>

<body lang="ja">
<div id="l-wrapper">

<?php
    include(__DIR__ . '/parts/body/_header.php');
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
    include(__DIR__ . '/parts/body/_nav.php');
    include(__DIR__ . '/parts/body/_main.php');
    $dialogs = [
        'center-item', 'compleat'
    ];
    include(__DIR__ . '/parts/body/_dialog.php');
    include(__DIR__ . '/parts/body/_footer.php');
?>

</div>
</body>

</html>
