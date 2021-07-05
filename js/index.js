const recipeManager = new RecipeManager(0);

// Select all form fields and buttons.
const recipeForm = document.querySelector("#recipe-form");
const recipeName = document.querySelector("#recipe-name");
const validName = document.querySelector("#valid-name");
const recipeTime = document.querySelector("#recipe-time");
const validTime = document.querySelector("#valid-time");
const recipeIngredients = document.querySelector("#recipe-ingredients");
const validIngredients = document.querySelector("#valid-ingredients");
const recipeInstructions = document.querySelector("#recipe-instructions");
const validInstructions = document.querySelector("#valid-instructions");
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
  if (recipeTime.value !== "select a time") {
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

// Recipe ingredients validation
// Create a function validation
const ingredientsValidation = () => {
  if (recipeIngredients.value.length > 10) {
    validIngredients.style.display = "block";
    validIngredients.innerHTML = "Looks good!";
    validIngredients.style.color = "green";
    recipeIngredients.style.borderColor = "green";
  } else {
    validIngredients.style.display = "block";
    validIngredients.innerHTML = "You must give the ingredients.";
    validIngredients.style.color = "red";
    recipeIngredients.style.borderColor = "red";
    validationFail++;
  }
};
// Add an event listener to the input field.
recipeIngredients.addEventListener("input", ingredientsValidation);

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
  recipeTime.value = "select a time";
  recipeTime.style.borderColor = "#ced4da";
  recipeIngredients.value = "";
  recipeIngredients.style.borderColor = "#ced4da";
  recipeInstructions.value = "";
  recipeInstructions.style.borderColor = "#ced4da";
  validName.style.display = "none";
  validTime.style.display = "none";
  validIngredients.style.display = "none";
  validInstructions.style.display = "none";
};

//Add event listener to the "add recipe" button.
recipeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //Call the validation functions of each field
  nameValidation();
  timeValidation();
  ingredientsValidation();
  instructionsValidation();

  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    recipeManager.addRecipe(
      recipeName.value,
      recipeTime.value,
      recipeIngredients.value,
      recipeInstructions.value
    );
  }
  console.log(recipeManager.recipes);
  clearFormFields();
  recipeManager.render();
});

/* End validation form */
