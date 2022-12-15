import axios from "axios";

//Fetching data from Edamam API
export default async function fetchRecipe(id) {
    //Declare input values for API
    const RECIPE_URI = "https://api.edamam.com";
    const RECIPE_ENDPOINT = `/api/recipes/v2/${id}`;
    const API_ID = process.env.API_ID;
    const API_KEY = process.env.API_KEY;

    //If successful than ...
    try {

        //Fetch data from API
        const response = await axios.get(RECIPE_URI + RECIPE_ENDPOINT, {
            params: {
                type: "public",
                app_id: API_ID,
                app_key: API_KEY,
            }

        })

        return response.data.recipe;
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
