/** 
 * @param {HTMLElement} target 
 * @param {HTMLElement} ref 
 * @returns {boolean}
 */
//===== mise en place du clickout qui permet de controler si le click à lieu à l'exterieur d'un element de la liste
const closeFiltersDd = (target, ref) => {
  return !ref.contains(target)
}
/**
* @param {string} str 
* @param {number} index 
* @returns 
*/ 
//===== tronquer une chaine de caractère et utiliser ellispsis pour la racourcir 
const truncateStringEllipsis = (str, index) => {
  let strSliced = str.slice(0, index);
  let strSplited = strSliced.split(' ');

  return strSliced.slice(0, (index - strSplited[strSplited.length - 1].length) - 1) + "...";
}
const tools = {
  closeFiltersDd, truncateStringEllipsis
}
export default tools;