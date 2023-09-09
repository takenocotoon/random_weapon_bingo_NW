// ビンゴデータ
export interface cardType {
    index: number,
    id: number,
    lid: number,
    name: {
        ja: string,
        en: string,
    },
    file: string,
    element: HTMLElement,
    row: number,
    column: number,
    done: boolean,
}

// 保存用ビンゴデータ
export interface bingoType {
    row: number,
    column: number,
    item: string,
    done: boolean
}

// localStorageData
export interface localStorageType {
    myBingo: bingoType[],
    centerItem: string,
    bingoCols: number,
    bingoRows: number,
    bingoBackground: string,
    bingoEffect: boolean,
    bingoWeaponText: boolean,
    theme: string,
    language: string,
    weaponGrizzco: boolean,
    weaponMinor: boolean,
    weaponScope: boolean,
    weaponHero: boolean,
}

export interface bingoObjType {
    row: number,
    column: number,
    item: string,
    done: boolean
}
