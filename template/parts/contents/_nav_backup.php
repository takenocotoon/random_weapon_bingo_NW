            <div class="p-nav__submenu">
                <div class="p-menuForm">
                    <div class="p-menuForm__title">
                        <span lang="ja">データ保存スロット</span>
                        <span lang="en">Data Storage Slots</span>
                    </div>
                    <?php 
                        $saveDataSlot = array(
                            '1' => '1',
                            '2' => '2',
                            '3' => '3',
                        );
                        foreach ($saveDataSlot as $id => $name) {
                            echo "<input type=\"radio\" name=\"saveDataSlot\" value=\"{$id}\" id=\"js-saveDataSlot--{$id}\"";
                            if ($id=='ja') { echo " checked"; };
                            echo " class=\"c-radio__hidden\">";
                            echo "<label for=\"js-saveDataSlot--{$id}\" class=\"c-radio__label\">{$name}</label>";
                        } ?>
                        <button type="button" id="js-saveDataSlot-button" class="c-button">
                            <span lang="ja">保存</span>
                            <span lang="en">Save</span>
                        </button>
                        <button type="button" id="js-loadDataSlot-button" class="c-button">
                            <span lang="ja">復元</span>
                            <span lang="en">Restore</span>
                        </button>
                </div>
                <div class="p-menuForm">
                    <div class="p-menuForm__title">
                        Export / Import
                    </div>
                        <button type="button" id="js-saveJson-button" class="c-button">
                            <span lang="ja">エクスポート</span>
                            <span lang="en">Export</span>
                        </button>
                        <input type="file" id="js-loadJson-input" class="u-hidden"><button type="button" id="js-loadJson-button" class="c-button">
                            <span lang="ja">インポート</span>
                            <span lang="en">Import</span>
                        </button>
                </div>
            </div>
