//=============
import tools from "../Tools/Tools.js";
import Recette from "./Class_Recipe.js";
//import  {removeAccents}  from "../Tools/Remove_accents_input.js";
//============
export default class DropdownFilters{
  /**
   * @constructs
   * @param {*} type //
   * @param {*} items //
   */
  constructor(type, items) {
    this.type = type;
    this.items = items;
    this.label = type === "ingredient" ? "ingrédient" : type; // utilisation d'operateur ternaire pour rendre le code plus clair
    this.tagList = [];
    this.setFilterView();
    //============
    DropdownFilters.instances = [...DropdownFilters.instances, this];
  }
  //==============
  static instances = [];
  /* get html () {
    return `<div class ="dropdown-item dd-${this.type} data-state="close"></div>
    <input type="text" class="dropdown-item__input" id="${this.type}-input" name="${this.type}-input" placeholder="Rechercher un ${this.label}"></input>
    <p class="dropdown-item__label">${this.label}</p>
    <i class="fas fa-chevron-down dropdown-item__icon"></i>
    <ul class="dropdown-item__list ${this.type}-dropdown"></ul>
    ` 
  } */
  //======== 
  setFilterView = () => {
    //============ build view, instancier les const
    const container = document.createElement('div');
    const input = document.createElement('input');
    const label = document.createElement('p');
    const emptyMsg = document.createElement('p');
    const icon = document.createElement('i');
    const list = document.createElement('ul');
    //=========== mise en place des elements des constantes
    container.setAttribute('class', `dropdown-item dd-${this.type}`);
    container.setAttribute('data-state', 'close');
    //============ setattribute input
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'dropdown-item__input');
    input.setAttribute('id', `${this.type}-input`);
    input.setAttribute('name', `${this.type}-input`);
    input.setAttribute('placeholder', `Rechercher un ${this.label}`);
    //========== setattribute label
    label.setAttribute('class', 'dropdown-item__label');
    label.innerText = `${this.label}s`;
    //============= setaatribute icon
    icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
    this.closeIcon = icon;
    //============set attribute list itemp dropdown
    list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);
    //=========== remplissage des list creer avec les elements via la methode appendChild
    this.items.forEach(item => {
      list.appendChild(item.listElement());
      this.tagList = [...this.tagList, item];
    });
    //======== setattribute msg error
    emptyMsg.setAttribute('class', 'empty_msg');
    emptyMsg.style.fontSize = "18px"
    emptyMsg.innerText = "Aucun filtre disponible";
    //=========== ajout des elements enfants dans les elements parents via la méthode appendchild
    list.appendChild(emptyMsg);
    //================
    container.appendChild(input);
    // container.append(removeAccents);
    container.appendChild(label);
    container.appendChild(icon);
    container.appendChild(list);
    //========== ajout des ecouteurs d'evenemnts au click afin d'ouvrir le contenu d'un des filtres et aussi un eventelistener sur l'input afin d'afficher les eleemnts correspondant à la recherche utilisateur
    container.addEventListener('click', this.open)
    //=========
    input.addEventListener('input', this.DropdownInputResearch)
    this.element = container;
  }
  /**
     * @param {InputEvent} e 
     */
  //============= 
  DropdownInputResearch = (e) => {
    const content = e.target.value.toLowerCase();
    if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >= 3)) {
      
      this.tagList.forEach(tag => {
        const str = tag.name.toLowerCase();
        if (str.includes(content)) {
          tag.listElementRes.classList.remove('hidden-by-keydown');
        }else{
          tag.listElementRes.classList.add('hidden-by-keydown');
        }
      })
    }else{
      
      this.tagList.forEach(tag => {
        tag.listElementRes.classList.remove('hidden-by-keydown');
      })
    }
    /*if (!/^([^0-9]*)$/.test(content.value)) { // regex pour la validation du nom
      return false;
    }*/
    DropdownFilters.visibleVoidRecipesMsg()  
  }
  /**
     * @param {PointerEvent} f 
     */
  //===============
  open = (f) => {
    f.stopPropagation(); 
    DropdownFilters.instances.forEach(dropdown => {
      if (dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element) {
        dropdown.element.setAttribute('data-state', 'close')
        document.removeEventListener('click', dropdown.close);
        dropdown.element.addEventListener('click', dropdown.open);
      }
    })
    if (this.element.getAttribute('data-state') === "close") {
      this.element.setAttribute('data-state', 'open');
      this.element.removeEventListener('click', this.open);
      document.addEventListener('click', this.close);
    }
  }
  /**
     * @param {PointerEvent} g 
     */
  //===============
  close = (g) => {
    if (tools.closeFiltersDd(g.target, this.element) || g.target === this.closeIcon) {
      this.element.setAttribute('data-state', 'close');
      document.removeEventListener('click', this.close);
      this.element.addEventListener('click', this.open);
    }
  }
  //==============
  static dropdownMajFilters = () => {
    const recipes = Recette.instances.filter(recipe => recipe.visible );
    const lis = document.querySelectorAll('.dropdown-item__list li');
    lis.forEach(li => li.classList.add('hidden-by-tags'));
    //=========
    recipes.forEach(recipe => {
      const appareils = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.appareils}"]`);
      appareils.forEach(appareil => appareil.classList.remove('hidden-by-tags'));
      //======
      const ingredients = recipe.ingredients;
      ingredients.forEach(current => {
        const ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`);
        ingredientElement.classList.remove('hidden-by-tags');
      })
      //========
      const ustensils = recipe.ustensils;
      ustensils.forEach(current => {
        const ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`);
        ustensilElement.classList.remove('hidden-by-tags');
      })
    })
    //=======
    setTimeout(() => {
      DropdownFilters.visibleVoidRecipesMsg()  
    }, 0);
  }
  //===============
  /* function errorMsg <= non fonctionnel */ /*============= mise en place de la fonction qui permet d'afficher un msg d'erreur dans le cas ou la saisie de l'utilisateur ne rempli pas certaine condition */
  static visibleVoidRecipesMsg = () => {
    const ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
    const appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
    const ustensile = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
    if (appareil.length === 0) {
      document.querySelector('.appareil-dropdown .empty_msg').classList.add('visible');
    }else{
      document.querySelector('.appareil-dropdown .empty_msg').classList.remove('visible');
    }
    if (ingredient.length === 0) {
      document.querySelector('.ingredient-dropdown .empty_msg').classList.add('visible');
    }else{
      document.querySelector('.ingredient-dropdown .empty_msg').classList.remove('visible');
    }
    if (ustensile.length === 0) {
      document.querySelector('.ustensile-dropdown .empty_msg').classList.add('visible');
    }else{
      document.querySelector('.ustensile-dropdown .empty_msg').classList.remove('visible');
    }
  }
}
//============== mise en place de la const qui permet de controler ou se fait le clique , si'il à lieu à l'exterieur d'un element
/*
 * @param {HTMLElement} target ceci est l'element cliqué
 * @param {HTMLElement} ref ceci est l'element de reference
 * @returns {boolean} 
 */
/* const CloseFilter = (target, ref) => {
  return !ref.contains(target)
}

const tools = {
  CloseFilter
} */ 