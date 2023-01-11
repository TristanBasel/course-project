import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})// makes it available app wide and allows other services to be injected into it.
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    // could pass recipes: Recipe[] to the function and write the http request here,
    // or inject recipes service into here then directly get the currently loaded recipe for use.
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://course-project-recipe-bo-b33d2-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      })

  }

  fetchRecipes() {
    // fetch the data from the "DATABASE".
    this.http
      .get<Recipe[]>('https://course-project-recipe-bo-b33d2-default-rtdb.firebaseio.com/recipes.json')// need to the the get method what type the data should be.
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes)// get an error if you haven't informed typescript of the type of data that should be received.
      })
  }
}
