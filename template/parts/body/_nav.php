<nav class="l-nav p-nav" id="js-menu">
    <ul class="p-nav__ul">
<?php
foreach ($menuItems as $item) {
    $indentDepth = 2;
    echo str_repeat(INDENT, $indentDepth);
    echo "<li class=\"p-nav__li\">\n";
    $indentDepth++;
    
    echo str_repeat(INDENT, $indentDepth);
    echo "<a href=\"{$item['url']}\" class=\"p-nav__menu ";
    if ($item['isSubmenu']) echo "js-submenus ";
    if ($item['isStrong']) echo "p-nav__menu-strong ";
    echo "\" id=\"js-menu__{$item['id']}\">\n";
    $indentDepth++;
    
    echo str_repeat(INDENT, $indentDepth);
    echo "<i class=\"ri-{$item['icon']}\"></i>\n";
    
    echo str_repeat(INDENT, $indentDepth);
    echo "<span lang=\"ja\">{$item['ja']}</span>\n";
    
    echo str_repeat(INDENT, $indentDepth);
    echo "<span lang=\"en\">{$item['en']}</span>\n";
    
    if ($item['isStrong']) {
        echo str_repeat(INDENT, $indentDepth);
        echo "<i class=\"ri-arrow-left-double-fill\"></i>\n";
    }
    
    $indentDepth--;
    echo str_repeat(INDENT, $indentDepth);
    echo "</a>\n";
    
    if ($item['isSubmenu']) {
        include($dir . "/parts/contents/_nav_{$item['id']}.php");
    }
    
    $indentDepth = 2;
    echo str_repeat(INDENT, $indentDepth);
    echo "</li>\n";
}
?>
    </ul>
</nav>
