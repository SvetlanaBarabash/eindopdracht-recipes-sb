import fetchFoodData from "./functions/fetchFoodData";

let hit;
let foodTableBody;
let foodLabel;
let searchBarcode;



window.addEventListener("load", () => {
    const searchBarcodeBtn = document.getElementById("search-barcode");

    searchBarcodeBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        searchBarcode = document.getElementById('barcode-product').value;

        fetchFoodData(searchBarcode).then((data) => {

            const hits = data.slice(0, 1);
            for (hit of hits) {

                foodLabel = hit.food.label;
                let quantity = Math.round(hit.measures[0].weight);
                let label = hit.measures[0].label;

                console.log(foodLabel);
                console.log(quantity);
                console.log(label);

                foodTableBody = document.getElementById('food-table-body');
                foodTableBody.innerHTML += `
                        <tr>
                            <td>${foodLabel}</td>
                            <td>${quantity}</td>
                            <td>${label}</td>
                        </tr>
                `;
            } //for

            searchBarcode.value = '';


            // console.log(servingQuantity);
        });
    });

    const addBtnClick = document.getElementById("add-btn");

    let foodCalTotal = 0;
    let foodFatTotal = 0;
    let foodCarbsTotal = 0;
    let servingQuantity = 0;

    addBtnClick.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        let foodCal = hit.food.nutrients.ENERC_KCAL;
        let foodFat = hit.food.nutrients.FAT;
        let foodCarbs = hit.food.nutrients.CHOCDF;

        servingQuantity = document.getElementById("amount").value;

        let foodCalAdd = Math.round(foodCal * servingQuantity);
        let foodFatAdd = (foodFat * servingQuantity);
        let foodCarbsAdd = (foodCarbs * servingQuantity);

        let foodLabelAdd = hit.food.label;


        const totalTableBody = document.getElementById('total-table-body');
        totalTableBody.innerHTML += `
                    <tr>
                        <td>${foodLabelAdd}</td>
                        <td>${foodCalAdd} kcal</td>
                        <td>${foodFatAdd.toFixed(2)} g</td>
                        <td>${foodCarbsAdd.toFixed(2)} g</td>
                    </tr>
            `;
        foodCalTotal += foodCalAdd;
        foodFatTotal += foodFatAdd;
        foodCarbsTotal += foodCarbsAdd;

        const totalTableFoot = document.getElementById('total-table-foot');
        totalTableFoot.innerHTML = `
                        <tr>
                            <td>Total</td>
                            <td>${foodCalTotal} kcal</td>
                            <td>${foodFatTotal.toFixed(2)} g</td>
                            <td>${foodCarbsTotal.toFixed(2)} g</td>
                        </tr>
                    `;

        // servingQuantity.value = 0;
        console.log(servingQuantity);

        foodCalAdd = null;
        foodFatAdd = null;
        foodCarbsAdd = null;

        servingQuantity = document.getElementById("amount").value;
        searchBarcode = '';


        foodTableBody.innerHTML = ``;


    }); // click Add btn

});

