//=============
import tools from "../Tools/Tools.js";
import Recette from "./Class_Recipe.js";
//import  {removeAccents}  from "../Tools/Remove_accents_input.js";
//============
export default class DropdownFilters{
  /**
   * @constructs
   * @param {*} type //=====
   * @param {*} items //=====
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
    const mainDiv = document.createElement('div'); //=== creation de la div parent 
    const filterInput = document.createElement('input'); //====== creation de l'input 
    const filterLabel = document.createElement('p'); //===== creation du label
    const filterMsgError = document.createElement('p'); //===== creation du paragraphe contenant le message d'erreur 
    const filterIcon = document.createElement('i'); //====== creation de l'icon 
    const filterUl = document.createElement('ul'); //====== ceration de la list ul 
    //=========== mise en place des elements des constantes
    mainDiv.setAttribute('class', `dropdown-item dd-${this.type}`);
    mainDiv.setAttribute('data-state', 'close');
    //============ setattribute input
    filterInput.setAttribute('type', 'text');
    filterInput.setAttribute('class', 'dropdown-item__input');
    filterInput.setAttribute('id', `${this.type}-input`);
    filterInput.setAttribute('name', `${this.type}-input`);
    filterInput.setAttribute('placeholder', `Rechercher un ${this.label}`);
    //========== setattribute label
    filterLabel.setAttribute('class', 'dropdown-item__label');
    filterLabel.innerText = `${this.label}s`;
    //============= setaatribute icon
    filterIcon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
    this.closeIcon = filterIcon;
    //============set attribute list itemp dropdown
    filterUl.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);
    //=========== remplissage des list creer avec les elements via la methode appendChild
    this.items.forEach(item => {
      filterUl.appendChild(item.listElement());
      this.tagList = [...this.tagList, item];
    });
    //======== setattribute msg error
    filterMsgError.setAttribute('class', 'empty_msg');
    filterMsgError.style.fontSize = "18px"
    filterMsgError.style.color="";
    filterMsgError.innerText = "Aucun filtre disponible";
    //=========== ajout des elements enfants dans les elements parents via la méthode appendchild
    filterUl.appendChild(filterMsgError);
    //================
    mainDiv.appendChild(filterInput);
    // mainDiv.append(removeAccents);
    mainDiv.appendChild(filterLabel);
    mainDiv.appendChild(filterIcon);
    mainDiv.appendChild(filterUl);
    //========== ajout des ecouteurs d'evenemnts au click afin d'ouvrir le contenu d'un des filtres et aussi un eventelistener sur l'input afin d'afficher les eleemnts correspondant à la recherche utilisateur
    mainDiv.addEventListener('click', this.open)
    //=========
    filterInput.addEventListener('input', this.DropdownInputResearch)
    this.element = mainDiv;
  }
  /**
     * @param {InputEvent} e 
     */
  //============= rechercher dans la liste des tags si il y a des tags qui correspondent à la recherche de l'utilisateur 
  DropdownInputResearch = (e) => {
    const content = e.target.value.toLowerCase();
    if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >= 3)) {
      this.element.classList.add('entries');
      this.tagList.forEach(tag => {
        const str = tag.name.toLowerCase();
        if (str.includes(content)) {
          tag.listElementRes.classList.remove('hidden-by-keydown');
        }else{
          tag.listElementRes.classList.add('hidden-by-keydown');
        }
      })
    }else{
      this.element.classList.remove('entries');
      this.tagList.forEach(tag => {
        tag.listElementRes.classList.remove('hidden-by-keydown');
      })
    }
    /*if (!/^([^0-9]*)$/.test(content.value)) { // regex 
      return false;
    }*/
    DropdownFilters.visibleVoidRecipesMsg()  
  }
  /**
     * @param {PointerEvent} f 
     */
  //=============== ouverture du menu DD si l'utilisateur click sur l'icon arrow down
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
  //=============== fermeture du menu DD si l'utilisateur click a nouveau sur l'icon qui se transform en arrow up et si jamais il click en dehors du menu DD cela ferme aussi le menu 
  close = (g) => {
    if (tools.closeFiltersDd(g.target, this.element) || g.target === this.closeIcon) {
      this.element.setAttribute('data-state', 'close');
      document.removeEventListener('click', this.close);
      this.element.addEventListener('click', this.open);
    }
  }
  //============== fonction permettant de mettre à jour chacune des listes DD
  static dropdownMajFilters = () => {
    const recipes = Recette.instances.filter(recipe => recipe.visible );
    const lis = document.querySelectorAll('.dropdown-item__list li');
    lis.forEach(li => li.classList.add('hidden-by-tags'));
    //========= MAJ des appareils de la liste du DD
    recipes.forEach(recipe => {
      const appareils = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.appareils}"]`);
      appareils.forEach(appareil => appareil.classList.remove('hidden-by-tags'));
      //====== MAJ des ingredients de la liste du DD
      const ingredients = recipe.ingredients;
      ingredients.forEach(current => {
        const ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`);
        ingredientElement.classList.remove('hidden-by-tags');
      })
      //======== MAJ des ustensils de la liste du DD
      const ustensils = recipe.ustensils;
      ustensils.forEach(current => {
        const ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`);
        ustensilElement.classList.remove('hidden-by-tags');
      })
    })
    //======= mise en place d'un setTimeOut qui permettra d'afficher le msg d'erreur pour l'utilisateur si nécessaire , à la fin de la boucle d'events
    setTimeout(() => {
      DropdownFilters.visibleVoidRecipesMsg()  
    }, 0);
  }
  //===============
  /* function errorMsg <= non fonctionnel */ /*============= mise en place de la fonction qui permet d'afficher un msg d'erreur dans le cas ou la saisie de l'utilisateur ne rempli pas certaine condition */
  static visibleVoidRecipesMsg = () => {
    const ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
    const appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
    const ustensil = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)');
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
    if (ustensil.length === 0) {
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