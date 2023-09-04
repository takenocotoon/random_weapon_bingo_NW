import { saveLocalStorageData, localStorageKey, getLocalStorageData, localStorageData } from './_local-storage';

export function saveToSlot(language:string='ja'){
    for (let index = 1; index <= 3; index++) {
        const slotRadioEle:HTMLInputElement|null = document.getElementById('js-saveDataSlot--'+index) as HTMLInputElement
        if (!slotRadioEle || slotRadioEle.checked == false) continue;
        let result = false;
        if (language == 'ja') {
            result = window.confirm(`スロット${index}にデータを上書き保存します。`);
        } else {
            result = window.confirm(`Data will be overwritten and saved in Slot ${index}.`);
        }
        if (!result) return;
        
        const CurrentLocalStorageData = getLocalStorageData();
        console.log(CurrentLocalStorageData);
        if (Boolean(CurrentLocalStorageData)) saveLocalStorageData(localStorageKey + '-' + index, CurrentLocalStorageData);
        else {
            if (language == 'ja') window.alert(`現在のデータを取得できなかったため保存できませんでした。`);
            else window.alert(`Unable to save as the current data could not be retrieved.`);
        }
        break;
    }
}


export function loadFromSlot(language:string='ja', callback:Function) {
    for (let index = 1; index <= 3; index++) {
        const slotRadioEle:HTMLInputElement|null = document.getElementById('js-saveDataSlot--'+index) as HTMLInputElement
        if (!slotRadioEle || slotRadioEle.checked == false) continue;
        
        let result = false;
        if (language == 'ja') {
            result = window.confirm(`スロット${index}からデータを復元します。現在のデータは失われます。`);
        } else if (language == 'en') {
            result = window.confirm(`Do you want to restore data from Slot ${index}? Current data will be lost.`);
        }
        if (!result) return false;
        
        const newLocalStorageData = getLocalStorageData(localStorageKey + '-' + index);
        console.log(newLocalStorageData.myBingo);
        
        if (!newLocalStorageData.hasOwnProperty('myBingo') || newLocalStorageData.myBingo.length < 1) {
            if (language == 'ja') window.alert(`スロット${index}にはデータがありませんでした。`);
            else window.alert(`There is no data in slot ${index}.`);
            return false;
        }
        
        if (!setAndApply(newLocalStorageData, getLocalStorageData(), callback)) {
            if (language == 'ja') window.alert(`読み込みに失敗しました。`);
            else window.alert(`Failed to load.`);
        };
        return true;
    }
    return false;
}


export function exportFile(fileName:string='export') {
    const jsonData = JSON.stringify(getLocalStorageData(), null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
        year: '2-digit', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    const formattedDate = now.toLocaleDateString(undefined, options).replace(/[/:,\s]/g, '');
    const fileNameWithDate = `${fileName}_${formattedDate}.json`;
    
    const downloadLink = document.createElement('a');
    
    downloadLink.href = url;
    downloadLink.download = fileNameWithDate;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}


export function importFile(language:string='ja', callback:Function) {
    const loadJsonInput:HTMLInputElement|null = document.getElementById('js-loadJson-input') as HTMLInputElement;
    if (!loadJsonInput) return;
    
    loadJsonInput.addEventListener('change', (event) => {
        if (!event.target) return;
        const selectFileEle = event.target as HTMLInputElement;
        const selectedFile = selectFileEle.files![0];
        if (selectedFile) {
            // ファイルを読み込む
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const target = event.target as FileReader;
                if (!target) return;
                const fileContent = target.result;
                try {
                    const newLocalStorageData = JSON.parse(fileContent as string);
                    if (!setAndApply(newLocalStorageData, getLocalStorageData(), callback)) {
                        throw new Error();
                    };
                    selectFileEle.value = '';
                } catch (error) {
                    if (language == 'ja') window.alert(`ファイルの読み込みに失敗しました。`);
                    else window.alert(`Failed to read the file.`);
                    console.error('Error while parsing JSON file:', error);
                }
            };
            fileReader.readAsText(selectedFile);
        }
    });
    loadJsonInput.click();
}


function setAndApply(newLocalStorageData:any, oldLocalStorageData:any, callback:Function) {
    if (!newLocalStorageData || !oldLocalStorageData) return false;
    
    if (!newLocalStorageData.hasOwnProperty('myBingo') || newLocalStorageData.myBingo.length < 1) {
        return false;
    }
    
    for (const key in oldLocalStorageData) {
        if (newLocalStorageData.hasOwnProperty(key) && typeof oldLocalStorageData[key] === typeof newLocalStorageData[key]) {
            oldLocalStorageData[key] = newLocalStorageData[key];
        }
    }
    console.log(oldLocalStorageData);
    saveLocalStorageData(localStorageKey, oldLocalStorageData);
    callback();
    return true;
}
