import fetchRecipeData from "./functions/fetchRecipeData";

window.addEventListener("load", () => {
    const searchBtn = document.getElementById("search-recipes");
    searchBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        const searchIngredients = document.getElementById('search-ingredients').value;
        const mealType = document.getElementById('meal-type-field').value || undefined;
        const cuisine = document.getElementById('cuisine-field').value || undefined;
        const diet = document.getElementById('diet-field').value || undefined;
        const time = document.getElementById('time-field').value || undefined;

        fetchRecipeData(searchIngredients, mealType, cuisine, diet, time).then((data) => {
            const recipeList = document.getElementById('recipe-card-list');
            recipeList.innerHTML = '';

            const hits = data.slice(0, 6);
            for (const hit of hits) {
                const recipeCard = createRecipeCard(hit.recipe);
                recipeList.innerHTML += recipeCard;
            }
        });
    });
});

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
                             <img src="../assets/icons/time.png" alt="clock">
                         </div>
                        <div class="value">${minutes}</div>
                        <div class="dimension">min.</div>
                    </div>
                </div>
            </div>
        </a>
    `;
}

createRecipeCard();