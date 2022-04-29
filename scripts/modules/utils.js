/**
 * controle si le clique à eu lieu à l'exterieur d'un element 
 * @param {HTMLElement} target Element cliqué
 * @param {HTMLElement} ref Element de reference
 * @returns {boolean}
 */
const clickOut = (target, ref) => {
    return !ref.contains(target)
}

const truncateStringEllipsis = (str, index) => {
    const strSliced = str.slice(0, index)
    const strSplited = strSliced.split(' ')

    return strSliced.slice(0, (index - strSplited[strSplited.length - 1].length) - 1) + "..."
}

const utils = {
    clickOut,
    truncateStringEllipsis
}

export default utils