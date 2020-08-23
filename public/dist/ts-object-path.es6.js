const pathSymbol = Symbol('Object path');
function createProxy(path = []) {
    const proxy = new Proxy({ [pathSymbol]: path }, {
        get(target, key) {
            if (key === pathSymbol) {
                return target[pathSymbol];
            }
            if (typeof key === 'string') {
                const intKey = parseInt(key, 10);
                if (key === intKey.toString()) {
                    key = intKey;
                }
            }
            const nextPath = [...(path || []), key];
            return createProxy(nextPath);
        }
    });
    return proxy;
}
function getPath(proxy) {
    if (typeof proxy === 'function') {
        proxy = proxy(createProxy());
    }
    return proxy[pathSymbol];
}
function isProxy(value) {
    return value && typeof value === 'object' && !!getPath(value);
}
function get(object, proxy, defaultValue = undefined) {
    return getPath(proxy).reduce((o, key) => o && o[key] || defaultValue, object);
}
function set(object, proxy, value) {
    getPath(proxy).reduce((o, key, index, keys) => {
        if (index < keys.length - 1) {
            o[key] = o[key] || (typeof keys[index + 1] === 'number' ? [] : {});
            return o[key];
        }
        o[key] = value;
    }, object);
}

export { createProxy, getPath, isProxy, get, set };
