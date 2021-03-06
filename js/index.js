import { RecipeManager } from "./recipeManager.js";

const recipeManager = new RecipeManager(0);
recipeManager.load();
recipeManager.render();

// Select all form fields and buttons.
const recipeForm = document.querySelector("#recipe-form");
const recipeName = document.querySelector("#recipe-name");
const validName = document.querySelector("#valid-name");
const recipeTime = document.querySelector("#recipe-time");
const validTime = document.querySelector("#valid-time");
const recipeServings = document.querySelector("#servings");
const validServings = document.querySelector("#valid-servings");
const recipeIngredients = document.querySelector("#recipe-ingredients");
const validIngredients = document.querySelector("#valid-ingredients");
const recipeInstructions = document.querySelector("#recipe-instructions");
const validInstructions = document.querySelector("#valid-instructions");
const closeForm = document.querySelector("#clean-form");
let validationFail = 0;

/* Start validation form */

// Recipe name validation
// Create a function validation
const nameValidation = () => {
  if (recipeName.value.length > 5) {
    validName.style.display = "block";
    validName.innerHTML = "Looks good!";
    validName.style.color = "green";
    recipeName.style.borderColor = "green";
  } else {
    validName.style.display = "block";
    validName.innerHTML = "Name must have 5 characthers minimum!";
    validName.style.color = "red";
    recipeName.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field
recipeName.addEventListener("input", nameValidation);

// Recipe cooking time validation
// Create a function validation
const timeValidation = () => {
  if (recipeTime.value !== "") {
    validTime.style.display = "block";
    validTime.innerHTML = "Looks good!";
    validTime.style.color = "green";
    recipeTime.style.borderColor = "green";
  } else {
    validTime.style.display = "block";
    validTime.innerHTML = "You must choose a cooking time.";
    validTime.style.color = "red";
    recipeTime.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field
recipeTime.addEventListener("input", timeValidation);

const servingsValidation = () => {
  if (recipeServings.value !== "") {
    validServings.style.display = "block";
    validServings.innerHTML = "Looks good!";
    validServings.style.color = "green";
    recipeServings.style.borderColor = "green";
  } else {
    validServings.style.display = "block";
    validServings.innerHTML = "You must choose a a number of servings.";
    validServings.style.color = "red";
    recipeServings.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field
recipeServings.addEventListener("input", servingsValidation);

// Recipe ingredients validation
// Create a function validation
const ingredientsValidation = () => {
  if (
    recipeIngredients.value.length !== "" &&
    recipeManager.ingredients.length >= 3
  ) {
    validIngredients.style.display = "block";
    validIngredients.innerHTML = "Looks good!";
    validIngredients.style.color = "green";
    recipeIngredients.style.borderColor = "green";
  } else {
    validIngredients.style.display = "block";
    validIngredients.innerHTML = "You must give at least 3 ingredients.";
    validIngredients.style.color = "red";
    recipeIngredients.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field.
recipeIngredients.addEventListener("click", ingredientsValidation);

// Recipe instructions validation.
// Create a function validation.
const instructionsValidation = () => {
  if (recipeInstructions.value.length > 10) {
    validInstructions.style.display = "block";
    validInstructions.innerHTML = "Looks good!";
    validInstructions.style.color = "green";
    recipeInstructions.style.borderColor = "green";
  } else {
    validInstructions.style.display = "block";
    validInstructions.innerHTML = "You must give the instructions.";
    validInstructions.style.color = "red";
    recipeInstructions.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field.
recipeInstructions.addEventListener("input", instructionsValidation);

// Function to clear the form fields after submit

const clearFormFields = () => {
  recipeName.value = "";
  recipeName.style.borderColor = "#ced4da";
  recipeTime.value = "";
  recipeTime.style.borderColor = "#ced4da";
  recipeServings.value = "";
  recipeServings.style.borderColor = "#ced4da";
  recipeIngredients.value = "";
  recipeIngredients.style.borderColor = "#ced4da";
  recipeInstructions.value = "";
  recipeInstructions.style.borderColor = "#ced4da";
  validName.style.display = "none";
  validTime.style.display = "none";
  validServings.style.display = "none";
  validIngredients.style.display = "none";
  validInstructions.style.display = "none";
  ingredientsList.innerHTML = "";
};
/* End validation form */

//Add event listener to the "add recipe" button.
recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Call the validation functions of each field
  nameValidation();
  timeValidation();
  servingsValidation();
  ingredientsValidation();
  instructionsValidation();

  // validationFail = 0;
  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    recipeManager.addRecipe(
      recipeName.value,
      recipeTime.value,
      recipeServings.value,
      recipeInstructions.value
    );
  }
  recipeManager.save();
  recipeManager.render();
  clearFormFields();
  recipeManager.ingredients = [];
});

/*Close button event to clean the form*/

closeForm.addEventListener("click", (e) => {
  e.preventDefault();
  clearFormFields();
});

/* Add ingredient event */

const addIngredient = document.querySelector("#save-ingredient");
const ingredientsList = document.querySelector("#ingredients-list");

addIngredient.addEventListener("click", () => {
  ingredientsList.innerHTML += `<li class="m-3"> ${recipeIngredients.value} </li>`;
  recipeManager.addIngredient(recipeIngredients.value);
  recipeIngredients.value = "";
});

const recipeList = document.querySelector("#new-recipe");

recipeList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-button")) {
    console.log(e.target);
    // Get the parent Task
    const parentRecipe = e.target.parentElement.parentElement;
    console.log(parentRecipe);

    // Get the taskId of the parent Task.
    const recipeId = Number(parentRecipe.dataset.recipeId);

    console.log(parentRecipe.dataset);
    console.log(recipeId);

    // Delete the task
    recipeManager.deleteRecipe(recipeId);

    // Save the tasks to localStorage
    recipeManager.save();

    // Render the tasks
    recipeManager.render();
  }
});
