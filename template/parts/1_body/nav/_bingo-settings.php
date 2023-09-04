            <div>
                <button type="button" id="js-createCard-btn-t" class="c-wide-btn c-no-print">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
                <div class="p-menu-form c-no-print">
                    <div>
                        <span lang="ja">中央</span>
                        <span lang="en">Center</span>
                    </div><?php 
                        $settingsCenter = array(
                            'kuma' => ['FREE(クマサン)', 'FREE(Mr.Grizz)'],
                            'squid' => ['FREE(イカ)', 'FREE(Squid)'],
                            'random' => ['ランダム', 'Random'],
                            'centerGrizzco' => ['クマブキ', 'Grizzco Weapon'],
                            'centerWeapon' => ['お気に入りブキ', 'Preferred Weapon'],
                        );
                        echo "\n                    ";
                        foreach ($settingsCenter as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsCenter\" value=\"{$id}\" id=\"js-settingsCenter--{$id}\"";
                            if ($id=='kuma') { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsCenter--{$id}\" id=\"js-settingsCenter--{$id}-label\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                    <br>
                </div>
                <div class="p-menu-form c-no-print">
                    <div>
                        <span lang="ja">大きさ</span>
                        <span lang="en">Size</span>
                    </div><?php 
                        $settingsSize = array(
                            '3' => ['3 × 3 (9)', '3 × 3 (9)'],
                            '5' => ['5 × 5 (25)', '5 × 5 (25)'],
                            '7' => ['7 × 7 (49)', '7 × 7 (49)'],
                            '8' => ['8 × 8 (64)', '8 × 8 (64)'],
                            '9' => ['9 × 9 (81)', '9 × 9 (81)'],
                        );
                        echo "\n                    ";
                        foreach ($settingsSize as $id => $name) {
                            echo "<input type=\"radio\" name=\"settingsSize\" value=\"{$id}\" id=\"js-settingsSize--{$id}\"";
                            if ($id==5) { echo " checked"; };
                            echo ">";
                            echo "<label for=\"js-settingsSize--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>";
                        } ?>
                </div>
                <div class="p-menu-form">
                    <div>
                        <span lang="ja">対象ブキ </span>
                        <span lang="en">Target Weapons </span>
                        <span id="js-weapons">59</span>
                        <span lang="ja">個</span>
                    </div><?php 
                        $settingsWeapons = array(
                            'grizzco' => ['クマブキ', 'Grizzco Weapons'],
                            'minor' => ['マイナーチェンジブキ', 'Variant Weapons'],
                            'scope' => ['スコープ', 'Scopes'],
                            'hero' => ['ヒーローブキ', 'Hero Weapons'],
                        );
                        echo "\n                    ";
                        foreach ($settingsWeapons as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"settingsWeapons--{$id}\" value=\"true\" id=\"js-settingsWeapons--{$id}\"";
                            // if ($id=='grizzco') echo " checked";
                            echo ">";
                            echo "<label for=\"js-settingsWeapons--{$id}\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <button type="button" id="js-createCard-btn-b" class="c-wide-btn c-no-print">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
            </div>

