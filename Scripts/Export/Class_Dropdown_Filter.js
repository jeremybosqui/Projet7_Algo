// import { errorMsg } from "./Filter_Msg_Error.js"
//=====================
export default class DropdownFilter {
  /**
     * @constructs
     * @param {type} type // type de l'element selectionné
     * @param {items} items // correspond aux items de la liste de tags
     */
  constructor (type,items) {
    this.type = type
    this.items = items
    this.label = type === "ingredient" ? "ingredient" : type // utilisation d'operateur ternaire pour rendre le code plus clair
    this.ListofTags = []
    this.setFilterView()
    DropdownFilter.instances = [...DropdownFilter.instances, this]
  }
  static instances = []
 
  /* get html () {
    return `<div class ="dropdown-item dd-${this.type} data-state="close"></div>
    <input type="text" class="dropdown-item__input" id="${this.type}-input" name="${this.type}-input" placeholder="Rechercher un ${this.label}"></input>
    <p class="dropdown-item__label">${this.label}</p>
    <i class="fas fa-chevron-down dropdown-item__icon"></i>
    <ul class="dropdown-item__list ${this.type}-dropdown"></ul>
    ` 
  } */
  setFilterView = () => {
    // build view, instancier les const
    const mainContent = document.createElement('div') // creation de la div parent
    const filterInput = document.createElement('input') // creation de l'input champ de recherche
    const filterLabel = document.createElement('label') // creation du label
    const filterIcon = document.createElement('i') // creation de l'icon sur laquel l'eventlistener sera fixé
    const filterUl = document.createElement('ul') // creation de la liste des elements
    const filterMsgError = document.createElement('p') // creation du paragraphe contenant le message d'erreur

    // mise en place des elements des constantes
    //======== mainContent setattribute
    mainContent.setAttribute('class', `dropdown-item dd-${this.type}`)
    mainContent.setAttribute('data-state', 'close') // add data-state afin de savoir si le menu dropdown dd est open ou close et instancier l'ouverture ou la fermeture au clique de l'utilisateur
    //======== filterInput setattribute
    filterInput.setAttribute('type', 'text')
    filterInput.setAttribute('class', 'dropdown-item__input')
    filterInput.setAttribute('id', `${this.type}-input`)
    filterInput.setAttribute('name', `${this.type}-input`)
    filterInput.setAttribute('placeholder', `Recherche un ${this.label}`)
    //======= filterLabel setattribute
    filterLabel.setAttribute('class', 'dropdown-item__label')
    filterLabel.innerText = `${this.label}s`
    //======= filterIcon setattribute
    filterIcon.setAttribute('class', 'fas fa-chevron-down dropdown-item__icon')
    this.IconClose = filterIcon
    //======= filterUl setattribute
    filterUl.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`)
    //======= ajout des elements dans la list
    this.items.forEach(item => {
      filterUl.appendChild(item.ListTags())
      this.ListofTags = [...this.ListofTags, item]
    })
    //======= filterMsgError setattribute , instanciation du message d'erreur
    filterMsgError.setAttribute('class', 'error-msg')
    filterMsgError.style.fontSize = '15px'
    filterMsgError.style.color = 'brown'
    //filterMsgError.style.fontWeight = '300'
    filterMsgError.innerText = "Aucun filtre disponible"
    //======= ajout du msg d'erreur dans la partie du dropdown filter via la méthode appenChild
    filterUl.appendChild(filterMsgError)
    //======= ajout des autres elements creer en utilisant la méthode appenChild
    mainContent.appendChild(filterInput, filterLabel, filterIcon, filterUl)
    //======= ajout des ecouteurs d'evenements 
    mainContent.addEventListener('click', this.open)
    filterInput.addEventListener('input', this.TagResearch)
    this.element = mainContent
  }

  //========= instancier la fonction permettant de rechercher dans la liste de tags des tags correspondant à la recherche de l'utilisateur
  /**
   * @param {InputEvent} e
   */
  TagResearch = (e) => {
    const searchContent = e.target.value
    if (searchContent.length >= 3 || (e.inputType === 'deleteContentBackward' && searchContent.length >= 3)){ // mise en place des conditions qui permettent la recherche à savoir le nombre de caractères rentré dans l'input qui doivent obligatoirement être de 3 minimum
      this.element.classList.add('entries')
      this.ListofTags.forEach(tag => {
        const searchString = tag.name
        if(searchString.includes(searchContent)) {
          tag.ListTagsDd.classList.remove('hidden-by-keydown')
        } else {
          tag.ListTagsDd.classList.add('hidden-by-keydown')
        }
      })
    }else {
      this.element.classList.remove('entries')
      this.ListofTags.forEach(tag => {
        tag.ListTagsDd.classList.remove('hidden-by-keydown')
      })
    }
    DropdownFilter.errorMsg()
  }
  //========== mise en place de l'ouverture du dropdown au clique 
  /**
   * @param {PointerEvent} f
   */
  open = (f) => {
    f.stopPropagation();
    DropdownFilter.instances.forEach(dropdown => {
      if(dropdown.element.getAttribute('data-state') === 'open' && dropdown.element !== this.element){
        dropdown.element.setAttribute('data-state', 'close')
        document.removeEventListener('click', dropdown.close)
        dropdown.element.addEventListener('click', dropdown.open)
      }
    })
    if(this.element.getAttribute('data-state') === 'close'){
      this.element.setAttribute('data-state', 'open')
      this.element.removeEventListener('click', this.open)
      document.addEventListener('click', this.close)
    }
  }
  //========= fermeture du dropdown au clique de l'utilisateur s'il clique sur l'icon arrow-down ou si il clique en dehors de cette icon
  /**
   * @param {PointerEvent} g 
   */
  close = (g) => {
    if(tools.CloseFilter(g.target, this.element) || g.target === this.IconClose) {
      this.element.setAttribute('data-state', 'close')
      document.removeEventListener('click', this.close)
      this.element.addEventListener('click,', this.open)
    }
  } 
  //======== mise en place de la fonction permettant de mettre à jour les list de tags dropdown ingredient / appareils / ustensils 
  static MajDropdown = () => {
    const allLi = document.querySelectorAll('.dropdown-item__list li')
    allLi.forEach(li => li.classList.add('hidden-by-tags'))

    const Recettes = Recettes.instances.filter(Recette => Recette.visible)
    
    Recettes.forEach(Recette => {
      //==========
      const Appareils = document.querySelectorAll(`.appareil-dropdown[data-value="${Recette.Appareils}"]`)
      Appareils.forEach(Appareil=> Appareil.classList.remove('hidden-by-tags'))
      //=========
      const Ingredients = Recette.Ingredients
      Ingredients.forEach(current => {
        const IngredientsElements = document.querySelector(`.ingredient-dropdown [data-value="${current.Ingredient}"]`)
        IngredientsElements.classList.remove('hidden-by-tags')
      })
      //========
      const Ustensils = Recette.Ustensils
      Ustensils.forEach(current => {
        const UstensilsElements = document.querySelector(`.ustensile-dropdown [data-value="${current}"]`)
        UstensilsElements.classList.remove('hidden-by-tags')
      })
    })
  }
  
  /* function errorMsg <= non fonctionnel */ /*============= mise en place de la fonction qui permet d'afficher un msg d'erreur dans le cas ou la saisie de l'utilisateur ne rempli pas certaine condition */ static errorMsg = () => {
  //========== ingredients
    const ingredient = document.querySelectorAll('.ingredient-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)')
    if (ingredient.length === 0){
      document.querySelector('.ingredient-dropdown .error-msg').classList.add('visible')
    } else {
      document.querySelector('.ingredient-dropdown .error-msg').classList.remove('visible')
    }
    //============= appareils
    const appareil = document.querySelectorAll('.appareil-dropdown li:not(.hidden-by-tags):not(.already-selected):not(.hidden-by-keydown)')
    if(appareil.length === 0) {
      document.querySelector('.appareil-dropdown .error-msg').classList.add('visible')
    }else{
      document.querySelector('.appareil-dropdown .error-msg').classList.remove('visible')
    }
    //======= ustensils
    const ustensils = document.querySelectorAll('.ustensile-dropdown li:not(.hidden-by-tags):not(.hidden-by-keydown):not(.already-selected)')
    if(ustensils.length === 0) {
      document.querySelector('.ustensile-dropdown .error-msg').classList.add('visible')
    }else{
      document.querySelector('.ustensile-dropdown .error-msg').classList.remove('visible')
    }
  }
}
//============== mise en place de la const qui permet de controler ou se fait le clique , si'il à lieu à l'exterieur d'un element
/**
 * @param {HTMLElement} target ceci est l'element cliqué
 * @param {HTMLElement} ref ceci est l'element de reference
 * @returns {boolean}
 */
const CloseFilter = (target, ref) => {
  return !ref.contains(target)
}

const tools = {
  CloseFilter
}
