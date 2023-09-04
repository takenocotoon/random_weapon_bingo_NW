import { localStorageData, saveLocalStorageData, localStorageKey } from './_local-storage';
import { bingoData } from './_p-bingo-data'
import { filterBukiList } from './_weapons-filter';
import { Buki, bukiListAll, bukiListGrizzco, freeItemsList } from './_weapons-list';
import * as confetti from 'canvas-confetti';

class Bingo {
    
    constructor() {
        if (bingoData.myBingo.length<1) {
            this.createBingoCard();
            saveLocalStorageData(localStorageKey, bingoData.myBingo, 'myBingo');
        }
    }
    
    
    // ビンゴチェック
    checkBingo = ():number => {
        // リセット
        for (let index=0; index < bingoData.myBingo.length; index++) {
            let itemEle = document.getElementById(bingoData.myBingo[index].row + '-' + bingoData.myBingo[index].column);
            if (itemEle) {
                itemEle.classList.remove('is-reach');
                itemEle.classList.remove('is-bingo');
            }
        }
        
        let bingoCountNew = 0;
        let reachCount = 0;
        
        for (let row = 0; row < bingoData.bingoRows; row++) {
            let doneCount = 0;
            for (let column = 0; column < bingoData.bingoCols; column++) {
                if (bingoData.myBingo[row * bingoData.bingoCols + column].done) {
                    doneCount++;
                }
            }
            
            if (doneCount == bingoData.bingoCols-1) {
                reachCount++;
                for (let column = 0; column < bingoData.bingoCols; column++) {
                    const itemEle = document.getElementById(row + '-' + column);
                    if (itemEle && !itemEle.classList.contains('is-done')) {
                        itemEle.classList.add('is-reach');
                    }
                }
            } else if (doneCount == bingoData.bingoCols) {
                bingoCountNew++;
                for (let column = 0; column < bingoData.bingoCols; column++) {
                    const itemEle = document.getElementById(row + '-' + column);
                    if (itemEle) {
                        itemEle.classList.add('is-bingo');
                    }
                }
            }
        }
        
        for (let column = 0; column < bingoData.bingoCols; column++) {
            let doneCount = 0;
            for (let row = 0; row < bingoData.bingoRows; row++) {
                if (bingoData.myBingo[row * bingoData.bingoCols + column].done) {
                    doneCount++;
                }
            }
            
            if (doneCount == bingoData.bingoRows-1) {
                reachCount++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + column);
                    if (itemEle && !itemEle.classList.contains('is-done')) {
                        itemEle.classList.add('is-reach');
                    }
                }
            } else if (doneCount == bingoData.bingoRows) {
                bingoCountNew++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + column);
                    if (itemEle) {
                        itemEle.classList.add('is-bingo');
                    }
                }
            }
        }
        
        if (bingoData.bingoRows == bingoData.bingoRows) {
            let doneCount = 0;
            for (let row = 0; row < bingoData.bingoRows; row++) {
                if (bingoData.myBingo[row * bingoData.bingoCols + row].done) {
                    doneCount++;
                }
            }
            if (doneCount == bingoData.bingoRows-1) {
                reachCount++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + row);
                    if (itemEle && !itemEle.classList.contains('is-done')) {
                        itemEle.classList.add('is-reach');
                    }
                }
            } else if (doneCount == bingoData.bingoRows) {
                bingoCountNew++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + row);
                    if (itemEle) {
                        itemEle.classList.add('is-bingo');
                    }
                }
            }
            
            doneCount = 0;
            for (let row = 0; row < bingoData.bingoRows; row++) {
                if (bingoData.myBingo[row * bingoData.bingoCols + (bingoData.bingoRows - 1 - row)].done) {
                    doneCount++;
                }
            }
            if (doneCount == bingoData.bingoRows-1) {
                reachCount++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + (bingoData.bingoRows - 1 - row));
                    if (itemEle && !itemEle.classList.contains('is-done')) {
                        itemEle.classList.add('is-reach');
                    }
                }
            } else if (doneCount == bingoData.bingoRows) {
                bingoCountNew++;
                for (let row = 0; row < bingoData.bingoRows; row++) {
                    const itemEle = document.getElementById(row + '-' + (bingoData.bingoRows - 1 - row));
                    if (itemEle) {
                        itemEle.classList.add('is-bingo');
                    }
                }
            }
        }
            
        const bingoMessageEle = document.getElementById('js-bingo-message');
        if (bingoMessageEle) {
            if (bingoCountNew > 0) {
                let messageText = '';
                if (bingoCountNew > 1) messageText = bingoCountNew + ' ';
                messageText += 'BINGO'
                if (bingoCountNew > 1) messageText += 's';
                messageText += ' ' + '!'.repeat(bingoCountNew);
                bingoMessageEle.innerText = messageText;
            } else {
                bingoMessageEle.innerHTML = '';
            }
        }
        
        const bingoReachEle = document.getElementById('js-reach-message');
        if (bingoReachEle) {
            if (reachCount > 0) {
                let messageText = '';
                if (reachCount > 1) messageText = reachCount + ' ';
                if (bingoData.language == 'ja') messageText += 'リーチ ';
                else if (reachCount > 1) messageText += 'Reaches ';
                else messageText += 'Reach ';
                messageText += '!'.repeat(reachCount-1);
                bingoReachEle.innerText = messageText;
            } else {
                bingoReachEle.innerHTML = '';
            }
        }
        
        return bingoCountNew;
    }
    
    
    // ビンゴクリック
    clickCard = (element:HTMLElement, itemIndex:number) => {
        if (element.classList.toggle('is-done')) {
            bingoData.myBingo[itemIndex].done = true;
            bingoData.doneCount++;
        } else {
            bingoData.myBingo[itemIndex].done = false;
            bingoData.doneCount--;
        }
        
        // 花吹雪
        const bingoCountNew = this.checkBingo();
        console.log(bingoData.bingoEffect);
        if (bingoData.bingoEffect && bingoCountNew > bingoData.bingoCount) {
            console.log('花吹雪');
            const myCanvas:HTMLCanvasElement|null = document.getElementById('js-confetti') as HTMLCanvasElement;
            console.log(myCanvas);
            const myConfetti = confetti.create(myCanvas, {
                resize: true,
                useWorker: true
            });
            myConfetti({
                angle: (Math.random() * (100 - 80) + 80),
                particleCount: (Math.random() * (300 - 80) + 80),
                spread: (Math.random() * (200 - 50) + 50),
                origin: { y: 0.5 }
            });
        }
        bingoData.bingoCount = bingoCountNew;
        saveLocalStorageData(localStorageKey, bingoData.myBingo, 'myBingo');
    }
    
    
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
        this.createBingoCard();
        saveLocalStorageData(localStorageKey, bingoData.myBingo, 'myBingo');
        this.renderBingoCard();
    }
    
    
    createBingoCard = () => {
        let items = filterBukiList(bingoData.weaponGrizzco, bingoData.weaponMinor, bingoData.weaponScope, bingoData.weaponHero);
        bingoData.myBingo = [];
        
        let centerItemObj = freeItemsList[1];
        console.log(bingoData.centerItem.substring(0,6));
        if ( bingoData.centerItem.substring(0,6) == 'weapon' ) {
            const centerWeaponLid:number = parseInt(bingoData.centerItem.substring(6));
            items = items.filter(item => item.lid !== centerWeaponLid);
            centerItemObj = bukiListAll.concat(bukiListGrizzco).filter(item => item.lid === centerWeaponLid)[0];
            console.log(centerWeaponLid);
            console.log( centerItemObj );
        } else if (bingoData.centerItem == 'random') {
            centerItemObj = items.splice(Math.floor(Math.random() * items.length), 1)[0];
        } else if (bingoData.centerItem == 'squid') {
            centerItemObj = freeItemsList[0];
        }
        
        while (items.length < bingoData.bingoRows*bingoData.bingoCols - 1) {
            if (bingoData.centerItem == 'squid') items.push(freeItemsList[0]);
            else items.push(freeItemsList[1]);
        }
        
        const centerNum = Math.ceil(bingoData.bingoRows / 2) - 1
        
        for (let row = 0; row < bingoData.bingoRows; row++) {
            for (let column = 0; column < bingoData.bingoCols; column++) {
                let item;
                if ( row == centerNum && column == centerNum ) {
                    item = centerItemObj;
                } else {
                    item = items.splice(Math.floor(Math.random() * items.length), 1)[0];
                };
                const itemName = 'weapon'+item.lid;
                bingoData.myBingo.push({row: row, column: column, item: itemName, done: false});
            };
        };
    }
    
    
    renderBingoCard = () => {
        const table:HTMLElement|null = document.getElementById('p-bingo-card-table');
        if (!table) return;
        
        table.innerHTML = '';
        bingoData.doneCount = 0;
        
        const boxTrTemplateEle: HTMLDivElement = document.createElement('div');
        boxTrTemplateEle.className = 'p-tr';
        const boxTdTemplateEle: HTMLDivElement = document.createElement('div');
        boxTdTemplateEle.className = 'p-td';
        const weaponTemplateEle: HTMLDivElement = document.createElement('div');
        const weaponImageTemplateEle: HTMLImageElement = document.createElement('img');
        const weaponBrTemplateEle: HTMLElement = document.createElement('br');
        const weaponTextTemplateEle: HTMLSpanElement = document.createElement('span');
        const weaponJaTemplateEle: HTMLSpanElement = document.createElement('span');
        weaponJaTemplateEle.lang = 'ja';
        const weaponEnTemplateEle: HTMLSpanElement = document.createElement('span');
        weaponEnTemplateEle.lang = 'en';
        
        
        for (let row = 0; row < bingoData.bingoRows; row++) {
            const boxTrEle: HTMLDivElement = boxTrTemplateEle.cloneNode(true) as HTMLDivElement;
            
            for (let column = 0; column < bingoData.bingoCols; column++) {
                const weaponEle: HTMLDivElement = weaponTemplateEle.cloneNode(true) as HTMLDivElement;
                const weaponImageEle: HTMLImageElement = weaponImageTemplateEle.cloneNode(true) as HTMLImageElement;
                const weaponBrEle: HTMLElement = weaponBrTemplateEle.cloneNode(true) as HTMLElement;
                const weaponSpanEle: HTMLSpanElement = weaponTextTemplateEle.cloneNode(true) as HTMLSpanElement;
                const weaponJaEle: HTMLSpanElement = weaponJaTemplateEle.cloneNode(true) as HTMLSpanElement;
                const weaponEnEle: HTMLSpanElement = weaponEnTemplateEle.cloneNode(true) as HTMLSpanElement;
                
                const itemIndex:number = bingoData.bingoCols * row + column;
                if (bingoData.myBingo.length < itemIndex + 1) continue;
                
                const itemName = bingoData.myBingo[itemIndex].item;
                let itemId:number = 0;
                if (itemName == 'squid') {
                    itemId = -10;
                } else if (itemName.startsWith('weapon')) {
                    itemId = parseInt(bingoData.myBingo[itemIndex].item.substring(6));
                } else if (itemName.startsWith('item')) {
                    itemId = parseInt(bingoData.myBingo[itemIndex].item.substring(4));
                } else {
                    itemId = -11;
                }
                const item = bukiListAll.concat(bukiListGrizzco).concat(freeItemsList).filter(item => item.lid === itemId)[0];
                
                weaponEle.id = row + '-' + column;
                
                weaponImageEle.src = './img/weapons/' + item.id + '.webp';
                
                if (bingoData.language == 'ja') {
                    weaponImageEle.alt = item.ja;
                    weaponImageEle.title = item.ja;
                } else {
                    weaponImageEle.alt = item.en;
                    weaponImageEle.title = item.en;
                }
                weaponJaEle.innerText = item.ja;
                weaponEnEle.innerText = item.en;
                
                if (bingoData.myBingo[itemIndex]['done']) {
                    weaponEle.classList.add('is-done');
                    bingoData.doneCount++;
                }
                
                weaponEle.appendChild(weaponImageEle);
                weaponEle.appendChild(weaponBrEle);
                weaponSpanEle.appendChild(weaponJaEle);
                weaponSpanEle.appendChild(weaponEnEle);
                if (itemId>-1) weaponEle.appendChild(weaponSpanEle);
                boxTrEle.appendChild(weaponEle);
                
                weaponEle.addEventListener('click', () => this.clickCard(weaponEle, itemIndex))
            }
            
            table.appendChild(boxTrEle);
        }
        bingoData.bingoCount = this.checkBingo();
    }
}

export const bingo = new Bingo();
