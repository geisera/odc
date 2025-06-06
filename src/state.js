let viewType = null;

export function setViewType(value) {
    viewType = value;
    console.log(viewType);
}

export function getViewType() {
    console.log(viewType);
    return viewType;
}
