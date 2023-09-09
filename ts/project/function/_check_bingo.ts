import { bingoData } from '../_bingo_data';
import { getElement } from '../../common/function/_get_element';

export function checkBingo(
    myBingo = bingoData.myBingo,
    bingoRows = bingoData.bingoRows,
    bingoCols = bingoData.bingoCols,
){
    // リセット
    for (let index=0; index < myBingo.length; index++) {
        let itemEle = getElement(myBingo[index].row + '-' + myBingo[index].column);
        if (itemEle) {
            itemEle.classList.remove('is-reach');
            itemEle.classList.remove('is-bingo');
        }
    }
    
    const bingoGroups:{[key:number]:string}[] = [];
    const reachGroups:{[key:number]:string}[] = [];
    
    // 横
    for (let row = 0; row < bingoRows; row++) {
        const bingoColsGroup:{[key:number]:string} = {};
        let doneCount = 0;
        for (let column = 0; column < bingoCols; column++) {
            let index = row * bingoCols + column;
            bingoColsGroup[index] = row + '-' + column;
            if (myBingo[index].done) doneCount++;
        }
        if (doneCount == bingoCols-1) reachGroups.push(bingoColsGroup);
        else if (doneCount == bingoCols) bingoGroups.push(bingoColsGroup);
    }
    
    // 縦
    for (let column = 0; column < bingoCols; column++) {
        const bingoRowsGroup:{[key:number]:string} = {};
        let doneCount = 0;
        for (let row = 0; row < bingoRows; row++) {
            let index = row * bingoCols + column;
            bingoRowsGroup[index] = row + '-' + column;
            if (myBingo[index].done) doneCount++;
        }
        if (doneCount == bingoRows-1) reachGroups.push(bingoRowsGroup);
        else if (doneCount == bingoRows) bingoGroups.push(bingoRowsGroup);
    }
    
    // 斜め
    if (bingoRows == bingoRows) {
        const bingoLTRBGroup:{[key:number]:string} = {};
        let doneCountLTRB = 0;
        const bingoRTLBGroup:{[key:number]:string} = {};
        let doneCountRTLB = 0;
        for (let row = 0; row < bingoRows; row++) {
            let indexLTRB = row * bingoCols + row; 
            bingoLTRBGroup[indexLTRB] = row + '-' + row;
            if (myBingo[indexLTRB].done) doneCountLTRB++;
            
            let indexRTLB = row * bingoCols + (bingoRows - 1 - row); 
            bingoRTLBGroup[indexRTLB] = row + '-' + (bingoRows - 1 - row);
            if (myBingo[indexRTLB].done) doneCountRTLB++;
        }
        if (doneCountLTRB == bingoRows-1) reachGroups.push(bingoLTRBGroup);
        else if (doneCountLTRB == bingoRows) bingoGroups.push(bingoLTRBGroup);
        if (doneCountRTLB == bingoRows-1) reachGroups.push(bingoRTLBGroup);
        else if (doneCountRTLB == bingoRows) bingoGroups.push(bingoRTLBGroup);
    }
    
    // マスに色付
    bingoGroups.forEach((group) => {
        for (const index in group) {
            const itemEle = getElement(group[index]);
            if (itemEle) itemEle.classList.add('is-bingo');
        }
    });
    reachGroups.forEach((group) => {
        for (const index in group) {
            const itemEle = getElement(group[index]);
            if (itemEle && !itemEle.classList.contains('is-done')) itemEle.classList.add('is-reach');
        }
    });
    
    // ビンゴメッセージ
    const messageObjs = [
        {
            elementId: 'js-bingo__messageBox-bingo',
            messageSingularJa: 'BINGO',
            messageSingularEn: 'BINGO',
            messagePluralJa: 'BINGOs',
            messagePluralEn: 'BINGOs',
            counts: bingoGroups.length,
        },
        {
            elementId: 'js-bingo__messageBox-reach',
            messageSingularJa: 'リーチ',
            messageSingularEn: 'Reach',
            messagePluralJa: 'リーチ',
            messagePluralEn: 'Reaches',
            counts: reachGroups.length,
        },
    ];
    messageObjs.forEach((messageObj) => {
        const jaEle = getElement(messageObj.elementId+'__ja');
        const enEle = getElement(messageObj.elementId+'__en');
        if (jaEle && enEle) {
            if (messageObj.counts > 0) {
                let messageText = '';
                if (messageObj.counts > 1) messageText = messageObj.counts + ' Plural';
                else messageText = 'Singular';
                messageText += ' ' + '!'.repeat(messageObj.counts);
                
                jaEle.innerText = messageText.replace('Singular', messageObj.messageSingularJa)
                    .replace('Plural', messageObj.messagePluralJa);
                
                enEle.innerText = messageText.replace('Singular', messageObj.messageSingularEn)
                    .replace('Plural', messageObj.messagePluralEn);
            } else {
                jaEle.innerHTML = '';
                enEle.innerHTML = '';
            }
        }
    });
    return bingoGroups.length;
}
