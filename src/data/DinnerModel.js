import ObservableModel from "./ObservableModel";
import config from "./config.js";

class DinnerModel extends ObservableModel {
    constructor() {
        super();
        this.menu = [];
        this.guests = 1;
        this.loadState();
    }

    loadState() {
        let guests = window.localStorage.getItem("guests");
        if(guests) {
            this.setNumberOfGuests(guests);
        }

        let menu = window.localStorage.getItem("menu");
        if(menu) {
            menu = JSON.parse(menu);
            menu.forEach(dish => this.addDishToMenu(dish));
        }

    }

    getNumberOfGuests() {
        return this.guests;
    }

    setNumberOfGuests(num) {
        if(num >= 0) {
            this.notifyObservers({
                event: "guests",
                data: num
            });
            this.guests = num;
            window.localStorage.setItem("guests", num);
        } else {
            return false;
        }
    }

    getSelectedDish(type) {
        return this.getFullMenu().find(dish => dish.dishTypes[0] === type);
    }

    //Returns all the dishes on the menu.
    getFullMenu() {
        return this.menu;
    }

    //Returns all ingredients for all the dishes on the menu.
    getAllIngredients() {
        return this.getFullMenu().map(res => res.ingredients).flat();
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests.
    getTotalMenuPrice() {
        let totalCost = this.getFullMenu().map(dish => this.getDishPrice(dish)).reduce((acc, price) => acc += price, 0);
        return totalCost * this.guests;
    }

    getDishPrice(dish) {
        return Math.round(dish.pricePerServing);
    }

    addDishToMenu(dish) {
        this.removeDishFromMenu(dish.id);
        let found = this.getSelectedDish(dish.dishTypes[0]);
        if(found) {
            this.removeDishFromMenu(found.id);
        }
        this.menu.push(dish);
        window.localStorage.setItem("menu", JSON.stringify(this.menu));

        this.notifyObservers({
            event: "menu",
            data: this.menu
        });
    }

    //Removes dish from menu
    removeDishFromMenu(id) {
        this.menu = this.menu.filter(dish => dish.id !== id);
        this.notifyObservers({
            event: "menu",
            data: this.menu
        });
    }

    jsonToQuery(json) {
        return '?' + 
            Object.keys(json).map(function(key) {
                if(json[key]) return encodeURIComponent(key) + '=' +
                    encodeURIComponent(json[key]);
            }).join('&');
    }

    apiGet(path, params = {}) {
        let url = path + this.jsonToQuery(params);
        return fetch(config.endpoint+url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Mashape-Key': config.api_key
            }
        }).then(res => res.json());
    }

    getAllDishes(type, query) {
        if(!type && !query)
            return this.apiGet("recipes/search")
                .catch(console.error);
        return this.apiGet("recipes/search", { type, query })
            .catch(console.error);
    }

    //Returns a dish of specific ID
    getDish(id) {
        return this.apiGet("recipes/"+id+"/information", {})
            .catch(console.error);
    }
}

