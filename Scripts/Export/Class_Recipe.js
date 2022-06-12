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
  //====== creation du rendu visuel d'une Card recette
  displayRecipeCard = () => {
    const mainContent = document.createElement('article');
    const recetteImage = document.createElement('img');
    const recetteDescripTop = document.createElement('div');
    const recetteDescript = document.createElement('div');
    const recetteIngredients = document.createElement('ul');
    const recetteMethod = document.createElement('p');
    const recetteDescriptBttm = document.createElement('div');
    //========img setattribute
    recetteImage.setAttribute('class', 'recipes__img');
    recetteImage.setAttribute('src', 'Scripts/imageCardRecipe/carre 380 x 300.png');
    //========== description bottom setattribute
    recetteDescriptBttm.setAttribute('class', 'recipes__description__bottom');
    //========= article setattribute
    mainContent.setAttribute('class', 'recipes');
    //============ description setaatribute
    recetteDescript.setAttribute('class', 'recipes__description');
    //============ description top setattribute
    recetteDescripTop.setAttribute('class', 'recipes__description__top');
    recetteDescripTop.innerHTML = `
        <h2 class="name">${this.name}</h2>
        <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>`;
    //=========
    recetteIngredients.setAttribute('class', 'ingredients-list');
    this.ingredients.forEach(ingredient => {
      recetteIngredients.innerHTML += `<li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit || ''}</li>`;
    });
    //=========
    recetteMethod.setAttribute('class', 'process');
    if (this.description.length >= 200) {
      recetteMethod.innerText = tools.truncateStringEllipsis(this.description, 200);
    }else{
      recetteMethod.innerText = this.description;
    }
    //========== ajout des elements dans leur emplacements via la methode appendChild déjà utilisé
    recetteDescriptBttm.appendChild(recetteIngredients);
    recetteDescriptBttm.appendChild(recetteMethod);
    //========
    recetteDescript.appendChild(recetteDescripTop);
    recetteDescript.appendChild(recetteDescriptBttm);
    //===========
    mainContent.appendChild(recetteImage);
    mainContent.appendChild(recetteDescript);
    //==========
    this.element = mainContent;
    //=========
    return mainContent;
  }
  //============== basculer la visibilité entre visible / non visible
  ShowOrHideToggle = () => {
    this.element.classList.toggle('hidden');
    this.visible = !this.visible;
  }
}