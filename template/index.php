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
    $cssPaths=['./css/style.css', './remixicon/remixicon.css'];
    $modulePaths=['./js/main.js'];
    $scriptPaths=[];
    $base_folder='./';
    include(__DIR__ . '/parts/0_head/_head.php');
?>
</head>

<body lang="ja">
<div id="l-main-container">

<?php
    include(__DIR__ . '/parts/1_body/_header.php');
    include(__DIR__ . '/parts/1_body/_nav.php');
    include(__DIR__ . '/parts/1_body/_main.php');
    include(__DIR__ . '/parts/1_body/_footer.php');
?>

</div>
</body>

</html>
