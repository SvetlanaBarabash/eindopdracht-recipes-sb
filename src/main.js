//Import function which searching recipes data from RecipeData API
import fetchRecipeData from "./functions/fetchRecipeData";
import timeIcon from '../assets/icons/time.png';

//Declare EventListener for waiting page loading and continuous main code implementing
window.addEventListener("load", () => {
    let searchIngredients = "tea";

    //Fetch data from API for intro Recipe cards
    fetchRecipeData(searchIngredients).then((data) => {
        const pictCardList = document.getElementById('recipe-card-list1');
        pictCardList.innerHTML = '';

        const hits = data.slice(0, 3);
        for (const hit of hits) {
            const recipeCard = createRecipeCard(hit.recipe);
            pictCardList.innerHTML += recipeCard;
        }
    });

    // Fetch data from API for first load of search Recipe cards
    searchIngredients = "coffee";
    fetchRecipeData(searchIngredients).then((data) => {
        const recipeList = document.getElementById('recipe-card-list');
        recipeList.innerHTML = '';

        // Choice 6 of case from database answer
        const hits = data.slice(0, 6);

        // Creating recipeCards
        for (const hit of hits) {
            const recipeCard = createRecipeCard(hit.recipe);
            recipeList.innerHTML += recipeCard;
        }
    });

    // Recipe search section

    // Handler of recipe search button
    const searchBtn = document.getElementById("search-recipes");
    searchBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        //Declare constants for search form
        const searchIngredients = document.getElementById('search-ingredients').value;
        const mealType = document.getElementById('meal-type-field').value || undefined;
        const cuisine = document.getElementById('cuisine-field').value || undefined;
        const diet = document.getElementById('diet-field').value || undefined;
        const time = document.getElementById('time-field').value || undefined;

        // Search quire to Edamam API
        fetchRecipeData(searchIngredients, mealType, cuisine, diet, time).then((data) => {
            const recipeList = document.getElementById('recipe-card-list');
            recipeList.innerHTML = '';

            // Creating recipeCards from search result
            const hits = data.slice(0, 20);
            for (const hit of hits) {
                const recipeCard = createRecipeCard(hit.recipe);
                recipeList.innerHTML += recipeCard;
            }
        });
    });
});

// Function to create recipe card for index.html
function createRecipeCard(recipe) {
    const id = recipe.uri.split("_")[1];
    const image = recipe.image;
    const title = recipe.label;
    const calories = Math.round(recipe.calories);
    const ingredients = recipe.ingredients.length;
    const minutes = recipe.totalTime;

    return `
        <a href="recipe.html?id=${id}" class="recipe-card">
            <div class="recipe-card__image">
                <img src="${image}" alt="card image">
            </div>
            <div class="recipe-card__info">
                <div class="recipe-card__title">${title}</div>
                <div class="recipe-property">
                    <div class="recipe-property__line">
                        <div class="value">${calories}</div>
                        <div class="dimension">Calories</div>
                        <span>|</span>
                        <div class="value">${ingredients}</div>
                        <div class="dimension">Ingredients</div>
                    </div>
                    <div class="recipe-property__time">
                        <div class="time-icon">
                             <img src="${timeIcon}" alt="clock">
                         </div>
                        <div class="value">${minutes}</div>
                        <div class="dimension">min.</div>
                    </div>
                </div>
            </div>
        </a>
    `;
}

// Call recipe card create function
createRecipeCard();