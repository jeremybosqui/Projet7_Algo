//============ 
/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */
 const elemntAppend = (element, target) => {
  target.appendChild(element);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
const elemntReplace = (element, target) => {
  target.parentNode.replaceChild(element, target);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
const insertElemntsBefore = (element, target) => {
  target.parentNode.insertElemntsBefore(element, target);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
const insertElemntsAfter = (element, target) => {
  target.after(element);
}
/**
* @param {HTMLElement} element
*/
const deleteElement = (element) => {
  element.parentNode.removeChild(element);
}
const elemntsDom = {
  elemntAppend, elemntReplace, insertElemntsBefore, insertElemntsAfter, deleteElement
}
export default elemntsDom;