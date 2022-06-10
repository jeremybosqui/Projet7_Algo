
// mise en place imports
//import { elemntsDom }from"../Tools/Elements_dom.js"
//import { Recette } from "./Class_Recipe.js"
//import {}
export default class Tags {
/**
 * @constructors
 * @param {type}
 * @param {name}
 */
  constructor(type, name) {
    this.type = type
    this.name = name
    Tags.elemnts = [...Tags.elemnts, this]
  }
  static elemnts = []
  static current = []
  /**
 *@returns {HTMLElement} 
 */
  //============ creation du rendu visuel d'un tag
  elementTag = () => {
    if (this.tagElmts) {return this.tagElmts}
    //======= instancier les const
    const LiElements = document.createElement('li')
    const removeTagselected = document.createElement('i')
    //======= mise en place du settattribute
    LiElements.setAttribute('class', `tag tag${this.type}`)
    LiElements.innerText = this.name
    removeTagselected.setAttribute('class', 'far fa-times-cricle tag__icon')
    //====== mise en place de l'eventlistener qui au click supprime un tag
    removeTagselected.addEventListener('click', this.removeTags)
    this.tagElmts = LiElements
    return LiElements
  }
  //========= ajouter un tag qui sera le tag actif afficher sur la page
  ajtTag = () => {

  }

  //======== enlever le tag actif qui sera afficher sur la page
  removeTag = () => {

  }
    
}