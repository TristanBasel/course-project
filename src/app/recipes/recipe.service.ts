import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe(
      'Another Test Recipe',
      'This is simply another test',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ])
  ];

  constructor(private  slService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();// don't want to pass the actual array only a copy, else it could be changed, so use slice, the whole thing
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addShoppingIngredients(ingredients: Ingredient[]){
    this.slService.addIngredients(ingredients);
  }
}
