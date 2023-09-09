import { storageManager } from '../common/_local_storage';
import { Buki, freeItemsList, bukiLib } from "./data/_weapons-list";
import { filterBukiList } from "./function/_weapons-filter";
import { bingoData } from "./_bingo_data";
import { bingoObjType } from "../types/_buki-bingo-lib";

export class BingoCreator {
    static createNewBingo = (
        bukiList:Buki[]=filterBukiList(bingoData.weaponGrizzco, bingoData.weaponMinor, bingoData.weaponScope, bingoData.weaponHero),
        centerItem:string=bingoData.centerItem,
        bingoRows:number=bingoData.bingoRows,
        bingoCols:number=bingoData.bingoCols
    ):bingoObjType[] => {
        const newBingo:bingoObjType[] = [];
        // 中央マス決定
        let centerItemObj = freeItemsList[0];
        if ( centerItem.substring(0,6) == 'weapon' ) {
            const centerWeaponLid:number = parseInt(centerItem.substring(6));
            centerItemObj = bukiLib[centerWeaponLid];
            bukiList = bukiList.filter(buki => buki.lid !== centerWeaponLid);
            
        } else if (centerItem == 'random') {
            centerItemObj = bukiList.splice(Math.floor(Math.random() * bukiList.length), 1)[0];
            
        } else if (centerItem == 'squid') {
            centerItemObj = freeItemsList[1];
        }
        
        // 足りないマスをfreeで埋める
        while (bukiList.length < bingoRows*bingoCols - 1) {
            if (centerItem == 'squid' || centerItemObj.lid % 10 !== 0) bukiList.push(freeItemsList[1]);
            else bukiList.push(freeItemsList[0]);
        }
        
        // 中央マスの位置
        const centerRow = Math.ceil(bingoRows / 2) - 1;
        const centerColumn = Math.ceil(bingoCols / 2) - 1;
        
        // ビンゴ生成
        for (let row = 0; row < bingoRows; row++) {
            for (let column = 0; column < bingoCols; column++) {
                let buki = bukiList[0];
                if ( row == centerRow && column == centerColumn ) {
                    buki = centerItemObj;
                } else {
                    buki = bukiList.splice(Math.floor(Math.random() * bukiList.length), 1)[0];
                };
                const itemName = 'weapon' + buki.lid;
                newBingo.push({row: row, column: column, item: itemName, done: false});
            };
        };
        
        bingoData.myBingo = newBingo;
        storageManager.saveLocalStorageData(newBingo, undefined, 'myBingo');
        return newBingo;
    }
}
