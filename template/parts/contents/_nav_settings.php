            <div class="p-nav__submenu">
<?php 
    $indentDepth = 4;
    $submenu = [
        'type' => 'radio',
        'id' => 'settingsBingoBackground',
        'title' => ['ja'=>'ビンゴ背景', 'en'=>'Bingo Background'],
        'items' => [
            'orange' => ['ja'=>'オレンジ', 'en'=>'Orange'],
            'gray' => ['ja'=>'グレー', 'en'=>'Gray'],
            'salmonrun' => ['ja'=>'サーモンラン', 'en'=>'Salmon Run'],
            'battle' => ['ja'=>'バトル', 'en'=>'Battle'],
            'simple' => ['ja'=>'シンプル', 'en'=>'Simple'],
        ],
        'defaultValues' => [
            'salmonrun',
        ],
    ];
    include($dir . '/parts/objects/_nav_submenu-form.php');
    
    $submenu = [
        'type' => 'radio',
        'id' => 'settingsTheme',
        'title' => ['ja'=>'カラーテーマ', 'en'=>'Color Scheme'],
        'items' => [
            'default' => ['ja'=>'システム設定に従う', 'en'=>'Follow System Setting'],
            'light' => ['ja'=>'ライト', 'en'=>'Light'],
            'dark' => ['ja'=>'ダーク', 'en'=>'Dark'],
            'transparent' => ['ja'=>'透過(配信用)', 'en'=>'Transparency (for Streaming)'],
            'green' => ['ja'=>'グリーンバック(配信用)', 'en'=>'Chroma Key'],
        ],
        'defaultValues' => [
            'default',
        ],
    ];
    include($dir . '/parts/objects/_nav_submenu-form.php');
?>
                <div class="p-menuForm">
                    <div class="p-menuForm__title">Language</div><?php 
                        $settingsLanguage = array(
                            'ja' => '日本語',
                            'en' => 'English',
                        );
                        echo "\n                    ";
                        foreach ($settingsLanguage as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsLanguage\" value=\"{$id}\" id=\"js-settingsLanguage--{$id}\"";
                            if ($id=='ja') { echo " checked"; };
                            echo " class=\"c-radio__hidden\">";
                            echo "<label for=\"js-settingsLanguage--{$id}\" class=\"c-radio__label\">{$name}</label>";
                        } ?>
                </div>
            </div>
