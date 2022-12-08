import fetchFoodData from "./functions/fetchFoodData";
// import fetchRecipeData from "./functions/fetchRecipeData";

window.addEventListener("load", () => {
    const searchBarcodeBtn = document.getElementById("search-barcode");
    searchBarcodeBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        const searchBarcode = document.getElementById('barcode-product').value;

        fetchFoodData(searchBarcode).then((data) => {

            const hits = data.slice(0, 1);
            for (const hit of hits) {
                // const recipeCard = createRecipeCard(hit.measures);
                // recipeList.innerHTML += recipeCard;

                const foodLabel = hit.food.label;
                const quantity = Math.round(hit.measures[0].weight);
                const label = hit.measures[0].label;

                console.log(foodLabel);
                console.log(quantity);
                console.log(label);

                const foodTableBody = document.getElementById('foodTableBody');
                foodTableBody.innerHTML += `
                        <tr>
                            <td>${foodLabel}</td>
                            <td>${quantity}</td>
                            <td>${label}</td>
                        </tr>
                `;
            }



            // const productTable = document.getElementById('product-table');




//             productTable.innerHTML = `
// <!--                 <table id="product-table" class="product-table">-->
//             <colgroup>
//                 <col span="1" style="width: 40%">
//                 <col span="2" style="width: 30%" >
//             </colgroup>
//             <thead>
//                 <tr>
//                     <th>Product</th>
//                     <th>Quantity</th>
//                     <th>Label</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr id="foodTableBodyRow">
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                 </tr>
//             </tbody>
// <!--        </table>-->
//             `;

        });
    });
});