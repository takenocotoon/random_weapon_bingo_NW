export function getElement(element:string|HTMLElement):HTMLElement|null {
    let target:HTMLElement|null = null;
    if (typeof element === 'string') {
        target = document.getElementById(element);
    } else {
        target = element as HTMLElement;
    }
    if (!target) {
        console.error(`Element with ID "${element}" not found.`);
        return null;
    }
    return target;
}
