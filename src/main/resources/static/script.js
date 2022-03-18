/**
 * This javascript file holds the data within the Nutritionix V2 API
 * Functions to take in user input are held here
 *
 * @Credits: https://trackapi.nutritionix.com/v2/
 * @Author: Peter Eang
 * @Version: 1.0
 */

/** Wait for the page to load */
window.onload = function () {
    // Show the current records on the page
    calorieForm();
    searchForm();
    exerciseForm();
};

/**
 * This function prepares the form with the data being entered in
 * The data saved is one asking for specific food entered
 * Prevents the form from submitting
 */
function calorieForm()
{
    let button = document.querySelector("#eatenFood");
    button.onclick = function(event)
    {
        // Stop the form from submitting
        event.preventDefault();
        console.log("Clicked!");
        saveData();
    };
}

// Start of looking up what you ate column

/**
 * Using POST to access the API to look up a matching food object that includes
 * Similar naming for the food entered in saving the data and passing it into
 * the loadData() function
 */
function saveData()
{
    let data = {query: document.getElementById("nutrition").value, timezone: "US/Pacific"};
    let uri = "https://trackapi.nutritionix.com/v2/natural/nutrients";
    let params = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": "05b3634a",
            "x-app-key": "6c18ade0d328a6a2d77727d2894a4d98",
            "x-remote-user-id": "0"
        },
        body: JSON.stringify(data)
    };

    fetch(uri, params)
        .then(function (response) {
            console.log(response);
            return response.json(); // Return another promise
        })
        .then(data => {
            console.log("Success!");
            loadData(data);
        })
        .catch(error => {
            console.error("Error: ", error);
        })
}

function capitalizeFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * loadData takes the api data for the specific queried food
 * creating an element consisting of the name of the food
 * quantity and calories
 * @param json the food data queried
 */
function loadData(json)
{
    // Debug print out data to be seen on console
    console.log(json);

    // Select the specificFood tag on the page to show the data
    let food = document.querySelector("#specificFood");
    food.innerText ="";



    // Loop through json array to get name
    for (let i = 0; i < json.foods.length; i++) {

        // Create div tag for food name with the card header being the name of the food
        let foodName = document.createElement("div");
        foodName.className = "card-header";

        let foodItem = document.createElement("ul");
        foodItem.className ="list-group list-group-flush";

        // Create list within the food tag
        let foodCalories = document.createElement("li");
        let foodProtein = document.createElement("li");
        let foodQuantity = document.createElement("li");
        foodCalories.className = "list-group-item"
        foodProtein.className = "list-group-item"
        foodQuantity.className = "list-group-item"

        foodName.innerText = "Food Name: " + " " + capitalizeFirstLetter(json.foods[i].food_name);
        foodCalories.append("Calories: " + json.foods[i].nf_calories);
        foodProtein.append("Protein: " + json.foods[i].nf_protein);
        foodQuantity.append("Quantity: " + json.foods[i].serving_qty);

        foodItem.append(foodCalories)
        foodItem.append(foodProtein)
        foodItem.append(foodQuantity)

        food.append(foodName)
        food.append(foodItem)
    }


}


// Start of food look up column
/**
 * This function prepares the form with the data being entered in
 * The data saved is one asking for specific food entered
 * Prevents the form from submitting
 */
function searchForm()
{
    let button = document.querySelector("#searchingFood");
    button.onclick = function(event)
    {
        // Stop the form from submitting
        event.preventDefault();
        console.log("Clicked!");
        saveSearch();
    };
}

/**
 * Using GET to access the API to look up a matching food object that includes
 * Similar naming for the food entered in saving the data and passing it into
 * the loadData() function
 */
function saveSearch()
{
    let item = document.querySelector("#foodSearch").value;
    let uri = "https://trackapi.nutritionix.com/v2/search/instant?query=" + item;
    let params = {
        method: "GET",
        mode: "cors",
        headers: {
            "x-app-id": "05b3634a",
            "x-app-key": "6c18ade0d328a6a2d77727d2894a4d98",
        },
    };

    fetch(uri, params)
        .then(function (response) {
            console.log(response);
            return response.json(); // Return another promise
        })
        .then(data => {
            console.log("Success!");
            loadSearch(data);
        })
        .catch(error => {
            console.error("Error: ", error);
        })
}

/**
 * loadData takes the api data for the specific queried food
 * creating an element consisting of the name of the food
 * quantity and calories
 * @param json the food data queried
 */
