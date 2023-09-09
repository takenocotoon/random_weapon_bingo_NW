import { getElement } from "./function/_get_element";
const activeClassName = 'js-is_active';
const deactiveClassName = 'js-is_deactive';
const subMenuClassName = 'js-submenus';

export class MenuManager {
    
    // ハンバーガー
    static openHamburger(menuId:string|HTMLElement='js-menu', hamburgerId:string|HTMLElement='js-hamburger') {
        const menu = getElement(menuId);
        const hamburger = getElement(hamburgerId);
        if (!menu || !hamburger) return;
        
        if (!menu.classList.toggle(activeClassName)) {
            menu.classList.add(deactiveClassName);
        } else {
            menu.classList.remove(deactiveClassName);
            
            const targets = document.getElementsByClassName(subMenuClassName);
            Array.from(targets).forEach(target => {
                target.classList.remove(activeClassName);
            });
        }
        if (!hamburger.classList.toggle(activeClassName)) {
            hamburger.classList.add(deactiveClassName);
        } else {
            hamburger.classList.remove(deactiveClassName);
        }
    }
    
    
    // サブメニューアコーディオン
    static openSubMenu(target:string|HTMLElement, targets:HTMLElement[]) {
        const targetEle = getElement(target);
        if (!targetEle) return;
        
        if (targetEle.classList.toggle(activeClassName)) {
            targets.forEach(elm => {
                if (elm !== targetEle) elm.classList.remove(activeClassName);
            });
        }
    }
    
    // 全部閉じる
    static closeMenu() {
        MenuManager.openHamburger();
        const targets = document.getElementsByClassName(activeClassName);
        while (targets.length > 0) {
            targets[0].classList.remove(activeClassName);
        }
        
        const submenus = document.getElementsByClassName(subMenuClassName);
        Array.from(submenus).forEach(target => {
            target.classList.add(deactiveClassName);
            
            setTimeout(function () { target.classList.remove(deactiveClassName); }, 1000);
        });
    }
    
    //dialog
    static openDialog(elementId:string|HTMLElement) {
        const target: HTMLDialogElement = getElement(elementId) as HTMLDialogElement;
        if (target) target.showModal();
    }
}
