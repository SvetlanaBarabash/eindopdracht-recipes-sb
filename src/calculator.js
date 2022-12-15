//Import function which searching product data from FoodBase API
import fetchFoodData from "./functions/fetchFoodData";

//Declare variables
let hit;
let foodTableBody;
let foodLabel;
let searchBarcode;

//Declare EventListener for waiting page loading and continuous main code implementing

window.addEventListener("load", () => {
    const searchBarcodeBtn = document.getElementById("search-barcode");

//Handler food "Search" button
    searchBarcodeBtn.addEventListener('click', (e) => {
        // Prevent form from auto-submitting
        e.preventDefault();

        searchBarcode = document.getElementById('barcode-product').value;

        //Fetching data from Edamam database
        fetchFoodData(searchBarcode).then((data) => {

            //Choice one of case from database answer
            const hits = data.slice(0, 1);
            for (hit of hits) {

                foodLabel = hit.food.label;
                let quantity = Math.round(hit.measures[0].weight);
                let label = hit.measures[0].label;

                console.log(foodLabel);
                console.log(quantity);
                console.log(label);

                //Insert food measures into the foodTable
                foodTableBody = document.getElementById('food-table-body');
                foodTableBody.innerHTML += `
                        <tr>
                            <td>${foodLabel}</td>
                            <td>${quantity}</td>
                            <td>${label}</td>
                        </tr>
                `;
            }
            //Clear search input field
            searchBarcode.value = '';

        });
    });

    //Creating  food Nutrients table
    const addBtnClick = document.getElementById("add-btn");

    let foodCalTotal = 0;
    let foodFatTotal = 0;
    let foodCarbsTotal = 0;
    let servingQuantity = 0;

    //Handler "Add" button
    addBtnClick.addEventListener('click', (e) => {

        // Prevent form from auto-submitting
        e.preventDefault();

        let foodCal = hit.food.nutrients.ENERC_KCAL;
        let foodFat = hit.food.nutrients.FAT;
        let foodCarbs = hit.food.nutrients.CHOCDF;

        //Handler Amount input field
        servingQuantity = document.getElementById("amount").value;

        let foodCalAdd = Math.round(foodCal * servingQuantity);
        let foodFatAdd = (foodFat * servingQuantity);
        let foodCarbsAdd = (foodCarbs * servingQuantity);

        let foodLabelAdd = hit.food.label;

        //Injecting food nutrients into the table
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

        //Calculate and insert summary of nutrients in total row
        const totalTableFoot = document.getElementById('total-table-foot');
        totalTableFoot.innerHTML = `
                        <tr>
                            <td>Total</td>
                            <td>${foodCalTotal} kcal</td>
                            <td>${foodFatTotal.toFixed(2)} g</td>
                            <td>${foodCarbsTotal.toFixed(2)} g</td>
                        </tr>
                    `;

        //Clearing initial values and input fields
        foodCalAdd = null;
        foodFatAdd = null;
        foodCarbsAdd = null;
        servingQuantity = document.getElementById("amount").value;
        searchBarcode = '';
        foodTableBody.innerHTML = ``;


    });

});

