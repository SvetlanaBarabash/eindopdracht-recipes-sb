import axios from "axios";
import createRecipeCard from "./createRecipeCard";

//Fetching data from Edamam API
export default async function fetchRecipeData(searchQuery, mealType, cuisineType, dishType, time) {

    //Declare input values for API
    const RECIPE_URI = "https://api.edamam.com";
    const RECIPE_ENDPOINT = "/api/recipes/v2";
    const API_ID = process.env.API_ID;
    const API_KEY = process.env.API_KEY;

    console.log({searchQuery, mealType, cuisineType, dishType, time})

    //If successful than ...
    try {

        //Fetch data from API
        const response = await axios.get(RECIPE_URI + RECIPE_ENDPOINT, {
            params: {
                type: "public",
                app_id: API_ID,
                app_key: API_KEY,
                q: searchQuery,
                mealType: mealType,
                cuisineType: cuisineType,
                dishType: dishType,
                time: time,
                random: true
            }

        })

        //Store recipe key in variable
        const arrayOfRecipes = response.data.hits;
        console.log(arrayOfRecipes);

        // createRecipeCard( arrayOfRecipes );
        return response.data.hits;

        /*console.log(response);*/
        //Catch error message and show them in the UI
    } catch (e) {

        const error = document.getElementById('error-message')

        if (e.response.status === 404) {
            error.innerContent = 'page not found'
        } else if (e.response.status === 500) {
            error.innerContent = 'internal server error'
        }
    }

}
