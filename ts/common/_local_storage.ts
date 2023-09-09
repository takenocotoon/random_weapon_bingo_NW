import { localStorageType } from '../types/_buki-bingo-lib';

const localStorageKey = 'buki-bingo';

class StorageManager {
    key: string = localStorageKey;
    data: localStorageType;
    constructor() {
        this.data = this.getLocalStorageData();
    }
    
    getLocalStorageData = (key: string = localStorageKey):localStorageType => {
        const jsonData = localStorage.getItem(key);
        if (jsonData) {
            try {
                const parsedData = JSON.parse(jsonData);
                return { ...parsedData };
            } catch (error) {
                console.error('Error parsing JSON data:', error);
                return this.convertOldData();
            }
        }
        return this.convertOldData();
    }
    
    saveLocalStorageData = (data:any, key:string=localStorageKey, objKey='') => {
        try {
            const currentData = this.getLocalStorageData();
            let newData:{[key: string]: any} = {};
            if (objKey) {
                if (currentData.hasOwnProperty(objKey)) {
                    newData[objKey] = data;
                    newData = Object.assign(currentData, newData);
                } else throw new Error('キーかデータが間違っています。');
            } else {
                newData = data;
                newData = Object.assign(currentData, newData);
            }
            localStorage.setItem(key, JSON.stringify(newData));
        } catch (error) {
            console.error('Error while saving object to LocalStorage:', error);
        }
    }
    
    private convertOldData = ():localStorageType => {
        const myBingoStr = localStorage.getItem('mybingo');
        let centerItem = localStorage.getItem('bingo_center');
        let bingoSize = parseInt(localStorage.getItem('bingo_size') as string);
        let bingoBackground = localStorage.getItem('bingo_background');
        const bingoEffectStr = localStorage.getItem('bingo_effect');
        const bingoTextStr = localStorage.getItem('bingo_text');
        localStorage.removeItem('mybingo');
        localStorage.removeItem('bingo_center');
        localStorage.removeItem('bingo_size');
        localStorage.removeItem('bingo_background');
        localStorage.removeItem('bingo_effect');
        localStorage.removeItem('bingo_text');
        
        let bingoCols = 5, bingoRows = 5, theme = 'default', bingoEffect:boolean, bingoText:boolean;
        let myBingo:any[] = [];
        if (myBingoStr) {
            try {
                myBingo = JSON.parse(myBingoStr); 
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }
        }
        if (!centerItem) centerItem = 'kuma';
        if (bingoSize) {
            bingoCols = bingoSize;
            bingoRows = bingoSize;
        }
        if (bingoBackground == 'green' || bingoBackground == 'transparent') {
            bingoBackground = 'simple';
            theme = bingoBackground;
        }
        if (bingoBackground == 'ikatako') {
            bingoBackground = 'gray';
        } else if (!bingoBackground || bingoBackground == 'salmon-orange') {
            bingoBackground = 'orange';
        }
        if (bingoEffectStr == 'on') bingoEffect = true;
        else bingoEffect = false;
        if (bingoTextStr == 'on') bingoText = true;
        else bingoText = false;
        
        let language = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
        if (language == 'ja' || language == 'Ja' || language == 'ja-JP' || language == 'japanese' || language == 'ja-jp') {
            language = 'ja';
        } else {
            language = 'en';
        }
        
        return {
            myBingo: myBingo,
            centerItem: centerItem,
            bingoCols: bingoCols,
            bingoRows: bingoRows,
            bingoBackground: bingoBackground,
            bingoEffect: bingoEffect,
            bingoWeaponText: bingoText,
            language: '',
            theme: theme,
            weaponGrizzco: false,
            weaponMinor: false,
            weaponScope: false,
            weaponHero: false,
        };
    }
}
export const storageManager = new StorageManager();
