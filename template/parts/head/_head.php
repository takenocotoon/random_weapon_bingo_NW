
<meta charset="utf-8">
    <title><?php echo TITLE; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="og:title" content="<?php echo TITLE; ?>">
    <meta name="description"    content="<?php echo DESCRIPTION ?>">
    <meta name="og:description" content="<?php echo DESCRIPTION; ?>">
    <meta property="og:locale" content="ja_JP">
    <meta property="og:type" content="website">
    <link rel="canonical"      href="<?php echo URL; ?>">
    <link rel="INDEX" href="<?php echo BASE_FOLDER; ?>"><?php if (isset($start_file)) {
    echo "\n    <link rel=\"START\" href=\""  . $start_file . "\">"; } ?><?php if (isset($next_file)) {
    echo "\n    <link rel=\"NEXT\" href=\""  . $next_file . "\">"; } ?><?php if (isset($prev_file)) {
    echo "\n    <link rel=\"PREV\" href=\""  . $prev_file . "\">"; } ?><?php if (isset($contents_file)) {
    echo "\n    <link rel=\"CONTENTS\" href=\""  . $contents_file . "\">"; } ?><?php if (isset($chapter_file)) {
    echo "\n    <link rel=\"CHAPTER\" href=\""  . $chapter_file . "\">"; } ?><?php if (isset($section_file)) {
    echo "\n    <link rel=\"SECTION\" href=\""  . $section_file . "\">"; } ?><?php if (isset($help_file)) {
    echo "\n    <link rel=\"HELP\" href=\""  . $help_file . "\">"; } ?>
    <meta property="og:url" content="<?php echo URL; ?>">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:site" content="@<?php echo TWITTER; ?>">
    <meta name="theme-color" content="<?php echo THEME_COLOR; ?>">
    <meta name="og:image"          content="<?php echo URL; ?>icon.png">
    <link rel="icon" type="image/png" href="favicon.png">
    <link rel="apple-touch-icon"      href="icon.png">
    <link rel="manifest" href="manifest.json<?php if (!isset($is_prod)) echo '.php'; ?>">
<?php
foreach ($cssPaths as $path) {
    echo "    <link rel=\"stylesheet\" href=\"{$path}?{$date}\">\n";
} ?>
<?php
foreach ($modulePaths as $path) {
    echo "    <script type=\"module\" src=\"{$path}?{$date}\"></script>\n";
} ?>
<?php
foreach ($scriptPaths as $path) {
    echo "    <script src=\"{$path}?{$date}\"></script>\n";
} ?>
