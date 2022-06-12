//==============
export default class Api{ 
  static recipes = [];
  static allIngredients = [];
  static allAppliances = [];
  static allUstensils = [];
  //=========== simulation d'une connection à la base de donnée recipes.json
  static init = async () => {
    /*fetch('./recipes.json').then(function(response) {
      if(response.ok) {
        response.blob()
      }
    } )*/
    /*const response = await fetch('./recipes.json')
    const req = await response.json()
    console.log(req)
  }
loadRecipe()*/
    const req = await fetch('./recipes.json');
    const data = await req.json();
    if (req.ok) {
      console.log("Appel api réussi")
    }else {
      throw "Appel api échoué";
    }
    Api.recipes = data.recipes;
  }
  /** ceci permet de recuperer tous les ingredients de toutes les recettes et retourne un tableau dans lequel ils seront contenu
   * @returns {array} 
   */
  static getAllIngredients = () => {

    if (Api.allIngredients.length === 0) {
      Api.recipes.forEach(recipe => {
        recipe.ingredients.map( ingredients => {
          const ingredient =  ingredients.ingredient;
          if (!Api.allIngredients.includes(ingredient.toLowerCase())) {
            Api.allIngredients = [...Api.allIngredients, ingredient.toLowerCase()];
          }
        })
      })
    }
    return Api.allIngredients;
  }
  /** ceci permet de recuperer tous les appareils et de retourne un tableau dans lequel ils seront contenu
   * @returns {array} 
   */
  static getAllAppliances = () => {
    if (Api.allAppliances.length === 0) {
      Api.recipes.forEach(recipe => {
        if (!Api.allAppliances.includes(recipe.appliance.toLowerCase())) {
          Api.allAppliances = [...Api.allAppliances, recipe.appliance.toLowerCase()];
        }
      })
    }
    return Api.allAppliances;
  }
  /** ceci permet de recuperer tous les ustensils et retourne un tableau dans lequel ils seront tous contenu 
   * @returns {array} 
   */
  static getAllUstensils = () => {
    if (Api.allUstensils.length === 0) {
      Api.recipes.forEach(recipe => {
        recipe.ustensils.map( ustensile => {
          if (!Api.allUstensils.includes(ustensile.toLowerCase())) {
            Api.allUstensils = [...Api.allUstensils, ustensile.toLowerCase()];
          }
        })
      })
    }
    return Api.allUstensils;
  }
  //=========== ceci permet de recuperer toutes les recettes qui existent dans le fichier
  static getAllRecipes = () => {
    return Api.recipes;
  }
  /**
   * @param {number} id correspond à l'id d'une recette du fichier json
   */
  static getRecipe = (id) => {
    const recette = Api.recipes.filter(recipe => recipe.id === id);
    if (recette.length === 1) {
      console.log("recette ok");
      return;
    } else {
      console.error("Recette introuvable.");
    }
    return recette[0];
  }
}