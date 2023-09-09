import { MenuManager } from './common/_menu_manager';
import { attachHandler } from './common/function/_attach_handler';
import { bingo } from './project/_bingo';

// 横幅最大をWindowの縦サイズにする
function setWindowSize(elementId:string) {
    const windowSize = window.innerHeight;
    const contentsEle:HTMLElement|null = document.getElementById(elementId);
    if (contentsEle) contentsEle.style.cssText = 'max-width : ' + (windowSize * 0.7) + 'px;';
}

function main() {
    // ウィンドウサイズに合わせてメイン空間を設定
    setWindowSize('js-container');
    
    // ビンゴ初期化
    bingo.initBingo();
    
    // メニュー開閉
    attachHandler('js-hamburger', MenuManager.openHamburger);
    const subMenus = Array.from(document.getElementsByClassName('js-submenus')) as HTMLElement[];
    subMenus.forEach(target => {
        attachHandler(target.id, () => MenuManager.openSubMenu(target, subMenus));
    });
    
    // PWA設定
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(function(registration) {
            console.log('ServiceWorker の登録に成功しました。スコープ: ', registration.scope);
        }).catch(function(error) {
            console.log('ServiceWorker の登録に失敗しました。', error);
        });
    }
}
window.onload = main;
