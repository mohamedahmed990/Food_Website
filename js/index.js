

let options = document.querySelectorAll("li");
let allCategories;
let allAreas;
let allIngrediants;
let container = document.querySelector(".content-container");


function displaySearchInputs() {
    container.innerHTML = "";
    let inputsContainer = document.createElement("div");
    inputsContainer.classList.add("row")
    let resultContainer = document.createElement("div");
    resultContainer.classList.add("row", "g-2", "py-4", "text-white", "flex-wrap")

    let nameSearchInputContainer = document.createElement("div");
    nameSearchInputContainer.classList.add("col-md-6")
    let nameSearchInput = document.createElement("input");
    nameSearchInput.setAttribute("placeHolder", "Search By Name");
    nameSearchInput.classList.add("form-control", "w-100");

    let firstLetterSearchInputContainer = document.createElement("div");
    firstLetterSearchInputContainer.classList.add("col-md-6")
    let firstLetterSearchInput = document.createElement("input");
    firstLetterSearchInput.setAttribute("placeHolder", "Search By first letter");
    firstLetterSearchInput.classList.add("form-control", "w-100");

    container.append(inputsContainer);
    container.append(resultContainer);
    inputsContainer.append(nameSearchInputContainer);
    inputsContainer.append(firstLetterSearchInputContainer);
    nameSearchInputContainer.append(nameSearchInput);
    firstLetterSearchInputContainer.append(firstLetterSearchInput)

    nameSearchInput.addEventListener("keyup", function () {
        (async function () {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameSearchInput.value}`)
            let mealsByName = await response.json();
            console.log(mealsByName)
            displayMeals(mealsByName, resultContainer);
        })();
    });
    firstLetterSearchInput.addEventListener("keyup", function () {
        (async function () {
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetterSearchInput.value}`)
            let mealsByFirstLetter = await response.json();
            console.log(mealsByFirstLetter)
            displayMeals(mealsByFirstLetter, resultContainer);
        })();
    });

}

