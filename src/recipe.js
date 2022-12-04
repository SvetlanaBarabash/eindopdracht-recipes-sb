import fetchRecipe from './functions/fetchRecipe';

window.addEventListener("load", () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");

    fetchRecipe(id).then((recipe) => {
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = createRecipe(recipe);
    })
});

function createRecipe(recipe) {
    const image = recipe.image;
    const title = recipe.label;
    const minutes = recipe.totalTime;

    let ingredients = '';
    for (const line of recipe.ingredientLines) {
        ingredients += `<li>${line}</li>`;
    }

    return `
        <div class="recipe-name-place">
            <div class="page-title">
                <h1>${title}</h1>
            </div>
            <div class="recipe-property__time page-title-time">
                <div class="time-icon page-title-time__icon">
                    <img src="../assets/icons/time.svg" alt="clock">
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
                    <div class="health-labels__place">
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                        <div class="health-labels__item">
                            <p>Peanut-free</p>
                        </div>
                    </div>
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
                        <!--                        <colgroup>-->
                        <!--                            <col span="1" style="width: 60%">-->
                        <!--                            <col span="2" style="width: 20%" >-->
                        <!--                        </colgroup>-->
                        <tbody>
                            <tr>
                                <td colspan="1">Energie</td>
                                <td colspan="2">1080</td>
                                <td colspan="3">kcal</td>
                            </tr>
                            <tr>
                                <td colspan="1">Fat</td>
                                <td colspan="2">80</td>
                                <td colspan="3">g</td>
                            </tr>
                            <tr>
                                <td colspan="1">Carbs</td>
                                <td colspan="2">56</td>
                                <td colspan="3">g</td>
                            </tr>
                            <tr>
                                <td colspan="1">Sugar</td>
                                <td colspan="2">20</td>
                                <td colspan="3">g</td>
                            </tr>
                            <tr>
                                <td colspan="1">Proteine</td>
                                <td colspan="2">15</td>
                                <td colspan="3">g</td>
                            </tr>
                            <tr>
                                <td colspan="1">Sodium</td>
                                <td colspan="2">1900</td>
                                <td colspan="3">mg</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}
