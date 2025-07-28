export function debounce(callback: Function, tout: number) {
    let toutId = 0;

    return function() {
        if(toutId) {
            clearTimeout(toutId);
        }
        toutId = setTimeout(callback, tout);
    }
}

export function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}