function displayMealDetails(meal, result) {
    result.innerHTML = "";
    console.log(meal.meals[0][`strIngredient${5}`])

    let { strMeal, strMealThumb, strInstructions, strYoutube, strSource, strArea, strCategory } = meal.meals[0]

    // create first col elements
    let firstCol = document.createElement("div");
    firstCol.classList.add("col-lg-4", "p-3");
    let imageSection = document.createElement("div");
    let imageContainer = document.createElement("div");
    let mealImage = document.createElement("img");
    mealImage.setAttribute("src", strMealThumb);
    mealImage.classList.add("w-100");
    let mealName = document.createElement("h2");
    mealName.innerText = strMeal;

    // append all first col elements
    result.append(firstCol);
    firstCol.append(imageSection)
    imageSection.append(imageContainer);
    imageSection.append(mealName);
    imageContainer.append(mealImage);

    // create second col elements
    let secondCol = document.createElement("div");
    secondCol.classList.add("col-lg-8", "p-3");
    let detailsSection = document.createElement("div");
    let instructionHead = document.createElement("h2");
    instructionHead.innerText = "Instruction";
    let instructionDesc = document.createElement("p");
    instructionDesc.innerText = strInstructions;


    let areaContainer = document.createElement("div");
    areaContainer.classList.add("d-flex", "align-items-center", "gap-2", "mb-2");
    let areaHead = document.createElement("h3");
    areaHead.innerText = "Area :  ";
    let areaName = document.createElement("h4");
    areaName.innerText = strArea;
    areaContainer.append(areaHead);
    areaContainer.append(areaName);

    let categoryContainer = document.createElement("div");
    categoryContainer.classList.add("d-flex", "align-items-center", "gap-2", "mb-2");
    let categoryHead = document.createElement("h3");
    categoryHead.innerText = "Category :  ";
    let categoryName = document.createElement("h4");
    categoryName.innerText = strCategory;
    categoryContainer.append(categoryHead)
    categoryContainer.append(categoryName)

    let recipesHead = document.createElement("h2");
    recipesHead.innerText = "Recipes :";
    let recipesDetails = document.createElement("div");
    recipesDetails.classList.add("d-flex", "flex-wrap", "gap-3", "mb-3");

    // create and append recipes element
    for (let i = 1; ; i++) {
        if (meal.meals[0][`strIngredient${i}`] === "" ||
            meal.meals[0][`strIngredient${i}`] === " " ||
            meal.meals[0][`strIngredient${i}`] === undefined) {
            break;
        }
        let recipesItem = document.createElement("span");
        recipesItem.classList.add("p-2", "recipes-item");
        recipesItem.innerText = meal.meals[0][`strMeasure${i}`] + " " + meal.meals[0][`strIngredient${i}`];
        recipesDetails.append(recipesItem);
    }
    let tagsHead = document.createElement("h2");
    tagsHead.innerText = "Tags :";
    let tagsContainer = document.createElement("div");
    tagsContainer.classList.add("d-flex", "flex-wrap", "mb-3", "gap-2")
    if (meal.meals[0].strTags !== null) {
        let tagsArr = meal.meals[0].strTags.split(",");
        let newTagsArr = tagsArr.filter(function (element) {
            return element !== "";
        })
        // console.log(tagsArr);
        // console.log(newTagsArr);
        for (let i = 0; i < newTagsArr.length; i++) {
            let tagElement = document.createElement("span");
            tagElement.classList.add("tag-element");
            tagElement.innerText = newTagsArr[i];
            tagsContainer.append(tagElement);
        }
    }

    let linksContainer = document.createElement("div");
    linksContainer.classList.add("d-flex", "flex-wrap", "gap-1");

    let sourceLink = document.createElement("a");
    sourceLink.setAttribute("href", strSource);
    sourceLink.setAttribute("target", "_blank");
    sourceLink.innerText = "Source";
    let sourceSpan = document.createElement("span");
    sourceLink.classList.add("source-link");
    sourceSpan.append(sourceLink);

    let youtubeLink = document.createElement("a");
    youtubeLink.setAttribute("href", strYoutube);
    youtubeLink.setAttribute("target", "_blank");
    youtubeLink.innerText = "Youtube";
    let youtubeSpan = document.createElement("span");
    youtubeLink.classList.add("youtube-link");
    youtubeSpan.append(youtubeLink);

    linksContainer.append(sourceLink);
    linksContainer.append(youtubeLink);

    // append second col elements
    result.append(secondCol);
    secondCol.append(detailsSection);
    detailsSection.append(instructionHead);
    detailsSection.append(instructionDesc);
    detailsSection.append(areaContainer);
    detailsSection.append(categoryContainer);
    detailsSection.append(recipesHead);
    detailsSection.append(recipesDetails);
    detailsSection.append(tagsHead);
    detailsSection.append(tagsContainer);
    detailsSection.append(linksContainer);

}

function displayMeals(allMeals, result) {
    result.innerHTML = "";
    for (let i = 0; i < allMeals.meals.length; i++) {

        let col = document.createElement("div");
        let element = document.createElement("div");
        element.classList.add("meal-element", "position-relative", "overflow-hidden", "rounded-3");
        col.classList.add("col-lg-3", "col-md-4", "p-2", "text-white");
        col.append(element);
        let { strMealThumb: mealImg, strMeal: MealTitle } = allMeals.meals[i];

        let imageContainer = document.createElement("div");
        let image = document.createElement("img");
        image.setAttribute("src", mealImg);
        image.classList.add("w-100")
        imageContainer.append(image);

        let mealHeader = document.createElement("h3");
        mealHeader.innerText = MealTitle;

        let mealText = document.createElement("div");
        mealText.classList.add("element-layer")
        mealText.append(mealHeader);
        element.append(imageContainer);
        element.append(mealText);
        result.append(col);
    }

    document.querySelectorAll(".meal-element").forEach(function (x, i) {
        x.style.cursor = "pointer";
        x.addEventListener("click", function () {
            (async function () {
                let { idMeal } = allMeals.meals[i];
                // console.log(idMeal);
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
                let meal = await response.json();
                displayMealDetails(meal, container);
                // console.log(meal);
            })();
        })
    })
}

