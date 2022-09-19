document.getElementById("search_form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  resetList();

  const searchForm = document.getElementById("search_form");
  const searchBar = document.getElementById("search_bar");
  const userInput = searchBar.value.trim();
  searchForm.reset();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals;
      if (meals === null) {
        alert(
          "Please enter a different ingredient\n\n Example:\n beef\n salmon\n rice"
        );
      } else {
        for (let i = 0; i < meals.length; i++) {
          const mealIndex = meals[i];
          const mealName = mealIndex.strMeal;
          const mealImg = mealIndex.strMealThumb;
          mealID = mealIndex.idMeal;

          const card = cardFactory({
            eltType: "div",
            classNames: ["card", "card_style"],
            parentElt: document.getElementById("card_container"),
          });

          const img = cardFactory({
            eltType: "img",
            classNames: ["card-img-top"],
            parentElt: card,
            attributes: [
              {
                name: "src",
                value: `${mealImg}`,
              },
              {
                name: "alt",
                value: `img of ${mealName}`,
              },
            ],
          });

          const cardBody = cardFactory({
            eltType: "div",
            classNames: ["card-body"],
            parentElt: card,
          });

          const cardTitle = cardFactory({
            eltType: "h5",
            classNames: ["card-title"],
            parentElt: cardBody,
            text: `${mealName}`,
          });

          const cardBtn = cardFactory({
            eltType: "button",
            text: "View Recipe",
            parentElt: cardBody,
            classNames: ["btn", "btn-primary", "recipe_btn"],
            attributes: [
              {
                name: "id",
                value: `${mealID}`,
              },
              {
                name: "data-bs-toggle",
                value: "modal",
              },
              {
                name: "data-bs-target",
                value: "#entireModal",
              },
            ],
          });
        }
      }
    });
});
document.body.addEventListener("click", displayRecipe);

function cardFactory({ eltType, classNames, parentElt, text, attributes }) {
  if (!eltType) {
    return undefined;
  }

  const newElt = document.createElement(eltType);

  if (classNames) {
    newElt.classList.add(...classNames);
  }

  if (text) {
    newElt.innerText = text;
  }

  if (attributes) {
    for (const attr of attributes) {
      const { name: attrName, value: attrValue } = attr;
      newElt.setAttribute(attrName, attrValue);
    }
  }

  if (parentElt) {
    parentElt.appendChild(newElt);
  }
  return newElt;
}

function resetList() {
  const container = document.getElementById("card_container");

  while (container.firstChild) {
    container.firstChild.remove();
  }
}

function displayRecipe(evt) {
  const clickedElt = evt.target;
  const clickedID = clickedElt.id;
  if (clickedElt.classList.contains("recipe_btn")) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickedID}`)
      .then((response) => response.json())
      .then((data) => {
        const mealObj = data.meals[0];
        const instructions = data.meals[0].strInstructions;
        const video = data.meals[0].strYoutube;
        const mealName = data.meals[0].strMeal;
        const mealImg = data.meals[0].strMealThumb;
        const path = video.slice(32);

        let keys = Object.keys(mealObj);
        let filteredIngredients = keys.filter(
          (key) => key.includes("strIngredient") && mealObj[key]
        );
        let filteredMeasurements = keys.filter(
          (key) => key.includes("strMeasure") && mealObj[key]
        );
        document.querySelector(".modal-title").innerText = mealName;
        document.querySelector("#modal_img").src = mealImg;
        document.querySelector("#modal_img").alt = mealName;
        document.querySelector("#modal_instructions").innerText = instructions;
        document.querySelector(
          "#modal_video"
        ).src = `https://www.youtube.com/embed/${path}`;

        filteredIngredients.forEach((element, index) => {
          const ingredientKey = filteredIngredients[index];
          const measurementKey = filteredMeasurements[index];

          document.querySelector(
            "#ingredient_text"
          ).innerText += `- ${mealObj[ingredientKey]}: ${mealObj[measurementKey]}\n`;
        });
      });
    if (clickedElt.classList.contains("recipe_btn")) {
      resetIngredient();
    }
  }
}
function resetIngredient() {
  const container = document.getElementById("modal_ingredients");
  document.getElementById("ingredient_text").innerText = "";
}
