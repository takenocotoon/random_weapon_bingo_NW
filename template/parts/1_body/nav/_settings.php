            <div>
                <div class="p-menu-form">
                    <div>
                        <span lang="ja">ビンゴ背景</span>
                        <span lang="en">Bingo Background</span>
                    </div><?php 
                        $settingsBingoTheme = array(
                            'orange' => ['オレンジ', 'Orange'],
                            'gray' => ['グレー', 'Gray'],
                            'salmonrun' => ['サーモンラン', 'Salmon Run'],
                            'battle' => ['バトル', 'Battle'],
                            'simple' => ['シンプル', 'Simple'],
                        );
                        echo "\n                    ";
                        foreach ($settingsBingoTheme as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsBingoTheme\" value=\"{$id}\" id=\"js-settingsBingoTheme--{$id}\"";
                            if ($id=='salmonrun') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsBingoTheme--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                </div>
                <div class="p-menu-form">
                    <div>
                        <span lang="ja">カラーテーマ</span>
                        <span lang="en">Color Scheme</span>
                    </div><?php 
                        $settingsTheme = array(
                            'default' => ['システム設定に従う', 'Follow System Setting'],
                            'light' => ['ライト', 'Light'],
                            'dark' => ['ダーク', 'Dark'],
                            'transparent' => ['透過(配信用)', 'Transparency (for Streaming)'],
                            'green' => ['グリーンバック(配信用)', 'Chroma Key'],
                        );
                        echo "\n                    ";
                        foreach ($settingsTheme as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsTheme\" value=\"{$id}\" id=\"js-settingsTheme--{$id}\"";
                            if ($id=='default') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsTheme--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                </div>
                <div class="p-menu-form">
                    <div>Language</div><?php 
                        $settingsLanguage = array(
                            'ja' => '日本語',
                            'en' => 'English',
                        );
                        echo "\n                    ";
                        foreach ($settingsLanguage as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsLanguage\" value=\"{$id}\" id=\"js-settingsLanguage--{$id}\"";
                            if ($id=='ja') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsLanguage--{$id}\">{$name}</label>";
                        } ?>
                </div>
            </div>
