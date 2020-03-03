const arrayEquals = function (a, b) {
    if (!a || !b)
        return false;

    if (a.length != b.length)
        return false;

    for (var i = 0, l = a.length; i < l; i++) {
        if (!b.includes(a[i])) {
            return false;
        }
    }
    return true;
}

export default arrayEquals;