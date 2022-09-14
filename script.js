//

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
      if(meals === null) {
        alert("Please enter a different ingredient\n\n Example:\n beef\n salmon\n rice")
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
          // attributes: [
          //   // {
          //   //   name: "style",
          //   //   value: "18rem",
          //   // },
          // ],
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
          ],
        
        });

        // console.log(mealID);
        // console.log(mealName);
      } }

     

      })
     
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
const container = document.getElementById("card_container")

while (container.firstChild) {
  container.firstChild.remove();
}
}

function displayRecipe(evt){
    const clickedElt= evt.target;
    const clickedID = clickedElt.id;
    if (clickedElt.classList.contains("recipe_btn")){
 



    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${clickedID}`)
    .then((response) => response.json())
    .then((data) => {
        let index = 1;
        const instructions = data.meals[0].strInstructions;
        const video = data.meals[0].strYoutube;
        const mealName = data.meals[0].strMeal;
        const mealImg = data.meals[0].strMealThumb;
        const ingr1 = data.meals[0].strIngredient1;
        
        for (let i = 1; i < 21; i++) {
            const ingredients = data.meals[0].newIngr;

            ingr = "strIngredient1";
          
          
          
            newIngr = ingr.replace(1, i);
          
          
          
            console.log(`${data.meals[0]}.${newIngr}`.valueOf);
          
          }
        // const filtered = ingredients.filter(obj => {
        //     return obj.strIngredient1;
        // })
        // console.log(filtered);
        // console.log(mealImg);
        // console.log(mealName);
        // console.log(ingr1);
        
        // for (let i = 0; i < 20; i++) {
        //     const ingr = ".strIngredient1"
        //     const newIngr = ingr.replaceAt(14, i)
        //     console.log(data.meals[0].newIngr);


        //     // console.log(data.meals.strIngredient + `${i}`.value);
       
            
        // }
        // console.log(data.meals[0].strIngredient1);
        // console.log(instructions);
        // console.log(video);
        // if (data.meals.hasOwnProperty("strIngredient*")) {
        //     console.log(data.meals.strIngredient);

        // }
        

        
       
        
       
        
    })
    }
  
    
}