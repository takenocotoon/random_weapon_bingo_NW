import { storageManager } from '../common/_local_storage';
import { getElement } from './function/_get_element';
import { getFileTimestamp } from './function/_get_file_timestamp';


export class Backup {
    
    static saveToSlot(language:string='ja'){
        for (let index = 1; index <= 3; index++) {
            const slotRadioEle:HTMLInputElement|null = getElement('js-saveDataSlot--'+index) as HTMLInputElement
            if (!slotRadioEle || slotRadioEle.checked == false) continue;
            
            let result = false;
            if (language == 'ja') {
                result = window.confirm(`スロット${index}にデータを上書き保存します。`);
            } else {
                result = window.confirm(`Data will be overwritten and saved in Slot ${index}.`);
            }
            if (!result) return;
            
            const CurrentLocalStorageData = storageManager.getLocalStorageData();
            if (Boolean(CurrentLocalStorageData)) storageManager.saveLocalStorageData(CurrentLocalStorageData, storageManager.key + '-' + index);
            else {
                if (language == 'ja') window.alert(`現在のデータを取得できなかったため保存できませんでした。`);
                else window.alert(`Unable to save as the current data could not be retrieved.`);
            }
            return;
        }
        
        if (language == 'ja') window.alert(`スロットが選択されていません。`);
        else window.alert(`No slot selected.`);
    }
    
    static loadFromSlot(language:string='ja', callback:Function) {
        for (let index = 1; index <= 3; index++) {
            const slotRadioEle:HTMLInputElement|null = getElement('js-saveDataSlot--'+index) as HTMLInputElement
            if (!slotRadioEle || slotRadioEle.checked == false) continue;
            
            let result = false;
            if (language == 'ja') {
                result = window.confirm(`スロット${index}からデータを復元します。現在のデータは失われます。`);
            } else if (language == 'en') {
                result = window.confirm(`Do you want to restore data from Slot ${index}? Current data will be lost.`);
            }
            if (!result) return false;
            
            const newLocalStorageData = storageManager.getLocalStorageData(storageManager.key + '-' + index);
            
            if (!newLocalStorageData.hasOwnProperty('myBingo') || newLocalStorageData.myBingo.length < 1) {
                if (language == 'ja') window.alert(`スロット${index}にはデータがありませんでした。`);
                else window.alert(`There is no data in slot ${index}.`);
                return false;
            }
            
            if (!Backup.setAndApply(newLocalStorageData, storageManager.getLocalStorageData(), callback)) {
                if (language == 'ja') window.alert(`読み込みに失敗しました。`);
                else window.alert(`Failed to load.`);
            };
            return true;
        }
        
        if (language == 'ja') window.alert(`スロットが選択されていません。`);
        else window.alert(`No slot selected.`);
        return false;
    }
    
    static exportFile(language:string='ja', fileName:string='export') {
        const jsonData = JSON.stringify(storageManager.getLocalStorageData(), null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const fileNameWithDate = `${fileName}_${getFileTimestamp()}.json`;
        
        const downloadLink = document.createElement('a');
        
        downloadLink.href = url;
        downloadLink.download = fileNameWithDate;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        
        if (language == 'ja') {
            window.alert(`jsonファイルの書き出しに成功しました。\nこのファイルをインポートから読み込むことで現在の状態を復元できます。\n
※ データスロットのデータは含みません。データスロットもバックアップしたい場合はスロットからロードした後にそれぞれ個別に書き出して下さい。`);
        } else if (language == 'en') {
            window.alert(`JSON file export successful.\nYou can restore the current state by importing this file.\n
※ Data slot information is not included. If you want to back up data slots, please export them individually after loading.`);
        }
    }
    
    static importFile(language:string='ja', callback:Function) {
        const loadJsonInput:HTMLInputElement|null = getElement('js-loadJson-input') as HTMLInputElement;
        if (!loadJsonInput) return;
        
        let result = false;
        if (language == 'ja') {
            result = window.confirm(`バックアップファイルからデータをロードします。現在のデータは失われます。`);
        } else {
            result = window.confirm(`You are about to load data from a backup file. Loading this data will overwrite your current data. Are you sure you want to proceed?`);
        }
        if (!result) return;
        
        const fileChangeListener = (event:Event) => {
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
                        if (!Backup.setAndApply(newLocalStorageData, storageManager.getLocalStorageData(), callback)) {
                            throw new Error();
                        }
                        if (language == 'ja') window.alert(`ファイルの読み込みに成功しました。`);
                        else window.alert(`File loaded successfully.`);
                        
                    } catch (error) {
                        if (language == 'ja') window.alert(`ファイルの読み込みに失敗しました。`);
                        else window.alert(`Failed to read the file.`);
                        console.error('Error while parsing JSON file:', error);
                    }
                    
                    selectFileEle.value = '';
                    loadJsonInput.removeEventListener('change', fileChangeListener);
                };
                fileReader.readAsText(selectedFile);
            }
        }
        loadJsonInput.addEventListener('change', fileChangeListener);
        loadJsonInput.click();
    }
    
    
    static setAndApply(newLocalStorageData:any, oldLocalStorageData:any, callback:Function) {
        if (!newLocalStorageData || !oldLocalStorageData) return false;
        
        for (const key in oldLocalStorageData) {
            if (newLocalStorageData.hasOwnProperty(key) && typeof oldLocalStorageData[key] === typeof newLocalStorageData[key]) {
                oldLocalStorageData[key] = newLocalStorageData[key];
            }
        }
        storageManager.saveLocalStorageData(oldLocalStorageData);
        callback();
        return true;
    }
    
}