const pizza = {
    "vegetarian": false,
    "vegan": false,
    "glutenFree": false,
    "dairyFree": false,
    "veryHealthy": false,
    "cheap": false,
    "veryPopular": true,
    "sustainable": false,
    "weightWatcherSmartPoints": 13,
    "gaps": "no",
    "lowFodmap": false,
    "ketogenic": false,
    "whole30": false,
    "preparationMinutes": 10,
    "cookingMinutes": 15,
    "sourceUrl": "http://www.jocooks.com/breakfast-2/breakfast-pizza/",
    "spoonacularSourceUrl": "https://spoonacular.com/breakfast-pizza-559251",
    "aggregateLikes": 4235,
    "spoonacularScore": 51,
    "healthScore": 5,
    "creditsText": "Jo Cooks",
    "sourceName": "Jo Cooks",
    "pricePerServing": 195.59,
    "extendedIngredients": [
        {
            "id": 93610,
            "aisle": "Refrigerated",
            "image": "pizza-dough.jpg",
            "consitency": "solid",
            "name": "pizza dough",
            "original": "1 lb pizza dough",
            "originalString": "1 lb pizza dough",
            "originalName": "pizza dough",
            "amount": 1,
            "unit": "lb",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1,
                    "unitShort": "lb",
                    "unitLong": "pound"
                },
                "metric": {
                    "amount": 453.592,
                    "unitShort": "g",
                    "unitLong": "grams"
                }
            }
        },
        {
            "id": 4053,
            "aisle": "Oil, Vinegar, Salad Dressing",
            "image": "olive-oil.jpg",
            "consitency": "liquid",
            "name": "olive oil",
            "original": "1 tbsp olive oil",
            "originalString": "1 tbsp olive oil",
            "originalName": "olive oil",
            "amount": 1,
            "unit": "tbsp",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 1,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                },
                "metric": {
                    "amount": 1,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                }
            }
        },
        {
            "id": 1001026,
            "aisle": "Cheese",
            "image": "shredded-cheese-white.jpg",
            "consitency": "solid",
            "name": "shredded mozzarella cheese",
            "original": "2 cups mozzarella cheese shredded",
            "originalString": "2 cups mozzarella cheese shredded",
            "originalName": "mozzarella cheese shredded",
            "amount": 2,
            "unit": "cups",
            "meta": [
                "shredded"
            ],
            "metaInformation": [
                "shredded"
            ],
            "measures": {
                "us": {
                    "amount": 2,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 473.176,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 1033,
            "aisle": "Cheese",
            "image": "parmesan.jpg",
            "consitency": "solid",
            "name": "parmesan cheese",
            "original": "1/4 cup Parmesan cheese freshly grated",
            "originalString": "1/4 cup Parmesan cheese freshly grated",
            "originalName": "Parmesan cheese freshly grated",
            "amount": 0.25,
            "unit": "cup",
            "meta": [
                "freshly grated"
            ],
            "metaInformation": [
                "freshly grated"
            ],
            "measures": {
                "us": {
                    "amount": 0.25,
                    "unitShort": "cups",
                    "unitLong": "cups"
                },
                "metric": {
                    "amount": 59.147,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 10311529,
            "aisle": "Produce",
            "image": "cherry-tomatoes.png",
            "consitency": "solid",
            "name": "cherry tomatoes",
            "original": "1 cup cherry tomatoes halved",
            "originalString": "1 cup cherry tomatoes halved",
            "originalName": "cherry tomatoes halved",
            "amount": 1,
            "unit": "cup",
            "meta": [
                "halved"
            ],
            "metaInformation": [
                "halved"
            ],
            "measures": {
                "us": {
                    "amount": 1,
                    "unitShort": "cup",
                    "unitLong": "cup"
                },
                "metric": {
                    "amount": 236.588,
                    "unitShort": "ml",
                    "unitLong": "milliliters"
                }
            }
        },
        {
            "id": 10862,
            "aisle": "Meat",
            "image": "cooked-bacon.jpg",
            "consitency": "solid",
            "name": "fried bacon",
            "original": "6 slices bacon fried and roughly chopped",
            "originalString": "6 slices bacon fried and roughly chopped",
            "originalName": "bacon fried and roughly chopped",
            "amount": 6,
            "unit": "slices",
            "meta": [
                "roughly chopped"
            ],
            "metaInformation": [
                "roughly chopped"
            ],
            "measures": {
                "us": {
                    "amount": 6,
                    "unitShort": "slices",
                    "unitLong": "slices"
                },
                "metric": {
                    "amount": 6,
                    "unitShort": "slices",
                    "unitLong": "slices"
                }
            }
        },
        {
            "id": 1123,
            "aisle": "Milk, Eggs, Other Dairy",
            "image": "egg.png",
            "consitency": "solid",
            "name": "eggs",
            "original": "6 eggs",
            "originalString": "6 eggs",
            "originalName": "eggs",
            "amount": 6,
            "unit": "",
            "meta": [],
            "metaInformation": [],
            "measures": {
                "us": {
                    "amount": 6,
                    "unitShort": "",
                    "unitLong": ""
                },
                "metric": {
                    "amount": 6,
                    "unitShort": "",
                    "unitLong": ""
                }
            }
        },
        {
            "id": 11156,
            "aisle": "Produce",
            "image": "fresh-chives.jpg",
            "consitency": "solid",
            "name": "fresh chives",
            "original": "2 tbsp chives fresh, chopped",
            "originalString": "2 tbsp chives fresh, chopped",
            "originalName": "chives fresh, chopped",
            "amount": 2,
            "unit": "tbsp",
            "meta": [
                "fresh",
                "chopped"
            ],
            "metaInformation": [
                "fresh",
                "chopped"
            ],
            "measures": {
                "us": {
                    "amount": 2,
                    "unitShort": "Tbsps",
                    "unitLong": "Tbsps"
                },
                "metric": {
                    "amount": 2,
                    "unitShort": "Tbsps",
                    "unitLong": "Tbsps"
                }
            }
        },
        {
            "id": 11297,
            "aisle": "Produce",
            "image": "parsley.jpg",
            "consitency": "solid",
            "name": "fresh parsley",
            "original": "1 tbsp parsley fresh, chopped",
            "originalString": "1 tbsp parsley fresh, chopped",
            "originalName": "parsley fresh, chopped",
            "amount": 1,
            "unit": "tbsp",
            "meta": [
                "fresh",
                "chopped"
            ],
            "metaInformation": [
                "fresh",
                "chopped"
            ],
            "measures": {
                "us": {
                    "amount": 1,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                },
                "metric": {
                    "amount": 1,
                    "unitShort": "Tbsp",
                    "unitLong": "Tbsp"
                }
            }
        }
    ],
    "id": 559251,
    "title": "Breakfast Pizza",
    "readyInMinutes": 25,
    "servings": 6,
    "image": "https://spoonacular.com/recipeImages/559251-556x370.jpg",
    "imageType": "jpg",
    "cuisines": [
        "mediterranean",
        "european",
        "italian"
    ],
    "dishTypes": [
        "lunch",
        "main course",
        "morning meal",
        "brunch",
        "main dish",
        "breakfast",
        "dinner"
    ],
    "diets": [],
    "occasions": [],
    "winePairing": {
        "pairedWines": [
            "sangiovese",
            "barbera wine",
            "shiraz"
        ],
        "pairingText": "Sangiovese, Barbera Wine, and Shiraz are my top picks for Breakfast Pizza. The best wine for pizza depends on the toppings! Red sauce pizza will call for a red wine with some acidity, such as a barberan or sangiovese. Add pepperoni or sausage and you can go bolder with a syrah. One wine you could try is Ricasoli Brolio Chianti Classico Riserva. It has 4 out of 5 stars and a bottle costs about 27 dollars.",
        "productMatches": [
            {
                "id": 434105,
                "title": "Ricasoli Brolio Chianti Classico Riserva",
                "description": "Intense ruby red color. Clear notes of strawberries, raspberries, spice and vanilla stand out on the nose. The wine is soft and enfolding on the palate; the right balance between acidity and tannins leaves a pleasant and persistent aftertaste in the mouth.Blend: 80% Sangiovese, 15% Merlot, 5% Cabernet Sauvignon.",
                "price": "$26.99",
                "imageUrl": "https://spoonacular.com/productImages/434105-312x231.jpg",
                "averageRating": 0.8,
                "ratingCount": 6,
                "score": 0.7473684210526317,
                "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fricasoli-brolio-chianti-classico-riserva-2014%2F336476"
            }
        ]
    },
    "instructions": "<ul><li>Preheat oven to 500 F degrees.</li><li>Spray a baking sheet (15.25 x 10.25 inches) with cooking spray.</li><li>Roll out the pizza dough and place it on the pizza baking dish. Drizzle the dough with a bit of olive oil.</li><li>Arrange the mozzarella cheese evenly over the dough. Sprinkle with Parmesan cheese.</li><li>Top with bacon and tomato. Crack 6 eggs on the pizza.</li><li>Bake for 10 to 15 minutes or until the edge is golden brown.</li><li>Garnish with chives and parsley.</li></ul>",
    "analyzedInstructions": [
        {
            "name": "",
            "steps": [
                {
                    "number": 1,
                    "step": "Preheat oven to 500 F degrees.Spray a baking sheet (15.25 x 10.25 inches) with cooking spray.",
                    "ingredients": [],
                    "equipment": [
                        {
                            "id": 404727,
                            "name": "baking sheet",
                            "image": "baking-sheet.jpg"
                        },
                        {
                            "id": 404784,
                            "name": "oven",
                            "image": "oven.jpg",
                            "temperature": {
                                "number": 500,
                                "unit": "Fahrenheit"
                            }
                        }
                    ]
                },
                {
                    "number": 2,
                    "step": "Roll out the pizza dough and place it on the pizza baking dish.",
                    "ingredients": [
                        {
                            "id": 93610,
                            "name": "pizza dough",
                            "image": "pizza-dough.jpg"
                        }
                    ],
                    "equipment": [
                        {
                            "id": 404646,
                            "name": "baking pan",
                            "image": "roasting-pan.jpg"
                        }
                    ]
                },
                {
                    "number": 3,
                    "step": "Drizzle the dough with a bit of olive oil.Arrange the mozzarella cheese evenly over the dough. Sprinkle with Parmesan cheese.Top with bacon and tomato. Crack 6 eggs on the pizza.",
                    "ingredients": [
                        {
                            "id": 1026,
                            "name": "mozzarella",
                            "image": "mozzarella.png"
                        },
                        {
                            "id": 1033,
                            "name": "parmesan",
                            "image": "parmesan.jpg"
                        },
                        {
                            "id": 4053,
                            "name": "olive oil",
                            "image": "olive-oil.jpg"
                        },
                        {
                            "id": 1123,
                            "name": "egg",
                            "image": "egg.png"
                        }
                    ],
                    "equipment": []
                },
                {
                    "number": 4,
                    "step": "Bake for 10 to 15 minutes or until the edge is golden brown.",
                    "ingredients": [],
                    "equipment": [],
                    "length": {
                        "number": 10,
                        "unit": "minutes"
                    }
                },
                {
                    "number": 5,
                    "step": "Garnish with chives and parsley.",
                    "ingredients": [
                        {
                            "id": 11297,
                            "name": "parsley",
                            "image": "parsley.jpg"
                        },
                        {
                            "id": 11156,
                            "name": "chives",
                            "image": "fresh-chives.jpg"
                        }
                    ],
                    "equipment": []
                }
            ]
        }
    ]
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
