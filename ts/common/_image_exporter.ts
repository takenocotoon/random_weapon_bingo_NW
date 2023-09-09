import html2canvas from 'html2canvas';
import { getElement } from "./function/_get_element";
import { getFileTimestamp } from './function/_get_file_timestamp';

export class ImageExporter {
    static exportImage = (targetEle:string|HTMLElement, fileName:string='out', buttonEle:string|HTMLElement='js-download-button') => {
        const target = getElement(targetEle);
        const button = getElement(buttonEle) as HTMLButtonElement;
        if (!target || !button) return false;
        
        button.disabled = true;
        
        const captureEle:HTMLDivElement = document.createElement('div');
        captureEle.id = 'js-imageExporter__box';
        
        const clonedEle:HTMLElement = target.cloneNode(true) as HTMLElement;
        clonedEle.id = 'js-imageExporter__target';
        
        captureEle.appendChild(clonedEle);
        document.body.appendChild(captureEle);
        
        html2canvas(captureEle, {backgroundColor:null}).then(canvas => { 
            const fileNameWithDate = `${fileName}_${getFileTimestamp()}.png`;
            
            const downloadEle = document.createElement("a");
            downloadEle.href = canvas.toDataURL("image/png");
            downloadEle.download = fileNameWithDate;
            downloadEle.click();
            
            button.disabled = false;
        });
        captureEle.remove();
    }
    
}
