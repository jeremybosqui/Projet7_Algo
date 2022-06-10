//

export default class api {
 
  static recettes = []
  static LsIngredients = []
  static LsAppliances = []
  static LsUstensils = []  

  //

  static requete = async () => {
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
    const request = await fetch ('./recipes.json')
    const data = await request.json()
    api.recettes = data.recipes
    if (request.ok) {
      console.log("Appel api réussi")
    } else {
      throw"Appel api échoué"
    }
  }
  
  /**
   * @returns {array}
   */
  static setIngredients = () => {

    if (api.LsIngredients.length === 0) {
      api.recettes.forEach(recette => {
        recette.ingredients.map(ingredients => {
          const ingredient = ingredients.ingredient
          if (api.LsIngredients.includes(ingredient)) {
            api.LsIngredients = [...api.LsIngredients, ingredient]
          }
        })
      })
    }
    return api.LsIngredients
  }

  /**
 * @returns {array}
 */
  static setUstensils = () => {
    if (api.LsUstensils.length === 0){
      api.recettes.forEach(recette=> {
        recette.ustensils.map(ustensil => {
          if (!api.LsUstensils.includes(ustensil)){
            api.LsUstensils = [...api.LsUstensils, ustensil]
          }
        })
      })
    }
    return api.LsUstensils
  }
  /**
   * @returns {array}
   */
  static setAppliances = () => {
    if (api.LsAppliances.length === 0) {
      api.recettes.forEach(recette => {
        if (!api.LsAppliances.includes(recette.appliance)) {
          api.LsAppliances = [...api.LsAppliances, recette]
        }
      })
    }
    return api.LsAppliances
  }

  static setEvryRecipes = () => {
    return api.recettes
  }

  /**
  * @param {number} // récupérer une recette par rapport à son id
  * @returns {object} // init object dans lequel il y a les détails de recette
  */
  static setRecette = (id) => {
    const recette = api.recettes.filter (recette => recette.id === id)
    if (recette.length === 1) {
      console.log("Aucun soucis de recette")
    } else {
      console.error("Recette indisponible")
    }
    return recette
  }

}
