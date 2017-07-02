export function slideFromMiddle(tag: string) {

    const element = document.getElementsByTagName(tag)[0];
    if (element) {
        element.className = 'slide-from-middle';
    }
}

export function slideIn(tag: string, direction: string) {

    const element = document.getElementsByTagName(tag)[0];
    if (element) {
        element.className = 'slide-from-' + direction;

        setTimeout(() => {
            element.classList.add('slide-to-middle');
        }, 100);
    }
}

export function slideOut(tag: string, direction: string) {

    let element = document.getElementsByTagName(tag)[0];
    if (element) {
        element.parentElement.appendChild(element.cloneNode(true));
        element = element.parentElement.lastElementChild;

        element.className = 'slide-from-middle';

        setTimeout(() => {
            element.classList.add('slide-to-' + direction);
        }, 100);
        setTimeout(() => {
            element.parentNode.removeChild(element);
        }, 1000);
    }
}
