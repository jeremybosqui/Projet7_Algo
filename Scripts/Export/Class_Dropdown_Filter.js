'use strict'

export class DropdownFilter {
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































}
