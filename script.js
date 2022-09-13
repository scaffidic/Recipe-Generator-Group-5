//

document.getElementById("search_form").addEventListener("submit", (evt) => {
  evt.preventDefault();

  const searchForm = document.getElementById("search_form");
  const searchBar = document.getElementById("search_bar");
  const userInput = searchBar.value.trim();
  searchForm.reset();

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals[0];
      const mealName = meals.strMeal;
      const mealImg = meals.strMealThumb;
      const mealID = meals.idMeal;
      console.log(mealName);
      console.log(mealImg);
      console.log(mealID);
    });

  const card = cardFactory({
    eltType: "div",
    classNames: ["card"],
    parentElt: document.getElementById("card_container"),
    attributes: [
      {
        name: "style",
        value: "18rem",
      },
    ],
  });

  const img = cardFactory({
    eltType: "img",
    classNames: ["card-img-top"],
    parentElt: card,
    attributes: [
      {
        name: "src",
        value: mealImg,
      },
      {
        name: "alt",
        value: `img of`,
      },
    ],
  });

  const cardBody = cardFactory({
    eltType: "div",
    classNames: ["card-body"],
    parentElt: card,
  });

  const cardTitle = cardFactory({
    eltType: "h3",
    classNames: ["card-title"],
    parentElt: cardBody,
    text: "test",
  });

  const cardBtn = cardFactory({
    eltType: "button",
    text: "View Recipe",
    parentElt: cardBody,
    classNames: ["btn", "btn-primary"],
  });
});

/*<div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Meal Title</h5>
    <button class="btn btn-primary">View Recipe</button>
  </div>
</div>
*/

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
