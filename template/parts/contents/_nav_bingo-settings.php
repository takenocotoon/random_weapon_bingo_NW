            <div class="p-nav__submenu">
                <button type="button" class="c-button p-nav__button js-createBingoCard__buttons">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
<?php 
    $submenu = [
        'type' => 'radio',
        'id' => 'settingsCenterItem',
        'title' => ['ja'=>'中央', 'en'=>'Center',],
        'items' => [
            'kuma' => ['ja'=>'FREE(クマサン)', 'en'=>'FREE(Mr.Grizz)'],
            'squid' => ['ja'=>'FREE(イカ)', 'en'=>'FREE(Squid)'],
            'random' => ['ja'=>'ランダム', 'en'=>'Random'],
            'centerGrizzco' => ['ja'=>'クマブキ', 'en'=>'Grizzco Weapon'],
            'centerWeapon' => ['ja'=>'お気に入りブキ', 'en'=>'Preferred Weapon'],
        ],
        'defaultValues' => [],
    ];
    include($dir . '/parts/objects/_nav_submenu-form.php');
    
    $submenu = [
        'type' => 'radio',
        'id' => 'settingsSize',
        'title' => ['ja'=>'大きさ', 'en'=>'Size',],
        'items' => [
            '3' => ['ja'=>'3 × 3 (9)', 'en'=>'3 × 3 (9)'],
            '5' => ['ja'=>'5 × 5 (25)', 'en'=>'5 × 5 (25)'],
            '7' => ['ja'=>'7 × 7 (49)', 'en'=>'7 × 7 (49)'],
            '8' => ['ja'=>'8 × 8 (64)', 'en'=>'8 × 8 (64)'],
            '9' => ['ja'=>'9 × 9 (81)', 'en'=>'9 × 9 (81)'],
        ],
        'defaultValues' => [
        ],
    ];
    include($dir . '/parts/objects/_nav_submenu-form.php');
?>
                <div class="p-menuForm">
                    <div class="p-menuForm__title">
                        <span lang="ja">対象ブキ </span>
                        <span lang="en">Target Weapons </span>
                        <span id="js-weaponsNumber-text">59</span>
                        <span lang="ja">個</span>
                    </div>
<?php 
                        $settingsWeapons = array(
                            'grizzco' => ['クマブキ', 'Grizzco Weapons'],
                            'minor' => ['マイナーチェンジブキ', 'Variant Weapons'],
                            'scope' => ['スコープ', 'Scopes'],
                            'hero' => ['ヒーローブキ', 'Hero Weapons'],
                        );
                        $indentDepth = 5;
                        echo str_repeat(INDENT, $indentDepth);
                        foreach ($settingsWeapons as $id => $name) {
                            echo str_repeat(INDENT, $indentDepth);
                            echo "<input type=\"checkbox\" name=\"settingsWeapons\" value=\"{$id}\" id=\"js-settingsWeapons__{$id}\"";
                            // if ($id=='grizzco') echo " checked";
                            echo " class=\"c-checkbox__hidden\">";
                            echo "<label for=\"js-settingsWeapons__{$id}\" class=\"c-checkbox__label\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <button type="button" class="c-button p-nav__button js-createBingoCard__buttons">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
            </div>

