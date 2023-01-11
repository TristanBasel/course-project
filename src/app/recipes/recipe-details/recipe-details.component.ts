import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit{

  recipe: Recipe;
  id: number;

  constructor(private  recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];// the + is because in the route it's a string, but we want a number.
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }

  onAddToShoppingList(){
    this.recipeService.addShoppingIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);// this reaches out to the recipe service to do the actual delete in the corresponding component.
    this.router.navigate(['/recipes']);
  }
}
