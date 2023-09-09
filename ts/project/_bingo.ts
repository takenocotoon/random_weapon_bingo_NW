import { cardType } from '../types/_buki-bingo-lib';
import { storageManager } from '../common/_local_storage';
import { Backup } from '../common/_backup';
import { ImageExporter } from '../common/_image_exporter';
import { MenuManager } from '../common/_menu_manager';
import { attachHandler } from '../common/function/_attach_handler';
import { getElement } from '../common/function/_get_element';
import { Buki } from './data/_weapons-list';
import { bingoData } from './_bingo_data';
import { bingoSettings } from './_bingo_settings';
import { BingoRender } from './_bingo_render';
import { BingoCreator } from './_bingo_creator';
import { checkBingo } from './function/_check_bingo';
import { playBingoEffect } from './function/_play_bingo_effect';

class Bingo {
    card: cardType[]|undefined;
    centerItemObj: Buki|undefined;
    
    initBingo = () => {
        // 初期化・復元
        bingoData.doneCount = BingoRender.renderBingoCard(this.click, 'js-bingo__table');
        bingoData.bingoCount = checkBingo();
        bingoSettings.restore();
        
        // クリックイベント登録
        //  ビンゴ再生成
        const createBingoButtons = Array.from(document.getElementsByClassName('js-createBingoCard__buttons'));
        createBingoButtons.forEach(target => {
            attachHandler(target as HTMLElement, this.regenerate);
        });
        
        // オプション
        attachHandler('js-settingsOptions__bingoWeaponText', ()=>bingoSettings.applyCheckboxValue(
            getElement('js-settingsOptions__bingoWeaponText')as HTMLInputElement, 'bingoWeaponText', true, 'js-bingo__table', 'js-showWeaponTxt'
        ), 'change');
        attachHandler('js-settingsOptions__bingoEffect', ()=>bingoSettings.applyCheckboxValue(
            getElement('js-settingsOptions__bingoEffect')as HTMLInputElement, 'bingoEffect', true));
        
        // フィルタによるブキの増減があればブキ数とブキ選択ボックスの内容を変更
        const setFilterRadios = document.getElementsByName('settingsWeapons');
        Array.from(setFilterRadios).forEach(target => {
            attachHandler(target as HTMLInputElement, ()=>bingoSettings.updateWeaponsFilter('js-weaponsNumber-text', 'settingsWeapons'));
        });
        
        // カードデザイン変更
        const settingsBingoThemeRadios:HTMLInputElement[] = Array.from(document.getElementsByName('settingsBingoBackground')) as HTMLInputElement[];
        settingsBingoThemeRadios.forEach(radio => {
            attachHandler(radio.id, () => bingoSettings.applyBingoBackground(radio.value, true));
        });
        
        // テーマの変更
        const settingsThemeRadios:HTMLInputElement[] = Array.from(document.getElementsByName('settingsTheme')) as HTMLInputElement[];
        settingsThemeRadios.forEach(radio => {
            attachHandler(radio.id, () => bingoSettings.applyTheme(radio.value, true));
        });
        
        // 言語の変更
        const languageRadios:HTMLInputElement[] = Array.from(document.getElementsByName('settingsLanguage')) as HTMLInputElement[];
        languageRadios.forEach(radio => {
            attachHandler(radio.id, () => bingoSettings.applyLanguage(radio.value, true));
        });
        
        // ブキ選択メニュー
        attachHandler('js-settingsCenterItem__centerGrizzco-label', () => MenuManager.openDialog('js-centerGrizzco__dialog'));
        attachHandler('js-settingsCenterItem__centerWeapon-label', () => MenuManager.openDialog('js-centerWeapon__dialog'));
        
        // バックアップ機能
        attachHandler('js-saveDataSlot-button', () => Backup.saveToSlot(bingoData.language));
        attachHandler('js-loadDataSlot-button', () => Backup.loadFromSlot(bingoData.language, this.reloadSettings));
        attachHandler('js-saveJson-button', () => Backup.exportFile(bingoData.language, 'buki-bingo_export'));
        attachHandler('js-loadJson-button', () => Backup.importFile(bingoData.language, this.reloadSettings));
        
        // 画像キャプチャ
        attachHandler('js-downloadImg-button', () => ImageExporter.exportImage('js-bingo__box', 'bingo', 'js-downloadImg-button'));
    }
    
    private reloadSettings = () => {
        bingoData.reloadLocalStorage();
        bingoData.doneCount = BingoRender.renderBingoCard(this.click, 'js-bingo__table');
        bingoData.bingoCount = checkBingo();
        bingoSettings.restore();
    }
    
    
    // ビンゴクリック
    private click( element:HTMLElement, itemIndex:number, ) {
        if ( element.classList.toggle('is-done') ) {
            bingoData.myBingo[itemIndex].done = true;
            bingoData.doneCount++;
        } else {
            bingoData.myBingo[itemIndex].done = false;
            bingoData.doneCount--;
        }
        
        const bingoCount = checkBingo();
        
        // BINGO演出 
        if (bingoData.bingoEffect && bingoCount > bingoData.bingoCount) {
            playBingoEffect('js-confetti');
            if (bingoData.theme != 'transparent' && bingoData.theme != 'green' && bingoData.doneCount >= bingoData.myBingo.length) {
                playBingoEffect('js-confetti');
                MenuManager.openDialog('js-compleat__dialog');
                playBingoEffect('js-confetti');
            }
        }
        
        bingoData.bingoCount = bingoCount;
        
        storageManager.saveLocalStorageData(bingoData.myBingo, undefined, 'myBingo');
    }
    
    
    private regenerate = ( doneCount=bingoData.doneCount, language=bingoData.language, ) => {
        if ( doneCount > 0 ) {
            let result = false;
            if (language == 'ja') {
                result = window.confirm('現在の進行状況は消えますが、本当にビンゴカードを作り直しても良いですか？');
            } else if (language == 'en') {
                result = window.confirm('The current progress will be lost. Are you sure you want to regenerate the Bingo card?');
            }
            
            if (!result) return;
        }
        bingoSettings.applyBingoSettings();
        bingoData.myBingo = BingoCreator.createNewBingo();
        bingoData.doneCount = BingoRender.renderBingoCard(this.click, 'js-bingo__table');
        bingoData.bingoCount = checkBingo();
        MenuManager.closeMenu();
    }
}

export let bingo = new Bingo();
