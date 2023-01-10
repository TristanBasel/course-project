import { Ingredient } from "../shared/ingredient.model";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 20),
  ];

  getIngredients(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]){
    // for (let ingredient of ingredients){
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);// this is a method to an entire array as individual entries, much faster than for loop as less events are fired.
    this.ingredientsChanged.next(this.ingredients.slice());// have to do this because else we send the unchanged array.
  }
}
