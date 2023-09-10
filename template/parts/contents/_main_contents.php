                <button type="button" class="js-createBingoCard__buttons c-button u-width100">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
                <div class="u-noPrint">
<?php 
                        $indentDepth = 5;
                        $settingsOption = array(
                            'bingoEffect' => ['ビンゴ演出', 'Bingo Effects'],
                            'bingoWeaponText' => ['ブキ名表示', 'Display Weapon Name'],
                        );
                        foreach ($settingsOption as $id => $name) {
                            echo str_repeat(INDENT, $indentDepth);
                            echo "<input type=\"checkbox\" name=\"settingsOptions\" value=\"{$id}\" id=\"js-settingsOptions__{$id}\"";
                            if ($id=='bingoEffect') echo " checked";
                            echo ">";
                            echo "<label for=\"js-settingsOptions__{$id}\" id=\"js-settingsOptions__{$id}-label\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div class="p-bingo" id="js-bingo">
                    <div class="p-bingo__box" id="js-bingo__box">
                        <div class="p-bingo__table" id="js-bingo__table">
                        </div>
                    </div>
                    <div class="p-bingo__messageBox" id="js-bingo__messageBox">
                        <div id="js-bingo__messageBox-bingo" class="p-bingo__messageBox-bingo">
                            <span lang="ja" id="js-bingo__messageBox-bingo__ja"></span>
                            <span lang="en" id="js-bingo__messageBox-bingo__en"></span>
                        </div>
                        <div id="js-bingo__MessageBox-reach" class="p-bingo__messageBox-reach">
                            <span lang="ja" id="js-bingo__messageBox-reach__ja"></span>
                            <span lang="en" id="js-bingo__messageBox-reach__en"></span>
                        </div>
                    </div>
                </div>
                <div class="u-flexColumn u-noPrint">
                    <button type="button" id="js-downloadImg-button" class="c-button u-width100">
                        <span class="c-button__text-enabled">
                            <i class="ri-download-2-fill"></i>
                            <span lang="ja">画像として保存する</span>
                            <span lang="en">Save as Image</span>
                        </span>
                        <span class="c-button__text-disabled">
                            <i class="ri-hourglass-line"></i>
                            <span lang="ja">画像生成中</span>
                            <span lang="en">Generating Image</span>
                        </span>
                    </button>
                    
                    <button type="button" onclick="window.print();" class="c-button u-width100">
                        <i class="ri-printer-fill"></i>
                        <span lang="ja">印刷する</span>
                        <span lang="en">Print</span>
                    </button>
                </div>
                
                
