
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
  //========= creation du tag qui aura un style de list à intégrer dans le dropdown 
  /**
   * @returns {HTMLElement}
   */
  ListTags = () => {
    if (this.ListTagsDd) {return this.ListTagsDd}
    const elementsTags = document.createElement('li')
    elementsTags.setAttribute('data-value', this.name)
    elementsTags.innerText = this.name
    //======= ajout de l'eventlistener pour ajouter le tag sur lequel l'utilisateur va cliquer dans la barre de tags créé
    elementsTags.addEventListener('click', this.ajtTag)
    this.ListTagsDd = elementsTags
    return elementsTags
  }
  //========= ajouter un tag qui sera le tag actif afficher sur la page
  ajtTag = () => {

  }

  //======== enlever le tag actif qui sera afficher sur la page
  removeTag = () => {

  }
    
}