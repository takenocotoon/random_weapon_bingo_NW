<nav class="l-nav p-nav" id="js-menu">
    <ul class="p-nav__ul"><?php
foreach ($menuItems as $item) {
    echo "        <li class=\"p-nav__li\">\n";
    echo "            <a href=\"{$item['url']}\" class=\"p-nav__menu ";
    if ($item['isSubmenu']) echo "js-submenus ";
    if ($item['isStrong']) echo "p-nav__menu-strong ";
    echo "\" id=\"js-menu__{$item['id']}\">\n";
    echo "                <i class=\"ri-{$item['icon']}\"></i>\n";
    echo "                <span lang=\"ja\">{$item['ja']}</span>\n";
    echo "                <span lang=\"en\">{$item['en']}</span>\n";
    if ($item['isStrong']) echo "                <i class=\"ri-arrow-left-double-fill\"></i>\n";
    echo "            </a>\n";
    if ($item['isSubmenu']) {
        echo "            ";
        include(__DIR__ . "/../contents/_nav_{$item['id']}.php");
    }
    echo "        </li>\n";
} ?>
    </ul>
</nav>
