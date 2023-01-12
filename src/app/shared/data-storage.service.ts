import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})// makes it available app wide and allows other services to be injected into it.
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private authService: AuthService) {}

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
    return this.authService.user.pipe(
      take(1), // only takes one user using take(), and don't need to manually unsubscribe, take handles that.
      exhaustMap(user => {// waits for first observable to complete and returns a new observable with the inner observable.
        return this.http
          .get<Recipe[]>(
            'https://course-project-recipe-bo-b33d2-default-rtdb.firebaseio.com/recipes.json',// need to use the get method what type the data should be.
            {
              params: new HttpParams().set('auth', user.token)
            }
          );
      }),
      map(recipes => {// operator that allows data transformation
        return recipes.map(recipe => {//called on an array method that allows us to transform elements in the array, executed for each recipe (anonymous function).
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
          // spread operator to copy the properties of property, then ingredients is set using a turn array expression ? check if recipe ingredients is trueish,
          // which it is if it is an array of zero or more elements, then set to ingredients else : an empty array.
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes)// get an error if you haven't informed typescript of the type of data that should be received.
      })
      );
  }
}
