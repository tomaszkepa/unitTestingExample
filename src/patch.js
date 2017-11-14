// key
// onclick
// 3rd party
function patch({parent, element, oldVirtualNode, newVirtualNode}) {
    if (oldVirtualNode == null) {
        const newElement = createElement(newVirtualNode);
        parent.appendChild(newElement);
        return newElement;
    } else if (oldVirtualNode.tag && oldVirtualNode.tag === newVirtualNode.tag) {
        updateElementData({element, oldVirtualNode, newVirtualNode});
        removeExcessChildren({element, oldVirtualNode, newVirtualNode});
        patchMatchingChildren({element, oldVirtualNode, newVirtualNode});
        return element;
    } else if(oldVirtualNode !== newVirtualNode){
        const newElement = createElement(newVirtualNode);
        parent.replaceChild(newElement, element);
        return newElement;
    }
};

function patchMatchingChildren({element, oldVirtualNode, newVirtualNode}) {
    newVirtualNode.children.forEach(function(newChildNode, index) {
        patch({
            parent: element,
            element: element.childNodes[index],
            oldVirtualNode: oldVirtualNode.children[index],
            newVirtualNode: newChildNode
        })
    });
}

function removeExcessChildren({element, oldVirtualNode, newVirtualNode}) {
    const childrenToRemove = [];
    for(let i = newVirtualNode.children.length; i < oldVirtualNode.children.length; ++i) {
        childrenToRemove.push(element.childNodes[i]);
    }
    childrenToRemove.forEach(child => element.removeChild(child));
}

function updateElementData({element, oldVirtualNode, newVirtualNode}) {
    for (let attr in newVirtualNode.data) {
        if(newVirtualNode.data[attr] !== oldVirtualNode.data[attr]) {
            element.setAttribute(attr, newVirtualNode.data[attr]);
        }
    }
    for(let attr in oldVirtualNode.data) {
        if(newVirtualNode.data[attr] == null) {
            element.removeAttribute(attr);
        }
    }
}

function createElement(virtualNode) {
    const newElement = typeof virtualNode === "string" ?
        document.createTextNode(virtualNode) :
        createTagElement(virtualNode);
    return newElement;
}

function createTagElement(virtualNode) {
    const element = document.createElement(virtualNode.tag);
    for (let key in  virtualNode.data) {
        element.setAttribute(key, virtualNode.data[key]);
    }
    for (let child of virtualNode.children) {
        element.appendChild(createElement(child));
    }
    return element;
}

module.exports = patch;