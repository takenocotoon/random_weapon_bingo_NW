import * as confetti from 'canvas-confetti';
import { getElement } from '../../common/function/_get_element';

export function playBingoEffect( elementId:string ) {
    const myCanvas:HTMLCanvasElement|null = getElement(elementId) as HTMLCanvasElement;
    const myConfetti = confetti.create(myCanvas, {
        resize: true,
        useWorker: true
    });
    myConfetti({
        angle: (Math.random() * (100 - 80) + 80),
        particleCount: (Math.random() * (300 - 80) + 80),
        spread: (Math.random() * (200 - 50) + 50),
        origin: { y: 0.5 }
    });
}
