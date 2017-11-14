const patch = require("./patch");

function renderer() {
    let element = null;
    let oldVirtualNode = null;

    function render(newVirtualNode) {
        const patchedElement =  patch({parent: document.body, element, oldVirtualNode, newVirtualNode});
        element = patchedElement;
        oldVirtualNode = newVirtualNode;
        return patchedElement;
    }

    return render;
}

module.exports = renderer;