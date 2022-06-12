//============ 
/**
 * @param {HTMLElement} element 
 * @param {HTMLElement} target 
 */ 
//permet d'ajouter un element à la fin d'un autre 
const elemntAppend = (element, target) => {
  target.appendChild(element);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
// permet de remplacer un element par un autre 
const elemntReplace = (element, target) => {
  target.parentNode.replaceChild(element, target);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
// permet d'ajouter un element avant un autre 
const insertElemntsBefore = (element, target) => {
  target.parentNode.insertElemntsBefore(element, target);
}
/**
* @param {HTMLElement} element 
* @param {HTMLElement} target 
*/
// permet d'ajouter un eleemnt apres un autre
const insertElemntsAfter = (element, target) => {
  target.after(element);
}
/**
* @param {HTMLElement} element
*/
// permet de supprimer un eleemnt du dom en l'occurence en tag qui sera affiché sur le site
const deleteElement = (element) => {
  element.parentNode.removeChild(element);
}
const elemntsDom = {
  elemntAppend, elemntReplace, insertElemntsBefore, insertElemntsAfter, deleteElement
}
export default elemntsDom;