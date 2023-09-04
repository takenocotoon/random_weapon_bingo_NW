import { bingoData, reload } from './_p-bingo-data';
import { closeMenu } from './_common';
import { bukiListNormal, bukiListGrizzco, Buki, bukiListAll, freeItemsList } from './_weapons-list';
import { bingo } from './_p-bingo';
import { saveLocalStorageData, localStorageData, localStorageKey } from './_local-storage';
import { filterBukiList } from './_weapons-filter';

class BingoForm {
    
    // フォームの内容を復元
    restore = () => {
        this.restoreRadio('centerItem', 'settingsCenter');
        this.restoreRadio('bingoCols', 'settingsSize');
        this.restoreRadio('bingoBackground', 'settingsBingoTheme');
        this.restoreCheckbox('bingoEffect', 'settingsOption--effect');
        this.restoreCheckbox('bingoWeaponText', 'settingsOption--text');
        this.restoreCheckbox('weaponGrizzco', 'settingsWeapons--grizzco');
        this.restoreCheckbox('weaponMinor', 'settingsWeapons--minor');
        this.restoreCheckbox('weaponScope', 'settingsWeapons--scope');
        this.restoreCheckbox('weaponHero', 'settingsWeapons--hero');
        this.updateFilteredWeaponsAndRender();
        this.restoreRadio('theme', 'settingsTheme');
        this.restoreRadio('language', 'settingsLanguage');
        
        this.applySettingsFromForm(true);
    }
    
    
    // setボタン
    set = () => {
        this.applySettingsFromForm();
        this.save();
        closeMenu();
    }
    
    
    reloadAndRestore = () => {
        reload();
        bingo.renderBingoCard();
        bingoForm.restore();
    }
    
    
    // ビンゴ再生成ボタン
    regenerateBingoCard = () => {
        if (bingoData.doneCount>0) {
            let result = false;
            if (bingoData.language == 'ja') {
                result = window.confirm('現在の進行状況は消えますが、本当にビンゴカードを作り直しても良いですか？');
            } else if (bingoData.language == 'en') {
                result = window.confirm('The current progress will be lost. Are you sure you want to regenerate the Bingo card?');
            }
            
            if (!result) return;
        }
        
        this.applySettingsFromForm(true);
        bingo.createBingoCard();
        this.save();
        bingo.renderBingoCard();
        closeMenu();
    }
    
    
    // ブキ数を数える
    updateFilteredWeaponsAndRender = () => {
        const targetEle : HTMLElement|null = document.getElementById('js-weapons');
        const settingsWeaponsGrizzcoCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--grizzco') as HTMLInputElement;
        const settingsWeaponsMinorCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--minor') as HTMLInputElement;
        const settingsWeaponsScopeCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--scope') as HTMLInputElement;
        const settingsWeaponsHeroCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--hero') as HTMLInputElement;
        if (!targetEle || !settingsWeaponsGrizzcoCheckbox || !settingsWeaponsMinorCheckbox || !settingsWeaponsScopeCheckbox || !settingsWeaponsHeroCheckbox) return;
        
        const items = filterBukiList(
            settingsWeaponsGrizzcoCheckbox.checked,
            settingsWeaponsMinorCheckbox.checked,
            settingsWeaponsScopeCheckbox.checked,
            settingsWeaponsHeroCheckbox.checked,
        );
        
        targetEle.innerText = '' + items.length;
        const itemsForSelectBox = filterBukiList(
            false,
            settingsWeaponsMinorCheckbox.checked,
            settingsWeaponsScopeCheckbox.checked,
            settingsWeaponsHeroCheckbox.checked,
        );
        
        this.renderWeapons(itemsForSelectBox, 'centerWeapon');
    }
    
    
    // チェックボックスの内容を即座に反映させる
    applyCheckboxValue = (key: string, checkboxId:string, obj: any = bingoData) => {
        if (!obj.hasOwnProperty(key)) return;
        const checkbox: HTMLInputElement = document.getElementById('js-'+checkboxId) as HTMLInputElement;
        if (checkbox) obj[key] = !checkbox.checked;
        if (key=='bingoWeaponText') {
            const tableElement:HTMLElement|null = document.getElementById('p-bingo-card-table');
            if (!tableElement) return;
            tableElement.classList.toggle('is-text-on');
        }
        saveLocalStorageData(localStorageKey, obj[key], key);
    }
    
    
    // カードデザインの変更
    applyBingoTheme = (value: string, shouldSaveData: boolean = false, obj: any = bingoData) => {
        const bingoBox =  document.getElementById('p-bingo-card-box');
        if (!bingoBox) return;
        bingoBox.className = 'card-'+value;
        obj.bingoBackground = value;
        if (shouldSaveData) saveLocalStorageData(localStorageKey, obj.bingoBackground, 'bingoBackground');
    }
    
    
    // カラーテーマの変更
    applyTheme = (value: string, shouldSaveData: boolean = false, obj: any = bingoData) => {
        document.body.className = 'theme-'+value;
        obj.theme = value;
        if (shouldSaveData) saveLocalStorageData(localStorageKey, obj.theme, 'theme');
    }
    
    
    // 言語の変更
    applyLanguage = (value: string, shouldSaveData: boolean = false, obj: any = bingoData) => {
        document.body.lang = value;
        obj.language = value;
        if (shouldSaveData) saveLocalStorageData(localStorageKey, obj.language, 'language');
    }
    
    
    // 保存
    private save = () => {
        saveLocalStorageData(localStorageKey, {
            myBingo: bingoData.myBingo,
            centerItem: bingoData.centerItem,
            bingoCols: bingoData.bingoCols,
            bingoRows: bingoData.bingoRows,
            bingoBackground: bingoData.bingoBackground,
            bingoEffect: bingoData.bingoEffect,
            bingoWeaponText: bingoData.bingoWeaponText,
            theme: bingoData.theme,
            language: bingoData.language,
            weaponGrizzco: bingoData.weaponGrizzco,
            weaponMinor: bingoData.weaponMinor,
            weaponScope: bingoData.weaponScope,
            weaponHero: bingoData.weaponHero,
        })
    }
    
    
    // ラジオボタン復元
    private restoreRadio = (key: string, radioId: string, obj: any = bingoData) => {
        if (!obj.hasOwnProperty(key)) return;
        if (key=='centerItem' && obj[key].startsWith('weapon')) {
            const itemId = parseInt(obj[key].substring(6));
            const item = bukiListAll.concat(bukiListGrizzco).concat(freeItemsList).filter(item => item.lid === itemId)[0];
            let elementId = 'centerWeapon';
            if (itemId >= 20000) elementId = 'centerGrizzco';
            this.setCenterWeapon(item.id, item.lid, [item.ja, item.en], elementId);
        }
        const radios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+radioId+'"]'));
        for (let index=0; index<radios.length; index++) {
            if (obj[key] == radios[index].value) {
                radios[index].checked = true;
            }
        }
    }
    
    
    // チェックボックス復元
    private restoreCheckbox = (key: string, checkboxId:string, obj: any = bingoData) => {
        if (!obj.hasOwnProperty(key)) return;
        
        const checkbox: HTMLInputElement = document.getElementById('js-'+checkboxId) as HTMLInputElement;
        
        if (!obj[key]) {
            checkbox.checked = false;
            if (key=='bingoWeaponText') {
                const tableElement:HTMLElement|null = document.getElementById('p-bingo-card-table');
                if (!tableElement) return;
                if (tableElement.classList.contains('is-text-on')) tableElement.classList.remove('is-text-on');
            }
        } else {
            checkbox.checked = true;
            if (key=='bingoWeaponText') {
                const tableElement:HTMLElement|null = document.getElementById('p-bingo-card-table');
                if (!tableElement) return;
                if (!tableElement.classList.contains('is-text-on')) tableElement.classList.add('is-text-on');
            }
        }
    }
    
    
    applySettingsFromForm = (skipConfirmation:boolean = false) => {
        let isChangedBingo = false;
        
        // 中央
        const settingsCenterRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsCenter"]');
        settingsCenterRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                if (bingoData.centerItem != selectedValue) isChangedBingo = true;
                bingoData.centerItem = selectedValue;
            }
        });
        
        // 大きさ
        const settingsSizeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsSize"]');
        settingsSizeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                if (bingoData.bingoCols != parseInt(selectedValue) && bingoData.bingoRows != parseInt(selectedValue)) isChangedBingo = true;
                if (selectedValue == 'all') {
                    bingoData.bingoCols = 7;
                    bingoData.bingoRows = 9;
                } else {
                    bingoData.bingoCols = parseInt(selectedValue);
                    bingoData.bingoRows = parseInt(selectedValue);
                }
            }
        });
        
        // ビンゴ背景
        const settingsBingoThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsBingoTheme"]');
        settingsBingoThemeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                this.applyBingoTheme(selectedValue);
            }
        });
        
        // 対象ブキ
        // クマブキ
        const settingsWeaponsGrizzcoCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--grizzco') as HTMLInputElement;
        if (settingsWeaponsGrizzcoCheckbox) {
            if (bingoData.weaponGrizzco != settingsWeaponsGrizzcoCheckbox.checked) isChangedBingo = true;
            if (settingsWeaponsGrizzcoCheckbox.checked) {
                bingoData.weaponGrizzco = true;
            } else {
                bingoData.weaponGrizzco = false;
            }
        }
        // マイナー
        const settingsWeaponsMinorCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--minor') as HTMLInputElement;
        if (bingoData.weaponMinor != settingsWeaponsMinorCheckbox.checked) isChangedBingo = true;
        if (settingsWeaponsMinorCheckbox.checked) {
            bingoData.weaponMinor = true;
        } else {
            bingoData.weaponMinor = false;
        }
        // スコープ
        const settingsWeaponsScopeCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--scope') as HTMLInputElement;
        if (bingoData.weaponScope != settingsWeaponsScopeCheckbox.checked) isChangedBingo = true;
        if (settingsWeaponsScopeCheckbox.checked) {
            bingoData.weaponScope = true;
        } else {
            bingoData.weaponScope = false;
        }
        // ヒーロー
        const settingsWeaponsHeroCheckbox: HTMLInputElement = document.getElementById('js-settingsWeapons--hero') as HTMLInputElement;
        if (bingoData.weaponHero != settingsWeaponsHeroCheckbox.checked) isChangedBingo = true;
        if (settingsWeaponsHeroCheckbox.checked) {
            bingoData.weaponHero = true;
        } else {
            bingoData.weaponHero = false;
        }
        
        // カラーテーマ
        const settingsThemeRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsTheme"]');
        settingsThemeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                this.applyTheme(selectedValue);
            }
        });
        
        // 言語
        const languageRadios = document.querySelectorAll<HTMLInputElement>('input[name="settingsLanguage"]');
        languageRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                this.applyLanguage(selectedValue);
            }
        });
        
        if (isChangedBingo && !skipConfirmation) {
            let result = false;
            if (bingoData.language == 'ja') {
                result = window.confirm('この設定でビンゴを作り直しますか？');
            } else if (bingoData.language == 'en') {
                result = window.confirm('Do you want to recreate the bingo with this setting?');
            }
            
            if (result) {
                bingo.createBingoCard();
                bingo.renderBingoCard();
            }
        }
    }
    
    
    // 中央ブキを選択
    setCenterWeapon = (id:number, lid:number, name:string[], elementId:string) => {
        const inputEle: HTMLInputElement|null = document.getElementById('js-settingsCenter--'+elementId) as HTMLInputElement;
        const labelEle: HTMLLabelElement|null = document.getElementById('js-settingsCenter--'+elementId+'-label') as HTMLLabelElement;
        const dialogEle: HTMLDialogElement|null = document.getElementById('js-'+elementId+'Dialog') as HTMLDialogElement;
        if (!inputEle || !labelEle || !dialogEle) return;
        
        const spanJaEle: HTMLSpanElement = document.createElement('span');
        spanJaEle.lang = 'ja';
        const spanEnEle: HTMLSpanElement = document.createElement('span');
        spanEnEle.lang = 'en';
        
        inputEle.value = 'weapon' + lid;
        
        labelEle.innerText = '';
        spanJaEle.innerHTML = name[0];
        spanEnEle.innerHTML = name[1];
        labelEle.appendChild(spanJaEle);
        labelEle.appendChild(spanEnEle);
        dialogEle.close();
    }
    
    
    // ブキ選択用フォーム
    addWeaponsOption = () => {
        let bukiList = filterBukiList(bingoData.weaponGrizzco, bingoData.weaponMinor, bingoData.weaponScope, bingoData.weaponHero);
        this.renderWeapons(bukiList, 'centerWeapon');
        this.renderWeapons(bukiListGrizzco.concat(), 'centerGrizzco');
    }
    
    
    renderWeapons = (list:Buki[], elementId:string) => {
        const boxEle: HTMLElement| null = document.getElementById('p-'+elementId+'Box');
        if (!boxEle) return;
        boxEle.innerText = '';
        const boxTrTemplateEle: HTMLDivElement = document.createElement('div');
        boxTrTemplateEle.className = 'p-tr';
        const boxTdTemplateEle: HTMLDivElement = document.createElement('div');
        boxTdTemplateEle.className = 'p-td';
        const weaponTemplateEle: HTMLDivElement = document.createElement('div');
        const weaponImageTemplateEle: HTMLImageElement = document.createElement('img');
        
        // 縦横サイズ
        const windowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
            aspectRatio: window.innerWidth / window.innerHeight,
        };
        let numCols: number = 1;
        for (numCols=1; ; numCols++) {
            if (numCols / (list.length / numCols) > windowSize.aspectRatio ) { break };
        }
        if (numCols<4) numCols = 4;
        let numRows: number = Math.ceil(list.length / numCols);
        
        // 描画
        let index: number = 0;
        for (let row=0; row<numRows; row++) {
            const boxTrEle: HTMLDivElement = boxTrTemplateEle.cloneNode(true) as HTMLDivElement;
            
            for (let col=0; col<numCols; col++) {
                const weaponEle: HTMLDivElement = weaponTemplateEle.cloneNode(true) as HTMLDivElement;
                const weaponImageEle: HTMLImageElement = weaponImageTemplateEle.cloneNode(true) as HTMLImageElement;
                // const weaponStarEle: HTMLSpanElement = weaponStarTemplateEle.cloneNode(true) as HTMLSpanElement;
                
                weaponImageEle.src = './img/weapons/--.webp';
                if (index < list.length) {
                    const weaponId = list[index]['id'];
                    const weaponLid = list[index]['lid'];
                    const weaponJa = list[index]['ja'];
                    const weaponEn = list[index]['en'];
                    
                    weaponImageEle.src = './img/weapons/' + weaponId + '.webp';
                    if (bingoData.language == 'en') {
                        weaponImageEle.alt = weaponEn;
                        weaponEle.title = weaponEn;
                    } else {
                        weaponImageEle.alt = weaponJa;
                        weaponEle.title = weaponJa;
                    }
                    
                    weaponEle.classList.add('p-td');
                    weaponEle.id = 'js-weapon-' + weaponId;
                    // weaponEle.style.backgroundImage = 'url(./img/weapons/' + weaponsList[index]['id'] + '.webp)';
                    
                    // if (bukiStars.markedWeapons.hasOwnProperty(weaponId) && Number.isInteger(bukiStars.markedWeapons[weaponId]) && bukiStars.markedWeapons[weaponId] <= 5) {
                    //     weaponEle.classList.add('p-done');
                    //     weaponEle.classList.add('p-done--'+bukiStars.markedWeapons[weaponId]);
                    //     // weaponStarEle.innerText = '★'.repeat(this.markedWeapons[weaponsList[index]['id']]);
                    // }
                    
                    // const currentIndex = index;
                    weaponEle.addEventListener('click', () => this.setCenterWeapon(weaponId, weaponLid, [weaponJa, weaponEn], elementId));
                }
                
                weaponEle.appendChild(weaponImageEle);
                // weaponEle.appendChild(weaponStarEle);
                boxTrEle.appendChild(weaponEle);
                
                index++;
            }
            boxEle.appendChild(boxTrEle);
        }
    }
}
export const bingoForm = new BingoForm();
