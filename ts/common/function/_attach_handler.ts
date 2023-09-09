import { getElement } from "./_get_element";

// イベントリスナー登録
export function attachHandler(
    element: string | HTMLElement,
    callback: () => void,
    eventType: string = 'click'
) {
    const target = getElement(element);
    if (target) {
        target.addEventListener(eventType, (event: Event) => {callback();});
    }
}
