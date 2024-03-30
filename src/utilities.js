function createTextedElement(type, text) {
    const elem = document.createElement(type);
    elem.appendChild(document.createTextNode(text));
    return elem;
}

export { createTextedElement }