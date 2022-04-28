// instanciation de l'API 

export default class Api {
    // utilisation de la propriété static qui sont généralement des fonctions utilitaires qui peuvent permettre de créer ou de cloner des objets par exemple qui sont appelées sur la classe elle-même et pas sur le "prototype"
    static recipes = []
    static allIngredients = []
    static allAppliances = []
    static allUstensils = []

    // connexion à la base de donnée via le fichier json contenant les données des recettes
    static init = async () => {
        const req = await fetch ('../recipes.json')
        if(!req.ok) {
            throw "Données momentanément indisponible"
        }
        const data = await req.json()
        Api.recipes = data.recipes
    }

    /**
     * recupere tous les ingrédents de toutes les recettes
     *  @returns {array} instancier le tableau qui va contenir tous les ingrédents de toutes les recettes
     */
    static getAllIngredients = () => {
        
        if (Api.allIngredients.length === 0) {
            Api.recipes.forEach(recipe => { // instancier une boucle forEach pour boucler sur chacun des ingredient
                recipe.ingredient.map ( ingredients => { // utilisation de la methode map() qui crée un nouveau tableau avec les résultats de l'appel d'une fonction fournie sur chaque élément du tableau appelant
                    const ingredient = ingredients.ingredient
                    
                    if (!Api.allIngredients.includes(ingredient.toLowerCase())) {
                        Api.allIngredients = [...Api.allIngredients, ingredient.toLowerCase()]
                    }
                })
            })
        }

        return Api.allIngredients
    }
    /**
     * recupere tous les appareils de toutes les recettes
     *  @returns {array} instancier le tableau contenant tous les appareils de toutes les recettes
     */
    static getAllAppliances = () => {

        if (Api.allAppliances.length === 0) {
            Api.recipes.forEach ( recipe => {
                if (!Api.allAppliances.includes(recipe.allAppliances.toLowerCase())) {
                    Api.allAppliances = [...Api.allAppliances, recipe.appliance.toLowerCase()]
                }
            })
        }

        return Api.allAppliances
    }
         
    /**
     * recupere tous les ustensils de toutes les recettes
     *  @return {array}
     */
    static getAllUstensils = () => {

        if(Api.allUstensils.length === 0) {
            Api.recipes.forEach(recipe => {
                recipe.ustensils.map ( ustensile => {
                    
                    if (!Api.allUstensils.includes(ustensile.toLowerCase())) {
                        Api.allUstensils = [...Api.allUstensils, ustensile.toLowerCase()]
                    }
                })
            })
        }

        return Api.allUstensils
    }

    // recuparation de toutes les recettes existantes
    static getAllRecipes = () => {
        return Api.recipes
    }

    /**
     * recupere une recette avec son ID
     *  @param {number} id
     *  @returns {object} objet contenant tous les details de la recette
     */
    static getRecupe = (id) => {
        const recipe = Api.recipes.filter(recipe => recipe.id === id)
        
        if (recipe.length !==1) {
            console.error("Recette introuvable.")
            return
        }
        return recipe[0]
    }

}
