
<main>
    <canvas id="js-confetti"></canvas>
    <div id="p-contents">
        <article>
            <section>
                <button type="button" id="js-createCard-btn" class="c-wide-btn c-no-print">
                    <span lang="ja">ビンゴカードを生成する</span>
                    <span lang="en">Generate the Bingo Card</span>
                </button>
                <div class="c-no-print">
                    <?php 
                        $settingsOption = array(
                            'effect' => ['ビンゴ演出', 'Bingo Effects'],
                            'text' => ['ブキ名表示', 'Display Weapon Name'],
                        );
                        foreach ($settingsOption as $id => $name) {
                            echo "                    ";
                            echo "<input type=\"checkbox\" name=\"settingsOption--{$id}\" value=\"true\" id=\"js-settingsOption--{$id}\"";
                            if ($id=='effect') echo " checked";
                            echo ">";
                            echo "<label for=\"js-settingsOption--{$id}\" id=\"js-settingsOption--{$id}--label\">";
                            echo "<span lang=\"ja\">{$name[0]}</span>";
                            echo "<span lang=\"en\">{$name[1]}</span>";
                            echo "</label>\n";
                        } ?>
                </div>
                <div id="p-bingo-box">
                    <div id="p-bingo-card-box">
                        <div id="p-bingo-card-table">
                        </div>
                    </div>
                    <div id="p-bingo-message" class="c-no-print">
                        <div id="js-bingo-message"></div>
                        <div id="js-reach-message"></div>
                    </div>
                </div>
                <div id="p-tools-footer" class="c-no-print">
                        <button type="button" id="js-download-btn">
                        <span id="js-download-btn--before">
                            <i class="ri-download-2-fill"></i>
                            <span lang="ja">画像として保存する</span>
                            <span lang="en">Save as Image</span>
                        </span>
                        <span id="js-download-btn--processing" style="display:none;">
                            <i class="ri-hourglass-line"></i>
                            <span lang="ja">画像生成中</span>
                            <span lang="en">Generating Image</span>
                        </span>
                    </button>
                    
                    <button type="button" onclick="window.print();">
                        <i class="ri-printer-fill"></i>
                        <span lang="ja">印刷する</span>
                        <span lang="en">Print</span>
                    </button>
                </div>
            </section>
        </article>
    </div>
</main>
<dialog id="js-centerGrizzcoDialog">
    <p class="p-menu-form">
        <div>
            <span lang="ja">クマブキ</span>
            <span lang="en">Grizzco Weapon</span>
        </div>
        <div id="p-centerGrizzcoBox" class="p-bukiBox">
            
        </div>
    </p>
    <form method="dialog">
        <button class="c-close"><i class="ri-close-fill"></i></button>
    </form>
</dialog>
<dialog id="js-centerWeaponDialog">
    <p class="p-menu-form">
        <div>
            <span lang="ja">お気に入りブキ</span>
            <span lang="en">Preferred Weapon</span>
        </div>
        <div id="p-centerWeaponBox" class="p-bukiBox">
            
        </div>
    </p>
    <form method="dialog">
        <button class="c-close"><i class="ri-close-fill"></i></button>
    </form>
</dialog>

