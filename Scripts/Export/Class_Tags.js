//============== mise en place des imports
import elemntsDom from "../Tools/Elements_dom.js";
import algoRecherche from "../Tools/Algo_FInal_Recherche.js";
import Recette from "./Class_Recipe.js";
//============
export default class Tags{
  /**
   * @constructs
   * @param {*} type 
   * @param {*} name 
   */
  constructor(type, name) {
    this.type = type;
    this.name = name.toLowerCase();
    Tags.instances = [...Tags.instances, this];
  }
  static instances = [];
  static active = []
  /**
     * @returns {HTMLElement}
     */
  //=========== creation du rendu visuel d'un tag
  viewElemntTag = () => {
    if (this.tagRes) { return this.tagRes; }
    const element = document.createElement('li');
    const removeTagIcon = document.createElement('i');
    //==============
    element.setAttribute('class', `tag tag-${this.type}`);
    element.innerText = this.name;
    //=======
    removeTagIcon.setAttribute('class', 'far fa-times-circle tag__icon');
    //======
    removeTagIcon.addEventListener('click', this.removeTag)
    //======== ajout de l'element icon dans l'element li via la methonde appendChild
    element.appendChild(removeTagIcon);
    this.tagRes = element;
    return element;
  }
  /**
     * @returns {HTMLElement}
     */
  listElement = () => {
    if (this.listElementRes) { return this.listElementRes; }
    const element = document.createElement('li');
    element.setAttribute('data-value', this.name);
    element.innerText = this.name;
    //============ ajout de l'eventlistener pour ajouter un tag au click de l'utilisateur
    element.addEventListener('click', this.addTag);
    //==============
    this.listElementRes = element;
    return element;
  }
  //========== ajoute un tag sur la page si l'utilisateur click sur element present dans les listes des menus dropdown
  addTag = () => {
    Tags.active = [...Tags.active, this];
    elemntsDom.elemntAppend(this.viewElemntTag(), document.getElementById('listOftags'));
    algoRecherche(Tags.active, Recette.instances);
    this.listElementRes.classList.add('already-selected');
  }
  //========== retire un tag de la page si l'utilisateur click sur l'icon du tag qui est apparu apres l'ajout
  removeTag = () => {
    const newActiveTags = Tags.active.filter(tag => tag !== this);
    Tags.active = newActiveTags;
    elemntsDom.deleteElement(this.viewElemntTag());
    algoRecherche(Tags.active, Recette.instances);
    this.listElementRes.classList.remove('already-selected');
  }
}