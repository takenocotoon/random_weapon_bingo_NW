import { storageManager } from '../common/_local_storage';
import { getElement } from '../common/function/_get_element';
import { bingoData, BingoData } from './_bingo_data';
import { BingoCenterItem } from './_bingo_center_item'
import { BingoRender } from './_bingo_render';
import { bukiLib, bukiListGrizzco } from './data/_weapons-list';
import { filterBukiList } from './function/_weapons-filter';

class BingoSettings {
    
    restore = () => {
        this.restoreRadio('centerItem', 'settingsCenterItem', (value:string)=>this.applyCenterItem(value));
        this.restoreRadio('bingoCols', 'settingsSize');
        this.restoreRadio('bingoBackground', 'settingsBingoBackground', (value:string)=>this.applyBingoBackground(value));
        this.restoreRadio('theme', 'settingsTheme', (value:string)=>this.applyTheme(value));
        this.restoreRadio('language', 'settingsLanguage', (value:string)=>this.applyLanguage(value));
        
        this.restoreCheckbox('bingoEffect', 'settingsOptions__bingoEffect');
        this.restoreCheckbox('bingoWeaponText', 'settingsOptions__bingoWeaponText',
            (dataKey:'bingoWeaponText', element:HTMLInputElement)=>this.applyCheckboxValue(
                element, dataKey, undefined, 'js-bingo__table', 'js-showWeaponTxt'
            )
        );
        this.restoreCheckbox('weaponGrizzco', 'settingsWeapons__grizzco');
        this.restoreCheckbox('weaponMinor', 'settingsWeapons__minor');
        this.restoreCheckbox('weaponScope', 'settingsWeapons__scope');
        this.restoreCheckbox('weaponHero', 'settingsWeapons__hero');
        
        // const bukiList = filterBukiList(bingoData.weaponGrizzco, bingoData.weaponMinor, bingoData.weaponScope, bingoData.weaponHero);
        bingoSettings.updateWeaponsFilter('js-weaponsNumber-text', 'settingsWeapons');
        BingoRender.renderCenterWeaponSelector('centerGrizzco', bukiListGrizzco.concat());
    }
    
    
    applyBingoSettings = () => {
        const saveObj = {
            centerItem: bingoData.centerItem,
            bingoCols: bingoData.bingoCols,
            bingoRows: bingoData.bingoRows,
            weaponGrizzco: bingoData.weaponGrizzco,
            weaponMinor: bingoData.weaponMinor,
            weaponScope: bingoData.weaponScope,
            weaponHero: bingoData.weaponHero,
        };
        
        // 中央
        const settingsCenterRadios:HTMLInputElement[] = Array.from(document.getElementsByName('settingsCenterItem')) as HTMLInputElement[];
        settingsCenterRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                bingoData.centerItem = selectedValue;
            }
        });
        saveObj.centerItem = bingoData.centerItem;
        
        // 大きさ
        const settingsSizeRadios:HTMLInputElement[] = Array.from(document.getElementsByName('settingsSize')) as HTMLInputElement[];
        settingsSizeRadios.forEach(radio => {
            if (radio.checked) {
                const selectedValue:string = radio.value;
                if (selectedValue == 'all') {
                    bingoData.bingoCols = 7;
                    bingoData.bingoRows = 9;
                } else {
                    bingoData.bingoCols = parseInt(selectedValue);
                    bingoData.bingoRows = parseInt(selectedValue);
                }
            }
        });
        saveObj.bingoCols = bingoData.bingoCols;
        saveObj.bingoRows = bingoData.bingoRows;
        
        // オプション
        const settingsWeaponsCheckbox:HTMLInputElement[] = Array.from(document.getElementsByName('settingsWeapons')) as HTMLInputElement[];
        settingsWeaponsCheckbox.forEach(checkbox => {
            const selectedName:string = checkbox.value;
            let keyName:'weaponGrizzco'|'weaponMinor'|'weaponScope'|'weaponHero' = 'weaponGrizzco';
            switch(selectedName) {
                case 'grizzco':
                    keyName = 'weaponGrizzco';
                    break;
                case 'minor':
                    keyName = 'weaponMinor';
                    break;
                case 'scope':
                    keyName = 'weaponScope';
                    break;
                case 'hero':
                    keyName = 'weaponHero';
                    break;
            }
            bingoData[keyName] = checkbox.checked;
        });
        saveObj.weaponGrizzco = bingoData.weaponGrizzco;
        saveObj.weaponMinor = bingoData.weaponMinor;
        saveObj.weaponScope = bingoData.weaponScope;
        saveObj.weaponHero = bingoData.weaponHero;
        
        storageManager.saveLocalStorageData(saveObj);
    }
    
    
    applyBingoBackground = (value:string, shouldSaveData:boolean=false) => {
        this.applySetting( 'js-bingo__box', 'className', 'js-card__'+value, 'bingoBackground', value, shouldSaveData);
    }
    
    
    applyTheme = (value:string, shouldSaveData:boolean=false) => {
        this.applySetting( document.body, 'className', 'theme-'+value, 'theme', value, shouldSaveData);
    }
    
    
    applyLanguage = (value:string, shouldSaveData:boolean=false) => {
        this.applySetting( document.body, 'lang', value, 'language', value, shouldSaveData);
    }
    
    
    private applySetting = (element:HTMLElement|string, elemKey:'className'|'lang', elmValue:string, dataKey:'bingoBackground'|'theme'|'language', dataValue:string,
        shouldSaveData:boolean=false
    ) => {
        let target:HTMLElement|null;
        target = getElement(element);
        if(!target) return;
        
        target[elemKey] = elmValue;
        bingoData[dataKey] = dataValue;
        if (shouldSaveData) storageManager.saveLocalStorageData(dataValue, undefined, dataKey);
    }
    
    
    private applyCenterItem = (value:string) => {
        if (value.startsWith('weapon')) {
            const itemId = parseInt(value.substring(6));
            const item = bukiLib[itemId];
            let elementId = 'centerWeapon';
            if (itemId >= 20000) elementId = 'centerGrizzco';
            BingoCenterItem.setCenterWeapon(item.lid, [item.ja, item.en], elementId);
        }
    }
    
    
    applyCheckboxValue = (
        inputEle:HTMLInputElement,
        dataKey:'bingoWeaponText'|'bingoEffect',  shouldSaveData:boolean=false,
        element:HTMLElement|string|undefined=undefined, className:string|undefined=undefined,
    ) => {
        if (!bingoData.hasOwnProperty(dataKey)) return;
        
        if (element && className) {
            const target = getElement(element);
            if (!target) return;
            
            if (inputEle.checked) target.classList.add(className);
            else target.classList.remove(className);
        }
        
        bingoData[dataKey] = inputEle.checked;
        
        if (shouldSaveData) storageManager.saveLocalStorageData(inputEle.checked, undefined, dataKey);
    }
    
    
    // ブキ数を数える
    updateWeaponsFilter = (elementId:string, inputName:string) => {
        const targetEle = getElement(elementId);
        const settingsWeaponsCheckboxes:HTMLInputElement[] = Array.from(document.getElementsByName(inputName)) as HTMLInputElement[];
        if ( !targetEle || settingsWeaponsCheckboxes.length != 4 ) return;
        
        const checkedValues = Array.from(settingsWeaponsCheckboxes).map((checkbox) => checkbox.checked);
        const bukiList = filterBukiList(...checkedValues);
        
        targetEle.innerText = '' + bukiList.length;
        
        checkedValues[0] = false;
        const bukiListForSelectBox = filterBukiList(...checkedValues);
        
        BingoRender.renderCenterWeaponSelector('centerWeapon', bukiListForSelectBox);
    }
    
    
    // ラジオボタン復元
    private restoreRadio = ( dataKey:keyof BingoData, radioId:string, settingFunction:Function|undefined=undefined ) => {
        if ( !bingoData.hasOwnProperty(dataKey) ) return;
        
        const radios = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="'+radioId+'"]'));
        for (let index=0; index<radios.length; index++) {
            if (bingoData[dataKey] == radios[index].value) {
                radios[index].checked = true;
            }
        }
        
        if (settingFunction) settingFunction(bingoData[dataKey]);
    }
    
    
    // チェックボックス復元
    private restoreCheckbox = (
        dataKey:'bingoEffect'|'bingoWeaponText'|'weaponGrizzco'|'weaponMinor'|'weaponScope'|'weaponHero',
        checkboxId:string, settingFunction:Function|undefined=undefined ) => {
        if ( !bingoData.hasOwnProperty(dataKey) ) return;
        
        const checkbox: HTMLInputElement = getElement('js-'+checkboxId) as HTMLInputElement;
        if (!checkbox) return;
        checkbox.checked = bingoData[dataKey];
        
        if (settingFunction) settingFunction(dataKey, checkbox);
    }
}
export const bingoSettings = new BingoSettings();
