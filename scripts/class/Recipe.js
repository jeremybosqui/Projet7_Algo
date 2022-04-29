


export default class Recipe {

    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.appareils = data.appliance.toLowerCase()
        this.ingredients = data.ingredients
        this.servings = data.servings
        this.time = data.time
        this.visible = true

        Recipe.instances = [...Recipe.instances, this]
    }

    static instances = []

    /**
     * creation de la vue d'une recette type
     * @returns {HTMLElement}
     */
    view = () => {
        
    }


























}