function displayAllCategories(result) {
    result.innerHTML = "";
    for (let i = 0; i < allCategories.categories.length; i++) {
        let col = document.createElement("div");
        let element = document.createElement("div");
        element.classList.add("category-element", "position-relative", "overflow-hidden", "rounded-3");
        col.classList.add("col-lg-3", "col-md-4", "p-2", "text-white", "text-center");
        col.append(element);
        let { strCategoryThumb: categoryImg, strCategoryDescription: CategoryDescription, strCategory: categoryTitle } = allCategories.categories[i];

        let imageContainer = document.createElement("div");
        let image = document.createElement("img");
        image.setAttribute("src", categoryImg);
        image.classList.add("w-100")
        imageContainer.append(image);

        let categoryHeader = document.createElement("h3");
        categoryHeader.innerText = categoryTitle;

        let descArr = CategoryDescription.split(" ", 15);
        CategoryDescription = descArr.join(" ")
        let description = document.createElement("p");
        description.innerText = CategoryDescription;

        let categoryText = document.createElement("div");
        categoryText.classList.add("element-layer")
        categoryText.append(categoryHeader);
        categoryText.append(description);
        element.append(imageContainer);
        element.append(categoryText);
        result.append(col);
    }

    document.querySelectorAll(".category-element").forEach(function (x, i) {
        x.style.cursor = "pointer";
        x.addEventListener("click", function () {
            (async function () {
                let { strCategory: categoryName } = allCategories.categories[i];
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`)
                let meals = await response.json();
                // console.log(meals);
                displayMeals(meals, container);
            })();
        })
    })
}
function displayAllAreas(result) {
    result.innerHTML = "";

    for (let i = 0; i < allAreas.meals.length; i++) {
        let col = document.createElement("div");
        let element = document.createElement("div");
        element.classList.add("area-element")

        col.classList.add("col-md-3", "p-2", "text-white", "text-center");
        col.append(element);
        let { strArea: area } = allAreas.meals[i];

        let iconContainer = document.createElement("div");
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-house-laptop", "fa-4x")
        iconContainer.append(icon);

        let areaName = document.createElement("p");
        areaName.innerText = area;

        element.append(iconContainer);
        element.append(areaName);
        result.append(col);

    }
    document.querySelectorAll(".area-element").forEach(function (x, i) {
        x.style.cursor = "pointer";
        x.addEventListener("click", function () {
            (async function () {
                let { strArea: areaName } = allAreas.meals[i]

                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
                let meals = await response.json();
                // console.log(meals);
                displayMeals(meals, container);
            })();
        });
    });
}
function displayAllIngrediants(result) {
    result.innerHTML = "";

    for (let i = 0; i < 30; i++) {
        let col = document.createElement("div");
        let element = document.createElement("div");
        element.classList.add("ingredient-element")

        col.classList.add("col-md-3", "p-2", "text-white", "text-center");
        col.append(element);
        let { strDescription: ingredientDescription, strIngredient: ingredientTitle } = allIngrediants.meals[i];

        let iconContainer = document.createElement("div");
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-drumstick-bite", "fa-4x")
        iconContainer.append(icon);

        let ingredientName = document.createElement("h2");
        ingredientName.innerText = ingredientTitle;

        if (typeof ingredientDescription === 'string') {
            let descArr = ingredientDescription.split(" ", 15);
            ingredientDescription = descArr.join(" ");
        }
        let description = document.createElement("p");
        description.innerText = ingredientDescription;

        element.append(iconContainer);
        element.append(ingredientName);
        element.append(description);
        result.append(col);
    }
    document.querySelectorAll(".ingredient-element").forEach(function (x, i) {
        x.style.cursor = "pointer";
        x.addEventListener("click", function () {
            (async function () {
                let { strIngredient: ingredientName } = allIngrediants.meals[i]
                let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
                let meals = await response.json();
                // console.log(meals);
                displayMeals(meals, container);
            })();
        });
    });
}

window.addEventListener("load", function () {
    (async function () {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        allCategories = await response.json();
        // console.log(allCategories)
    })();
    (async function () {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
        allAreas = await response.json();
        // console.log(allAreas)
    })();
    (async function () {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
        allIngrediants = await response.json();
        // console.log(allIngrediants);
    })();
    (async function () {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
        let homeMeals = await response.json();
        displayMeals(homeMeals, container);
    })();


})

options.forEach((element, index) => {
    if (element.innerText === "Search") {
        element.addEventListener("click", function () {
            displaySearchInputs();
        })

    }
    else if (element.innerText === "Categories") {
        element.addEventListener("click", function () {
            displayAllCategories(container);
        })
    }
    else if (element.innerText === "Area") {
        element.addEventListener("click", function () {
            displayAllAreas(container);
        })
    }
    else if (element.innerText === "Ingrediants") {
        element.addEventListener("click", function () {
            displayAllIngrediants(container);
        })
    }
});


