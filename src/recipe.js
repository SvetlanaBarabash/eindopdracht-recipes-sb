import fetchRecipe from './functions/fetchRecipe';

window.addEventListener("load", () => {
    const url = new URL(window.location.href);
    console.log(url);
    const id = url.searchParams.get("id");
    console.log(id);


    fetchRecipe(id).then((recipe) => {
        console.log(recipe);

        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = createRecipe(recipe);
    })
});

function createRecipe(recipe) {
    const image = recipe.image;
    const title = recipe.label;
    const minutes = recipe.totalTime;

    let ingredients = '';
    let healthLabels = '';

    for (const line of recipe.ingredientLines) {
        ingredients += `<li>${line}</li>`;
    }

    const nutrientsEnergy = Math.round(recipe.totalNutrients.ENERC_KCAL.quantity);
    const nutrientsFat = Math.round(recipe.totalNutrients.FAT.quantity);
    const nutrientsCarbs = Math.round(recipe.totalNutrients.CHOCDF.quantity);
    const nutrientsSugar = Math.round(recipe.totalNutrients.SUGAR.quantity);
    const nutrientsProtein = Math.round(recipe.totalNutrients.PROCNT.quantity);
    const nutrientsSodium = Math.round(recipe.totalNutrients.NA.quantity);

    for (const labelsLine of recipe.healthLabels) {
        healthLabels += `<div class="health-labels__item"><p>${labelsLine}</p></div>`;
    }

    return `
        <div class="recipe-name-place">
            <div class="page-title">
                <h1>${title}</h1>
            </div>
            <div class="recipe-property__time page-title-time">
                <div class="time-icon page-title-time__icon">
                    <img src="../assets/icons/time.png" alt="clock">
                </div>
                <div class="value page-title-time__value">${minutes}</div>
                <div class="dimension">min.</div>
            </div>
        </div>
        <div class="recipe-content">
            <div class="recipe-content__left">
                <div class="ingredients">
                    <div class="page-subtitle">
                        <h2>Ingredients</h2>
                    </div>
                    <div class="ingredients-list">
                        <ul>${ingredients}</ul>
                    </div>
                </div>
                <div class="health-labels">
                    <div class="page-subtitle">
                        <h2>Health labels</h2>

                    </div>
                    <div class="health-labels__place">${healthLabels}</div>
                </div>
            </div>

            <div class="recipe-content__right">
                <div class="recipe-image">
                    <img src="${image}" alt="recipe-image">
                </div>

                <div class="nutrients">
                    <div class="page-subtitle">
                        <h2>Nutrients</h2>
                    </div>
                    <table class="nutrients-table">
                        <colgroup>
                            <col span="1" style="width: 70%">
                            <col span="2" style="width: 15%" >
                        </colgroup>
                        <tbody>
                            <tr>
                                <td>Energie</td>
                                <td>${nutrientsEnergy}</td>
                                <td>kcal</td>
                            </tr>
                            <tr>
                                <td>Fat</td>
                                <td>${nutrientsFat}</td>
                                <td>g</td>
                            </tr>
                            <tr>
                                <td>Carbs</td>
                                <td>${nutrientsCarbs}</td>
                                <td>g</td>
                            </tr>
                            <tr>
                                <td>Sugar</td>
                                <td>${nutrientsSugar}</td>
                                <td>g</td>
                            </tr>
                            <tr>
                                <td>Proteine</td>
                                <td>${nutrientsProtein}</td>
                                <td>g</td>
                            </tr>
                            <tr>
                                <td>Sodium</td>
                                <td>${nutrientsSodium}</td>
                                <td>mg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
