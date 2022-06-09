export default class Recette {
  /**
     * @constructs
     * @param {data} data // data contenu dans le fichier json des recettes
     */
  constructor(data){
    this.Id = data.id
    this.ingredients = data.ingredients
    this.ustensils = data.ustensils
    this.Name = data.name
    this.visible = true
    this.quantity = data.quantity
    this.unit = data.unit
    this.description = data.description
    this.appareils = data.appareils
    this.time = data.time
    Recette.instances = [...Recette.instances, this]
  }
  static instances = []
  /**
   * @returns {HTMLElement}
   */
  displayRecipeCard = () => {
    //======== instanciation des const
    const mainDIv = document.createElement('article')
    const recetteImg = document.createElement('img')
    const recetteDescription = document.createElement('div')
    const ingredientsRecette = document.createElement('ul')
    const recetteDescriptionTop = document.createElement('div')
    const recetteDescriptionBttm = document.createElement('div')
    const recetteMetodology = document.createElement('p')
    //============ elmnts setattribute
    mainDIv.setAttribute('class', 'recipes')
    recetteImg.setAttribute('class', 'recipes-img')
    recetteImg.setAttribute('src', '../imageCardRecipe/img3x3.png')
    recetteDescription.setAttribute('class', 'recipes__description')
    ingredientsRecette.setAttribute('class', 'ingredients-list')
    recetteDescriptionBttm.setAttribute('class', 'recipes__description__bottom')
    recetteDescriptionTop.setAttribute('class', 'recipes__description__top')
    //========= elmnt rendu HTML
    recetteDescriptionTop.innerHTML = ` <h1 class="name">${this.name}</h1> <span class="duration"><i class="far fa-clock"></i>${this.time} min</span>`
    this.ingredientsRecette.forEach(ingredient => {
      ingredientsRecette.innerHTML += `<li class="ingredients-list__item"><span>${ingredient.ingredient}: </span>${ingredient.quantity} ${ingredient.unit || ''}</li>`
    })
    recetteMetodology.setAttribute('class', 'process')
    //========== mise en place de l'ellipsis sur le processus de fabrication de la recette pour eviter un text trop long
    if(this.description.length >= 200){
      recetteMetodology.innerText = recetteMetodology.trunc(200)
    } else {
      recetteMetodology.innerText = this.description
    }
    //======= ajout des elements dans leur emplacements via la methode appendChild déjà utilisé
    mainDIv.appendChild(recetteImg, recetteDescription)
    recetteDescriptionBttm.appendChild(ingredientsRecette, recetteMetodology)
    recetteDescription.appendChild(recetteDescriptionTop, recetteDescriptionBttm)
    this.element = mainDIv
    return mainDIv
  }
  //=========== 
  ShowHiddenToggle = () => {
    this.element.classList.toggle('hidden')
    this.visible = !this.visible
  }
}