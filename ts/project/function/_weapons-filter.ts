import { Buki, bukiListNormal, bukiListGrizzco, bukiListAll, bukiListHero } from '../data/_weapons-list';
import { bingoData } from '../_bingo_data';

export function filterBukiList(
    includeGrizzco:boolean = bingoData.weaponGrizzco,
    includeMinor:boolean = bingoData.weaponMinor,
    includeScope:boolean = bingoData.weaponScope,
    includeHero:boolean = bingoData.weaponHero,
):Buki[] {
    let bukiList = bukiListAll.concat();
    
    if (includeGrizzco) bukiList = bukiList.concat(bukiListGrizzco);
    if (!includeMinor) bukiList = bukiList.filter(buki => buki.ja === buki.original);
    if (!includeScope) bukiList = bukiList.filter(buki => !buki.ja.includes('スコープ'));
    if (includeHero && !includeMinor) bukiList = bukiList.concat(bukiListHero);
    if (!includeHero && includeMinor) bukiList = bukiList.filter(buki => !buki.ja.includes('ヒーロー'));
    
    return bukiList;
}
