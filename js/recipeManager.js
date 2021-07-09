const createRecipeHTML = (
  name,
  time,
  servings,
  ingredientsList,
  instructions
) => {
  const html = `
  <div class="col card my-5 me-2 px-0">
  <div class="card-body ">
  <div class="d-flex justify-content-between align-items-center">
  <h2 class="card-title">${name}</h2>
  <div>
  <i class="fi-rr-clock icon-color"></i><span">${time}</span>
  <i class="fi-rr-user icon-color"></i><span>${servings}</span>
  </div>
  </div>
  <div></div>
  <h5>Ingredients</h5>
  <ul class="d-flex flex-column flex-wrap list-layout">${ingredientsList
    .map((element) => {
      return `<li><i class="fi-rr-check me-2"></i>${element}</li>`;
    })
    .join("")}</ul>
  <div></div>
  <h5>Instructions</h5>
  <p class="card-text">
    ${instructions}
  </p>
  <div></div>
  <button type="button" class="btn btn-modal-close">Edit</button>
  <button type="button" class="btn btn-modal">Delete</button>
</div>
</div>
  `;
  return html;
};

export class RecipeManager {
  constructor(id = 0) {
    this.recipes = [];
    this.ingredients = [];
    this.id = id;
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }

  addRecipe(name, time, servings, instructions) {
    const newRecipe = {
      id: this.id++,
      name,
      time,
      servings,
      ingredients: this.ingredients,
      instructions,
    };
    this.recipes.push(newRecipe);
  }

  getTaskById(recipeId) {
    // Create a variable to store the found task
    let foundRecipe;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.recipes.length; i++) {
      // Get the current task in the loop
      const recipe = this.recipes[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (recipe.id === recipeId) {
        // Store the task in the foundTask variable
        foundRecipe = recipe;
      }
    }
    // Return the found task
    return foundRecipe;
  }

  //render method
  render() {
    let recipeHtmlList = [];
    // Loop over our recipes and create the html, storing it in the array
    for (let i = 0; i < this.recipes.length; i++) {
      // Get the current recipe in the loop
      const recipe = this.recipes[i];

      const ingredientsList = recipe.ingredients;
      // Create the recipe html
      const recipeHtml = createRecipeHTML(
        recipe.name,
        recipe.time,
        recipe.servings,
        ingredientsList,
        recipe.instructions
      );
      // Push it to the recipesHtmlList array
      recipeHtmlList.push(recipeHtml);
    }

    // Create the recipesHtml by joining each item in the recipesHtmlList
    // with a new line in between each item.
    const recipesHtml = recipeHtmlList.join("\n");

    // Set the inner html of the recipesList on the page
    const recipesList = document.querySelector("#new-recipe");
    recipesList.innerHTML = recipesHtml;
  }

  save() {
    // Create a JSON string of the tasks
    const recipesJson = JSON.stringify(this.recipes);

    // Store the JSON string in localStorage
    localStorage.setItem("recipes", recipesJson);

    // Convert the currentId to a string;
    const id = String(this.id);

    // Store the currentId in localStorage
    localStorage.setItem("id", id);
  }

  load() {
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("recipes")) {
      // Get the JSON string of tasks in localStorage
      const recipesJson = localStorage.getItem("recipes");

      // Convert it to an array and store it in our TaskManager
      this.recipes = JSON.parse(recipesJson);
    }

    // Check if the currentId is saved in localStorage
    if (localStorage.getItem("id")) {
      // Get the currentId string in localStorage
      const id = localStorage.getItem("id");

      // Convert the currentId to a number and store it in our TaskManager
      this.id = Number(id);
    }
  }
}
