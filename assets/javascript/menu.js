// API Keys
var YOUR_APP_ID = '060d6c07';
var YOUR_APP_KEY = '4caf8f45e89f735e57b03965c8dc01b8';
var ingredientsArray = [];
var ingredientsCaloriesArray = [];

// Food Selection AJAX Query
$('#search-button').on('click', function () {
  var food = $("#food-name").val();
  var quantity = $("#quantity").val();
  var size = $("#size").val();
  var searchString = quantity + " " + size + " " + food;

  $.ajax({
    url: `https://api.edamam.com/api/nutrition-data?app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&ingr=${searchString}`,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $('#food').text(food);
    $('#calories').text(Math.round(response.calories));
    $('#carbs').text(response.totalNutrients.CHOCDF.quantity);
    $('#protein').text(response.totalNutrients.PROCNT.quantity);
    $('#fat').text(response.totalNutrients.FAT.quantity);
  });
});

// Add Ingredient to Ingredient Table
$('#add-ingredient').on('click', function () {
  var food = $('#food').text();
  var calories = parseInt($('#calories').text());
  ingredientsCaloriesArray.push(calories)

  $("#ingredients").append("<tr><td> " + food + "</td><td> " + Math.round(calories) + "</td></tr>");
  ingredientsArray.push(food);
  var total = 0;
  for (var i in ingredientsCaloriesArray) { total += ingredientsCaloriesArray[i]; }

  $('#total-ingredients-calories').text(total);
});

// Find Recipe Function
$('#find-recipes').on('click', function () {
  var recipeSearch = ingredientsArray.toString();

  $.ajax({
    url: `https://api.edamam.com/search?q=${recipeSearch}&app_id=65b4957f&app_key=2307311a6f68d1a304d10e8552b128ed&to=5`,
    method: "GET"
  }).then(function (response) {
    console.log(response.hits);
    for (i = 0; i < response.hits.length; i++) {

      $('#recipes-table').append(
        `<tr>
          <td><a href="${response.hits[i].recipe.url}">${response.hits[i].recipe.label}</a></td>
          <td><img src="${response.hits[i].recipe.image}"/></td>
          <td>${Math.round(response.hits[i].recipe.calories)}</td>
        </tr>`
      );
    }
  });
});