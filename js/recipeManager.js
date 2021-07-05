const createRecipeHTML = (name, time, ingredients, instructions) => {
  const html = `
  <div class="card-body">
  <h5 class="card-title">${name}</h5>
  <span>Time: ${time}</span>
  <h6>Ingredients</h6>
  <p class="card-text">
    ${ingredients}
  </p>
  <h6>Instructions</h6>
  <p class="card-text">
    ${instructions}
  </p>
  <button type="button" class="btn btn-primary">Edit</button>
  <button type="button" class="btn btn-danger">Delete</button>
</div>
  `;
  return html;
};

class RecipeManager {
  constructor(id = 0) {
    this.recipes = [];
    this.id = id;
  }

  addRecipe(name, time, ingredients, instructions) {
    const newRecipe = {
      id: this.id++,
      name,
      time,
      ingredients,
      instructions,
    };
    this.recipes.push(newRecipe);
    console.log(this.recipes);
  }

  //render method
  render() {
    let recipeHtmlList = [];
    // Loop over our recipes and create the html, storing it in the array
    for (let i = 0; i < this.recipes.length; i++) {
      // Get the current recipe in the loop
      const recipe = this.recipes[i];

      // Create the recipe html
      const recipeHtml = createRecipeHTML(
        recipe.name,
        recipe.time,
        recipe.ingredients,
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
}
