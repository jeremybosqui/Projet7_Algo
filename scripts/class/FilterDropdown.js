import utils from "../modules/utils.js";
import Recipe from "./Recipe.js";

export default class FilterDropdown{
  constructor(type, items) {
    this.type = type;
    this.items = items;
    this.label = (type === "ingredient") ? "ingrédient" : type;
    this.tagList = [];
    this.create();

    FilterDropdown.instances = [...FilterDropdown.instances, this];
  }

  static instances = [];


  // Créer la vue du filtre "dropdown"
     
  create = () => {
    // Création de contenant
    let container = document.createElement('div');
    container.setAttribute('class', `dropdown-item dd-${this.type}`);
    container.setAttribute('data-state', 'close');

    // Création du champ de recherche
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'dropdown-item__input');
    input.setAttribute('id', `${this.type}-input`);
    input.setAttribute('name', `${this.type}-input`);
    input.setAttribute('placeholder', `Rechercher un ${this.label}`);

    // Ajout d'un écouteur de saisie dans le champ de recherche
    input.addEventListener('input', this.search)

    // Création du label
    let label = document.createElement('p');
    label.setAttribute('class', 'dropdown-item__label');
    label.innerText = `${this.label}s`;

    // Création de l'icon
    let icon = document.createElement('i');
    icon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon');
    this.closeIcon = icon;

    // Création de la liste d'élement
    let list = document.createElement('ul');
    list.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`);

    // Remplissage de la liste 
    this.items.forEach(item => {
      list.appendChild(item.listElement());
      this.tagList = [...this.tagList, item];
    });

    // creation et ajout du message "aucun filtre disponible"
    let emptyMsg = document.createElement('p');
    emptyMsg.setAttribute('class', 'empty-msg');
    emptyMsg.innerText = "Aucun filtre disponible";
    
    list.appendChild(emptyMsg);

    // Ajout des éléments créer dans le contenant
    container.appendChild(input);
    container.appendChild(label);
    container.appendChild(icon);
    container.appendChild(list);

    // Ajout de l'écouteur de clique pour ouverture
    container.addEventListener('click', this.open)

    this.element = container;
  }

  /**
     * Recherche dans la liste de tags les tags correspondant à la saisie de l'utilisateur
     * @param {InputEvent} e 
     */
  search = (e) => {
    let content = e.target.value.toLowerCase();

    if (content.length >= 3 || (e.inputType === 'deleteContentBackward' && content.length >= 3)) {

      this.tagList.forEach(tag => {
        let str = tag.name.toLowerCase();
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
  }

  /**
     * Ouvre le dropdown au clique de l'utilisateur
     * @param {PointerEvent} e 
     */
  open = (e) => {
    e.stopPropagation();
        
    FilterDropdown.instances.forEach(dropdown => {
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
     * Ferme le dropdown si l'utilisateur clique sur l'icon ou si il clique en dehors de celui-ci
     * @param {PointerEvent} e 
     */
  close = (e) => {
        
    if (utils.clickOut(e.target, this.element) || e.target === this.closeIcon) {
      this.element.setAttribute('data-state', 'close');

      document.removeEventListener('click', this.close);
      this.element.addEventListener('click', this.open);
    }
  }
 
  // update des ustensils / ingredients / appareils dans le dropdown
  //
  static updateDropDowns = () => {
    let lis = document.querySelectorAll('.dropdown-item__list li');
    lis.forEach(li => li.classList.add('hidden-by-tags'));

    let recipes = Recipe.instances.filter(recipe => recipe.visible );
    //
    recipes.forEach(recipe => {
      let appareils = document.querySelectorAll(`.appareil-dropdown [data-value="${recipe.appareils}"]`);
      appareils.forEach(appareil => appareil.classList.remove('hidden-by-tags'));
        
      let ingredients = recipe.ingredients;
      ingredients.forEach(current => {
        let ingredientElement = document.querySelector(`.ingredient-dropdown [data-value="${current.ingredient.toLowerCase()}"]`);
        ingredientElement.classList.remove('hidden-by-tags');
      })

      let ustensils = recipe.ustensils;
      ustensils.forEach(current => {
        let ustensilElement = document.querySelector(`.ustensile-dropdown [data-value="${current.toLowerCase()}"]`);
        ustensilElement.classList.remove('hidden-by-tags');
      })
    })
    // mise en place du message d'erreur
  setTimeout(() => {
    FilterDropdown.showEmptyMessage()
  }, 0);
  }
  // affiche / n'affiche pas le msg d'erreur si l'element selectionné === 0
  static showEmptyMessage = () => {

    let ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hiddien-by-tags):not(.already-selected)');
    let appareil = document.querySelectorAll('appareil-dropdown li:not(.hidden-by-tags):not(.already-selected)');
    let ustensile = document.querySelectorAll('ustensile-dropdown li:not(.hidden-by-tags):not(.already-selected)');

    if (ingredient.length === 0) {
      document.querySelector('.ingredient-dropdown .empty-msg').classList.add('visbile');
    } else {
      document.querySelector('.ingredient-dropdown .empty-msg').classList.remove('visible');
    } 

    if (appareil.length === 0) {
      document.querySelector('.appareil-dropdown .empty-msg').classList.add('visible');
    } else {
      document.querySelector('.appareil-dropdown .empty-msg').classList.remove('visible');
    }

    if (ustensile.length === 0) {
      document.querySelector('.ustensile-dropdown .empty-msg').classList.add('visible');
    } else {
      document.querySelector('.ustensile-dropdown .empty-msg').classList.remove('visible');
    }

  }

}