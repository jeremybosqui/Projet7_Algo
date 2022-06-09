
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
    const mainContent = document.createElement('div') //
    const filterInput = document.createElement('input') //
    const filterLabel = document.createElement('label') //
    const filterIcon = document.createElement('i') //
    const filterUl = document.createElement('ul') //
    const filterMsgError = document.createElement('p') //

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

    //======= filterUl setattribute
    filterUl.setAttribute('class', `dropdown-item__list ${this.type}-dropdown`)
    //======= ajout des elements dans la list
    this.items.forEach(item => {
      filterUl.appendChild(item.listElement())
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
    if (searchContent.length >= 3 || (e.inputType === 'deleteContentBackward' && searchContent.length >= 3)){
      this.element.classList.add('entries')
      this.ListofTags.forEach(tag => {
        const searchString = tag.name
        if(searchString.includes(searchContent)) {
          tag
        }
      })
    }
  }



























  
}
