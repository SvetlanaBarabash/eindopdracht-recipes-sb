import fetchFoodData from "./functions/fetchFoodData";

window.addEventListener("load", () => {
    const searchBarcodeBtn = document.getElementById("search-barcode");
    searchBarcodeBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        const searchBarcode = document.getElementById('barcode-product').value;

        fetchFoodData(searchBarcode).then((data) => {

            const hits = data.slice(0, 1);
            for (const hit of hits) {

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
        });
    });
});