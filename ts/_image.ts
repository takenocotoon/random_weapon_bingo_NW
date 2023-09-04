"use strict";

import html2canvas from 'html2canvas';

// 画像生成ボタンを待機させる
function updateButtonDuringCapture(buttonId:string) {
    const beforeText:HTMLElement|null = document.getElementById(buttonId+'--before');
    const processingText:HTMLElement|null = document.getElementById(buttonId+'--processing');
    if (!beforeText || !processingText) return;
    
    beforeText.style.display = 'none';
    processingText.style.display = 'unset';
}
function restoreButton(buttonId:string) {
    const beforeText:HTMLElement|null = document.getElementById(buttonId+'--before');
    const processingText:HTMLElement|null = document.getElementById(buttonId+'--processing');
    if (!beforeText || !processingText) return;
    
    beforeText.style.display = 'unset';
    processingText.style.display = 'none';
}


// 画像として書き出す (html2canvas)
export function captureImage(targetId:string, fileName:string='out', buttonId:string='js-download-btn') {
    updateButtonDuringCapture(buttonId);
    
    const targetEle:HTMLElement|null = document.getElementById(targetId);
    if (!targetEle) return;
    
    const captureEle:HTMLDivElement = document.createElement('div');
    captureEle.id = 'p-capture-img-area';
    
    const clonedEle:HTMLElement = targetEle.cloneNode(true) as HTMLElement;
    clonedEle.classList.add('p-capture-box');
    
    captureEle.appendChild(clonedEle);
    document.body.appendChild(captureEle);
    
    html2canvas(captureEle, {backgroundColor:null}).then(canvas => { 
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        };
        const formattedDate = now.toLocaleDateString(undefined, options).replace(/[/:,\s]/g, '');
        const fileNameWithDate = `${fileName}_${formattedDate}.png`;
        
        const downloadEle = document.createElement("a");
        downloadEle.href = canvas.toDataURL("image/png");
        downloadEle.download = fileNameWithDate;
        downloadEle.click();
        restoreButton(buttonId);
    });
    captureEle.remove();
    // beforeText.style.display = 'inline';
    // processingText.style.display = 'none';
    // buttonEle.removeAttribute("disabled");
}
