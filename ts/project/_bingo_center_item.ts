import { getElement } from "../common/function/_get_element";

export class BingoCenterItem {
    
    // 中央ブキを選択
    static setCenterWeapon = (ItemId:number, name:string[], elementId:string) => {
        const inputEle: HTMLInputElement|null = getElement('js-settingsCenterItem__'+elementId) as HTMLInputElement;
        const labelEle: HTMLLabelElement|null = getElement('js-settingsCenterItem__'+elementId+'-label') as HTMLLabelElement;
        const dialogEle: HTMLDialogElement|null = getElement('js-'+elementId+'__dialog') as HTMLDialogElement;
        if (!inputEle || !labelEle || !dialogEle) {
            if (!inputEle) console.error(`Element with ID "js-settingsCenter__${elementId}" not found.`);
            if (!labelEle) console.error(`Element with ID "js-settingsCenter__${elementId}-label" not found.`);
            if (!dialogEle) console.error(`Element with ID "js-${elementId}__dialog" not found.`);
            return;
        }
        
        const spanJaEle: HTMLSpanElement = document.createElement('span');
        spanJaEle.lang = 'ja';
        const spanEnEle: HTMLSpanElement = document.createElement('span');
        spanEnEle.lang = 'en';
        
        inputEle.value = 'weapon' + ItemId;
        
        labelEle.innerText = '';
        spanJaEle.innerHTML = name[0];
        spanEnEle.innerHTML = name[1];
        labelEle.appendChild(spanJaEle);
        labelEle.appendChild(spanEnEle);
        
        inputEle.checked = true;
        dialogEle.close();
    }
}
