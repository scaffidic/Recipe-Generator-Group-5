// 

document.getElementById("search_form").addEventListener("submit", (evt) => {
    evt.preventDefault()

const searchForm = document.getElementById("search_form");
const searchBar = document.getElementById("search_bar");
const userInput = searchBar.value.trim();
searchForm.reset(); 


fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
.then((response) => response.json())
.then((data) => {
    const meals = data.meals;
    const mealName = meals.strMeal;
    const mealImg = meals.strMealThumb;
    const mealID = meals.idMeal;
})

cardFactory();


})