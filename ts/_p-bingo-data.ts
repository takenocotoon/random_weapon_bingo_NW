import { getLocalStorageData, localStorageData } from './_local-storage';

class BingoData {
    myBingo: {row: number, column: number, item: string, done: boolean}[] = [];
    centerItem:string = 'kuma';
    bingoCols:number = 5;
    bingoRows:number = 5;
    
    weaponGrizzco:boolean = false;
    weaponMinor:boolean = false;
    weaponScope:boolean = false;
    weaponHero:boolean = false;
    
    bingoBackground:string = 'orange';
    bingoEffect:boolean = true;
    bingoWeaponText:boolean = false;
    
    theme:string = '';
    language: string = '';
    
    bingoCount: number = 0;
    doneCount: number = 0;
    
    constructor(data:any = localStorageData) {
        if (data.hasOwnProperty('theme')) {
            this.theme = data.theme;
        }
        if (data.hasOwnProperty('language')) {
            this.language = data.language;
        }
        if (data.hasOwnProperty('bingoBackground')) {
            this.bingoBackground = data.bingoBackground;
        }
        if (data.hasOwnProperty('bingoEffect')) {
            this.bingoEffect = data.bingoEffect;
        }
        if (data.hasOwnProperty('bingoWeaponText')) {
            this.bingoWeaponText = data.bingoWeaponText;
        }
        if (data.hasOwnProperty('myBingo')) {
            this.myBingo = data.myBingo;
        }
        if (data.hasOwnProperty('centerItem')) {
            this.centerItem = data.centerItem;
        }
        if (data.hasOwnProperty('bingoCols')) {
            this.bingoCols = data.bingoCols;
        }
        if (data.hasOwnProperty('bingoRows')) {
            this.bingoRows = data.bingoRows;
        }
        if (data.hasOwnProperty('weaponGrizzco')) {
            this.weaponGrizzco = data.weaponGrizzco;
        }
        if (data.hasOwnProperty('weaponMinor')) {
            this.weaponMinor = data.weaponMinor;
        }
        if (data.hasOwnProperty('weaponScope')) {
            this.weaponScope = data.weaponScope;
        }
        if (data.hasOwnProperty('weaponHero')) {
            this.weaponHero = data.weaponHero;
        }
    }
}
export let bingoData = new BingoData();

export function reload() {
    bingoData = new BingoData(getLocalStorageData());
}
