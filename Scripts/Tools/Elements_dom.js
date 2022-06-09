/**
     * @constructs
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     */
//======= cela permet d'ajouter un element à la fin d'un autre
const elemAppend = (element, target) => {
  target.appendChild(element)
}
/**
     * @constructs
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     */
//========= cela permet de remplacer un element par un autre
const elemntReplace = (element, target) => {
  target.parentNode.replaceChild(element, target)
}
/**
     * @constructs
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     */
//========= cela permet d'inserer un element avant un autre
const insertElmntsBefore = (element, target) => {
  target.parentNode.insertBefore(element, target)
}
/**
     * @constructs
     * @param {HTMLElement} element
     * @param {HTMLElement} target
     */
//=========  cela permet d'inserer un element apres un autre
const insertElmntsAfter = (element, target) => {
  target.after(element)
}
/**
     * @constructs
     * @param {HTMLElement} element
     */
//========= cela permet de supprimer un element du dom
const deleteElmnt = (element) => {
  element.parentNode.removeChild(element)
}

const elemntsDom = {
  elemAppend, elemntReplace, insertElmntsAfter, insertElmntsBefore, deleteElmnt
}
export default elemntsDom