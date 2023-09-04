import { attachClickHandler, openMenu, openSubMenu, openDialog } from './_common';
import { bingoForm } from './_p-bingo-form';
import { bingo } from './_p-bingo';
import { saveToSlot, loadFromSlot, exportFile, importFile } from './_backup';
import { captureImage } from './_image';
import { bingoData } from './_p-bingo-data';

// 横幅最大をWindowの縦サイズにする
function setWindowSize() {
    const windowSize = window.innerHeight;
    const contentsEle:HTMLElement|null = document.getElementById('p-contents');
    if (contentsEle) contentsEle.style.cssText = 'max-width : ' + (windowSize * 0.7) + 'px;';
}

function main() {
    // メニュー開閉
    attachClickHandler('js-hamburger', openMenu);
    const subMenus = document.getElementsByClassName('js-submenu');
    Array.from(subMenus).forEach(target => {
        attachClickHandler(target.id, () => openSubMenu(target));
    });
    
    // ウィンドウサイズに合わせてメイン空間を設定
    setWindowSize();
    
    // ブキ選択メニュー
    bingoForm.addWeaponsOption();
    attachClickHandler('js-settingsCenter--centerGrizzco', () => openDialog('js-centerGrizzcoDialog'));
    attachClickHandler('js-settingsCenter--centerWeapon', () => openDialog('js-centerWeaponDialog'));
    
    // 設定保存ボタン
    const setButtons = document.getElementsByClassName('js-set');
    Array.from(setButtons).forEach(target => {
        attachClickHandler(target.id, bingoForm.set);
    });
    
    // カードデザイン変更
    const settingsBingoThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsBingoTheme"]');
    settingsBingoThemeRadios.forEach(radio => {
        attachClickHandler(radio.id, () => bingoForm.applyBingoTheme(radio.value, true));
    });
    
    // テーマの変更
    const settingsThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsTheme"]');
    settingsThemeRadios.forEach(radio => {
        attachClickHandler(radio.id, () => bingoForm.applyTheme(radio.value, true));
    });
    
    // 言語の変更
    const languageRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsLanguage"]');
    languageRadios.forEach(radio => {
        attachClickHandler(radio.id, () => bingoForm.applyLanguage(radio.value, true));
    });
    
    // ビンゴ再生成
    attachClickHandler('js-createCard-btn', bingoForm.regenerateBingoCard);
    attachClickHandler('js-createCard-btn-t', bingoForm.regenerateBingoCard);
    attachClickHandler('js-createCard-btn-b', bingoForm.regenerateBingoCard);
    
    // エフェクトのオンオフ、テキスト表示のオンオフを即座に反映させる
    attachClickHandler('js-settingsOption--effect--label', () => bingoForm.applyCheckboxValue('bingoEffect', 'settingsOption--effect'));
    attachClickHandler('js-settingsOption--text--label', () => bingoForm.applyCheckboxValue('bingoWeaponText', 'settingsOption--text'));
    
    // フィルタによるブキの増減があればブキ数とブキ選択ボックスの内容を変更
    const setFilterRadios = document.querySelectorAll('[id^="js-settingsWeapons--"]');
    Array.from(setFilterRadios).forEach(target => {
        attachClickHandler(target.id, bingoForm.updateFilteredWeaponsAndRender);
    });
    
    // バックアップ機能
    attachClickHandler('js-saveDataSlot-btn', () => saveToSlot(bingoData.language));
    attachClickHandler('js-loadDataSlot-btn', () => loadFromSlot(bingoData.language, bingoForm.reloadAndRestore));
    attachClickHandler('js-saveJson-btn', () => exportFile('buki-bingo_export'));
    attachClickHandler('js-loadJson-btn', () => importFile(bingoData.language, bingoForm.reloadAndRestore));
    
    // 画像キャプチャ
    attachClickHandler('js-download-btn', () => captureImage('p-bingo-card-box', 'bingo'));
    
    bingo.renderBingoCard();
    bingoForm.restore();
    
    // PWA設定
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker の登録に成功しました。スコープ: ', registration.scope);
        }).catch(function(error) {
            console.log('ServiceWorker の登録に失敗しました。', error);
        });
    }
}
window.onload = main;
