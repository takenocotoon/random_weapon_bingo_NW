import { bingoType } from '../types/_buki-bingo-lib';
import { storageManager } from '../common/_local_storage';

export class BingoData {
    myBingo: bingoType[] = [];
    centerItem:string = 'kuma';
    bingoCols:number = 5;
    bingoRows:number = 5;
    
    weaponGrizzco:boolean = false;
    weaponMinor:boolean = false;
    weaponScope:boolean = false;
    weaponHero:boolean = false;
    
    bingoBackground:string = 'salmonrun';
    bingoEffect:boolean = true;
    bingoWeaponText:boolean = false;
    
    theme:string = 'default';
    language: string = '';
    
    bingoCount: number = 0;
    doneCount: number = 0;
    
    constructor(data:any = storageManager.getLocalStorageData()) {
        Object.assign(this, data);
        
        if (!this.language) {
            let language = (window.navigator.languages && window.navigator.languages[0]) || window.navigator.language;
            if (language == 'ja' || language == 'Ja' || language == 'ja-JP' || language == 'japanese' || language == 'ja-jp') {
                language = 'ja';
            } else {
                language = 'en';
            }
            this.language = language;
        }
        
        storageManager.saveLocalStorageData(this);
    }
    
    reloadLocalStorage = ()  => {
        const data = storageManager.getLocalStorageData();
        Object.assign(this, data);
    }
}
export let bingoData = new BingoData();
