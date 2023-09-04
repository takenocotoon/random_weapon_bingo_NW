// import { bukiStars } from './buki-stars';
export const localStorageKey = 'buki-bingo';

export function getLocalStorageData(key: string = localStorageKey): any | null {
    const jsonData = localStorage.getItem(key);
    if (jsonData) {
        try {
            const parsedData = JSON.parse(jsonData);
            return { ...parsedData };
        } catch (error) {
            console.error('Error parsing JSON data:', error);
            return {};
        }
    }
    return setLocalStorageData();
}


export function saveLocalStorageData(key: string = localStorageKey, obj: any={}, objKey: string='') {
    try {
        if (objKey === 'myBingo' || objKey === 'bingoWeaponText' || objKey === 'bingoBackground' || objKey === 'theme' || objKey === 'language') {
            localStorageData = getLocalStorageData();
            if (objKey === 'bingoWeaponText') {
                localStorageData[objKey] = Boolean(obj);
            } else {
                localStorageData[objKey] = obj;
            }
            localStorage.setItem(key, JSON.stringify(localStorageData));
        } else if (obj) {
            localStorage.setItem(key, JSON.stringify(obj));
        }
    } catch (error) {
        console.error('Error while saving object to LocalStorage:', error);
    }
}

function setLocalStorageData() {
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
        language: language,
        theme: theme,
        weaponGrizzco: false,
        weaponMinor: false,
        weaponScope: false,
        weaponHero: false,
    };
}

export let localStorageData:{
    myBingo: {row: number, column: number, item: string, done: boolean}[],
    centerItem: string,
    bingoCols: number,
    bingoRows: number,
    bingoBackground: string,
    bingoEffect: boolean,
    bingoWeaponText: boolean,
    theme: string,
    language: string,
    weaponGrizzco: boolean,
    weaponMinor: boolean,
    weaponScope: boolean,
    weaponHero: boolean,
} = getLocalStorageData();

saveLocalStorageData(localStorageKey, localStorageData);
