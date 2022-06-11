/**
 * @param {HTMLElement} target 
 * @param {HTMLElement} ref 
 * @returns {boolean}
 */
const closeFiltersDd = (target, ref) => {
  return !ref.contains(target)
}
/**
* @param {string} str 
* @param {number} index 
* @returns 
*/
const truncateStringEllipsis = (str, index) => {
  let strSliced = str.slice(0, index);
  let strSplited = strSliced.split(' ');

  return strSliced.slice(0, (index - strSplited[strSplited.length - 1].length) - 1) + "...";
}
const tools = {
  closeFiltersDd, truncateStringEllipsis
}
export default tools;