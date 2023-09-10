<?php 
$date = date("ymdHis");
const TITLE = 'Splatoon3 ブキビンゴ';
const TITLE_EN = 'Splatoon3 Weapon Bingo';
const TITLE_SHORT = 'ブキビンゴ';
const ID = 'buki-bingo';
const DESCRIPTION = 'A tool to play Bingo with Splatoon 3 weapons.';
const URL = 'https://takenocotoon.github.io/random_weapon_bingo_nw/';
const TWITTER = 'takenocotoon';
const THEME_COLOR='#FE6345';
if (isset($is_prod)) {
    $cssPaths=['./css/style.min.css', './remixicon/remixicon.css'];
    $modulePaths=['./js/main.min.js'];
    $scriptPaths=[];
} else {
    $cssPaths=['./css/style.dev.css', './remixicon/remixicon.css'];
    $modulePaths=['./js/main.dev.js'];
    $scriptPaths=[];
}
const BASE_FOLDER = './';
const VERSION = '2.0.4';
if (!isset($is_prod)) {
    $version = VERSION.'dev'.$date;
}
const INDENT = '    ';
?>
