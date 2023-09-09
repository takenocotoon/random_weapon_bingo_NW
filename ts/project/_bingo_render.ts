import { getElement } from '../common/function/_get_element';

import { bingoData } from "./_bingo_data";
import { BingoCenterItem } from './_bingo_center_item';
import { BingoCreator } from './_bingo_creator';

import { bukiLib, Buki } from "./data/_weapons-list";


export class BingoRender {
    
    // 中央ブキ選択フォーム描写
    static renderCenterWeaponSelector( elementId:string, list:Buki[], language=bingoData.language ) {
        const boxEle = getElement('js-'+elementId+'__box');
        if (!boxEle) return;
        
        boxEle.innerText = '';
        
        // 縦横サイズ
        const windowSize = {
            width: window.innerWidth,
            height: window.innerHeight,
            aspectRatio: window.innerWidth / (window.innerHeight*0.8),
        };
        
        let numCols = 1;
        for ( numCols = 1; ; numCols++ ) {
            if ( numCols / (list.length / numCols ) > windowSize.aspectRatio ) { break };
        }
        if ( numCols < 4 ) numCols = 4;
        const numRows = Math.ceil(list.length / numCols);
        
        // 描画
        let index = 0;
        for ( let row = 0; row < numRows; row++ ) {
            
            const boxTrEle = document.createElement('div');
            boxTrEle.className = 'p-bukiBox__tr';
            
            for ( let column = 0; column < numCols; column++) {
                
                const boxTdEle = document.createElement('div');
                boxTdEle.className = 'p-bukiBox__td';
                
                const weaponImageEle = document.createElement('img');
                weaponImageEle.className = 'p-bukiBox__img';
                weaponImageEle.width = 100;
                weaponImageEle.height = 100;
                
                weaponImageEle.src = './img/weapons/--.webp';
                if (index < list.length) {
                    const weaponId = list[index]['id'];
                    const weaponLid = list[index]['lid'];
                    const weaponJa = list[index]['ja'];
                    const weaponEn = list[index]['en'];
                    
                    weaponImageEle.src = './img/weapons/' + weaponId + '.webp';
                    if (language == 'en') {
                        weaponImageEle.alt = weaponEn;
                        weaponImageEle.title = weaponEn;
                    } else {
                        weaponImageEle.alt = weaponJa;
                        weaponImageEle.title = weaponJa;
                    }
                    
                    boxTdEle.id = 'js-weapon-' + weaponId;
                    
                    boxTdEle.addEventListener('click', () => BingoCenterItem.setCenterWeapon(weaponLid, [weaponJa, weaponEn], elementId));
                }
                
                boxTdEle.appendChild(weaponImageEle);
                boxTrEle.appendChild(boxTdEle);
                
                index++;
            }
            boxEle.appendChild(boxTrEle);
        }
    }
    
    
    // ビンゴ描写
    static renderBingoCard(
        callback:Function,
        elementId:string,
        myBingo = bingoData.myBingo,
        bingoRows = bingoData.bingoRows,
        bingoCols = bingoData.bingoCols,
        language = bingoData.language,
    ):number {
        const tableEle:HTMLElement|null = getElement(elementId);
        if (!tableEle) return 0;
        
        // 初期化
        tableEle.innerHTML = '';
        let doneCount = 0;
        if (myBingo.length<1) myBingo = BingoCreator.createNewBingo();
        
        // 描写開始
        for (let row = 0; row < bingoRows; row++) {
            const boxTrEle: HTMLDivElement = document.createElement('div');
            boxTrEle.className = 'p-bingo__tr';
            
            for (let column = 0; column < bingoCols; column++) {
                const itemIndex:number = bingoCols * row + column;
                const itemName = myBingo[itemIndex].item;
                
                if (myBingo.length < itemIndex + 1) continue;
                
                let itemLid:number;
                if (itemName == 'squid') {
                    itemLid = -11;
                } else if (itemName.startsWith('weapon')) {
                    itemLid = parseInt(myBingo[itemIndex].item.substring(6));
                } else if (itemName.startsWith('item')) {
                    itemLid = parseInt(myBingo[itemIndex].item.substring(4));
                } else {
                    itemLid = -10;
                }
                const item:Buki = bukiLib[itemLid];
                
                let name:string;
                if (language == 'ja') name = item.ja;
                else name = item.en;
                
                const boxTdEle: HTMLElement = document.createElement('div');
                boxTdEle.id = row + '-' + column;
                boxTdEle.className = 'p-bingo__td';
                boxTdEle.title = name;
                if (myBingo[itemIndex].done) {
                    boxTdEle.classList.add('is-done');
                    doneCount++;
                }
                boxTdEle.addEventListener('click', () => callback(boxTdEle, itemIndex));
                
                const weaponImageEle:HTMLImageElement = document.createElement('img');
                weaponImageEle.src = './img/weapons/' + item.id + '.webp';
                weaponImageEle.className = 'p-bingo__weaponImg';
                weaponImageEle.width = 100;
                weaponImageEle.height = 100;
                weaponImageEle.alt = name;
                weaponImageEle.title = name;
                if (itemLid<0) weaponImageEle.classList.add('p-bingo__weaponImg-free');
                
                const weaponNameEle:HTMLSpanElement = document.createElement('span');
                weaponNameEle.className = 'p-bingo__weaponName';
                const weaponNameJaEle:HTMLSpanElement = document.createElement('span');
                weaponNameJaEle.lang = 'ja';
                weaponNameJaEle.innerText = item.ja;
                const weaponNameEnEle:HTMLSpanElement = document.createElement('span');
                weaponNameEnEle.lang = 'en';
                weaponNameEnEle.innerText = item.en;
                weaponNameEle.appendChild(weaponNameJaEle);
                weaponNameEle.appendChild(weaponNameEnEle);
                
                boxTdEle.appendChild(weaponImageEle);
                if (itemLid > -1) boxTdEle.appendChild(weaponNameEle);
                boxTrEle.appendChild(boxTdEle);
            }
            tableEle.appendChild(boxTrEle);
        }
        return doneCount;
    }
}
