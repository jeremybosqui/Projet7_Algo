//============== mise en place des imports
import elemntsDom from "../Tools/Elements_dom.js";
import algo2Recherche from "../Tools/Algo_2_Recherche.js";
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
  viewElemntTag = () => {
    if (this.tagRes) { return this.tagRes; }
    const element = document.createElement('li');
    const deleteBtn = document.createElement('i');
    //==============
    element.setAttribute('class', `tag tag-${this.type}`);
    element.innerText = this.name;
    //=======
    deleteBtn.setAttribute('class', 'far fa-times-circle tag__icon');
    //======
    deleteBtn.addEventListener('click', this.removeTag)
    //========
    element.appendChild(deleteBtn);
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
    //============
    element.addEventListener('click', this.addTag);
    //==============
    this.listElementRes = element;
    return element;
  }
  //==========
  addTag = () => {
    Tags.active = [...Tags.active, this];
    elemntsDom.elemntAppend(this.viewElemntTag(), document.getElementById('listOftags'));
    algo2Recherche(Tags.active, Recette.instances);
    this.listElementRes.classList.add('already-selected');
  }
  //==========
  removeTag = () => {
    const newActiveTags = Tags.active.filter(tag => tag !== this);
    Tags.active = newActiveTags;
    elemntsDom.deleteElement(this.viewElemntTag());
    algo2Recherche(Tags.active, Recette.instances);
    this.listElementRes.classList.remove('already-selected');
  }
}