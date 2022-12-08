import axios from "axios";
// import createRecipeCard from "./createRecipeCard";

//Fetching data from Edamam API
export default async function fetchFoodData (searchBarcode) {

    //Declare input values for API
    const RECIPE_URI = "https://api.edamam.com";
    const RECIPE_ENDPOINT = "/api/food-database/v2/parser";
    const API_ID = process.env.API_ID_FD;
    const API_KEY = process.env.API_KEY_FD;

    console.log(API_ID);
    console.log(API_KEY);

    console.log({searchBarcode})

    //If successful than ...
    try {

        //Fetch data from API
        const response = await axios.get(RECIPE_URI + RECIPE_ENDPOINT, {
            params: {
                type: "public",
                app_id: API_ID,
                app_key: API_KEY,
                ingr: searchBarcode,
                // upc: UpcSearchQuery
            }

        })

        console.log(searchBarcode);
        console.log(response);

        //Store food data in variable
        // const arrayOfFood = response.data.hits;
        const arrayOfFood = response.data.hints;
        console.log(arrayOfFood);

        // createRecipeCard( arrayOfRecipes );
        return arrayOfFood;

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
