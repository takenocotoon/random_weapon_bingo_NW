import { Buki, bukiListNormal, bukiListGrizzco, bukiListAll } from './_weapons-list';

export function filterBukiList( includeGrizzco:boolean=false, includeMinor:boolean=false, includeScope:boolean=false, includeHero:boolean=false ):Buki[] {
    if (!includeMinor && !includeScope && !includeHero) {
        if (!includeGrizzco) return bukiListNormal.concat();
        else bukiListNormal.concat(bukiListGrizzco);
    }
    let bukiList = bukiListAll;
    if (includeGrizzco) bukiList = bukiListAll.concat(bukiListGrizzco);
    
    const hero = bukiList.filter(buki => buki.ja.includes('ヒーロー'));
    
    if (!includeMinor) bukiList = bukiList.filter(buki => buki.ja === buki.original);
    if (!includeScope) bukiList = bukiList.filter(buki => !buki.ja.includes('スコープ'));
    if (includeHero) bukiList= bukiList.concat(hero);
    
    return bukiList;
}