function loadSearch(json)
{
    // Debug print out data to be seen on console
    console.log(json);

    // Select the specificFood tag on the page to show the data
    let food = document.querySelector("#foodList");

    food.innerText ="";

    // Loop through json array to get name
    for (let i = 0; i < json.branded.length; i++) {

        // Create item card each loop with found search
        let newCard = document.createElement("div");
        newCard.className = "card mt-3";

       // Create new img tag element and take api thumbnail picture to add to element
        let foodThumbnail = document.createElement("img");
        foodThumbnail.src = json.branded[i].photo.thumb;
        foodThumbnail.className = "card-img-top img-thumbnail";

        let foodName = document.createElement("div");
        foodName.className = "card-header";
        foodName.innerText = "Food Name: " + json.branded[i].food_name;

        let foodItem = document.createElement("ul");
        foodItem.className = "list-group list-group-flush";

        // Create two list element that show food name and details
        let foodBrandName = document.createElement("li");
        let foodItemName = document.createElement("li");
        let foodCalories = document.createElement("li");
        foodCalories.className ="list-group-item";
        foodItemName.className ="list-group-item";
        foodBrandName.className ="list-group-item";


        foodCalories.innerText = "Calories: " + json.branded[i].nf_calories;
        foodItemName.innerText = "Item Name: " + json.branded[i].brand_name_item_name;
        foodBrandName.innerText = "Brand Name: " + json.branded[i].brand_name;

        foodItem.append(foodCalories);
        foodItem.append(foodItemName);
        foodItem.append(foodBrandName);


        newCard.append(foodThumbnail);
        newCard.append(foodName)
        newCard.append(foodItem);
        food.append(newCard);
    }
}

/**
 * exerciseForm prepares the form with the data being entered in
 * The data saved is one asking for the specific exercise done
 * Prevents the form from submitting and prints into the console
 * For debugging
 */
// Start of exercise functions column
function exerciseForm()
{
    let button = document.querySelector("#exerciseDone");
    button.onclick = function(event)
    {
        // Stop the form from submitting
        event.preventDefault();
        console.log("Clicked!");
        saveExercise();
    };
}

/**
 * Using POST to access the API to look up a matching exercise object that includes
 * Similar naming for the exercise entered in saving the data and passing it into
 * the loadExercise() function
 */
function saveExercise()
{
    let data = {query: document.getElementById("exercise").value};
    let uri = "https://trackapi.nutritionix.com/v2/natural/exercise"
    let params = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "x-app-id": "05b3634a",
            "x-app-key": "6c18ade0d328a6a2d77727d2894a4d98"
        },
        body: JSON.stringify(data)
    };

    fetch(uri, params)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log("Success!");
            loadExercise(data);
        })
        .catch(error => {
            console.error("Error: ", error);
        })
}

/**
 * loadExercise takes the api data for the specific queried exercise
 * Creating an element consisting of the name of the exercise
 * Calories burned, MET, and Duration
 * @param json the exercise data queried
 */
function loadExercise(json)
{
    // Debug print out data to be seen on console
    console.log(json);

    // Select the exerciseStates tag on the page to show the data
    let exercise = document.querySelector("#exerciseStats");
    exercise.innerText ="";

    // Loop to get exercise
    for (let i = 0; i < json.exercises.length; i++) {

        // Create div tag for exercise name with the card header being the name of the exercise
        let exerciseName = document.createElement("div");
        exerciseName.className = "card-header";

        let exerciseItem = document.createElement("ul");
        exerciseItem.className ="list-group list-group-flush";

        // Create list to go within the exercise tag
        let exerciseCalories = document.createElement("li");
        let exerciseDurations = document.createElement("li");
        let exerciseMet = document.createElement("li");
        exerciseCalories.className = "list-group-item"
        exerciseDurations.className = "list-group-item"
        exerciseMet.className = "list-group-item"

        exerciseName.innerText = "Exercise Name: " + " " + capitalizeFirstLetter(json.exercises[i].name);
        exerciseCalories.append("Calories: " + json.exercises[i].nf_calories);
        exerciseDurations.append("Duration: " + json.exercises[i].duration_min + " minutes");
        exerciseMet.append("MET: " + json.exercises[i].met);

        exerciseItem.append(exerciseCalories)
        exerciseItem.append(exerciseDurations)
        exerciseItem.append(exerciseMet)

        exercise.append(exerciseName)
        exercise.append(exerciseItem)
    }
}