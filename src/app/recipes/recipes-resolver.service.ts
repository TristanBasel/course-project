import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { DataStorageService } from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})// added automatically
export class RecipesResolverService implements Resolve<Recipe[]>{// resolve is a generic interface so we must define a data type.
  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    // this check ensures that if there are recipes in the service, we don;t want to overwrite them.
    if (recipes.length=== 0){
      return this.dataStorageService.fetchRecipes();// observable of array.
    } else {
      return recipes;
    }
  }
}
