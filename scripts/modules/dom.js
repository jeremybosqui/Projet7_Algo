/**
 * Ajoute un element à la fin d'un autre element
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 */
const append = (element, target) => {
    target.appendChild(element)
}

/**
 * remplace un element par un autre element
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 */
const replace = (element, target) => {
    target.parentNode.replaceChild(element, target)
}

/**
 * ajoute un element avant un autre element
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 */
const insertBefore = (element, target) => {
    target.parentNode.insertBefore(element, target)
}

/**
 * ajoute un element apres un autre element
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 */
const insertAfter = (element, target) => {
    target.after(element)
}

/**
 * supprime un element du dom
 * @param {HTMLElement} element
 */
const remove = (element) => {
    element.parentNode.removeChild(element)
}

const dom = {
    append,
    replace,
    insertBefore,
    insertAfter,
    remove
}

export default dom