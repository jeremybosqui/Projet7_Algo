import tools from '../Tools/Tools.js'

export default class Recette{
  /**
   * @constructs
   * @param {*} data 
   */
  constructor(data){
    this.ustensils = data.ustensils;
    this.servings = data.servings;
    this.id = data.id;
    this.name = data.name;
    this.quantity = data.quantity;
    this.unit = data.unit;
    this.appareils = data.appliance.toLowerCase();
    this.ingredients = data.ingredients;
    this.description = data.description;
    this.time = data.time;
    this.visible = true;
    Recette.instances = [...Recette.instances, this];
  }
  //======
  static instances = [];
  /**
     * @returns {HTMLElement}
     */
  displayRecipeCard = () => {
    const container = document.createElement('article');
    const image = document.createElement('img');
    const descTop = document.createElement('div');
    const description = document.createElement('div');
    const ingredients = document.createElement('ul');
    const process = document.createElement('p');
    const descBottom = document.createElement('div');
    //========
    image.setAttribute('class', 'recipes__img');
    image.setAttribute('src', 'Scripts/imageCardRecipe/carre 380 x 300.png');
    //==========
    descBottom.setAttribute('class', 'recipes__description__bottom');
    //=========
    container.setAttribute('class', 'recipes');
    //============
    description.setAttribute('class', 'recipes__description');
    //============
    descTop.setAttribute('class', 'recipes__description__top');
    //============
    descTop.innerHTML = `
        <h2 class="name">${this.name}</h2>
        <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>`;
    //=========
    ingredients.setAttribute('class', 'ingredients-list');
    this.ingredients.forEach(ingredient => {
      ingredients.innerHTML += `<li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit || ''}</li>`;
    });
    //=========
    process.setAttribute('class', 'process');
    if (this.description.length >= 200) {
      process.innerText = tools.truncateStringEllipsis(this.description, 200);
    }else{
      process.innerText = this.description;
    }
    //==========
    descBottom.appendChild(ingredients);
    descBottom.appendChild(process);
    //========
    description.appendChild(descTop);
    description.appendChild(descBottom);
    //===========
    container.appendChild(image);
    container.appendChild(description);
    //==========
    this.element = container;
    //=========
    return container;
  }
  //==============
  ShowOrHideToggle = () => {
    this.element.classList.toggle('hidden');
    this.visible = !this.visible;
  }
}