import { Component, OnInit } from '@angular/core';

import { Ingredient } from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit{
  // @ViewChild('nameInput') nameInputREef: ElementRef;
  // @ViewChild('amountInput') amountInputREef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  subscription: Subscription;
  constructor(private slService: ShoppingListService) {
  }
  ngOnInit() {
    this.slService.startedEditing
      .subscribe();
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.slService.addIngredient(newIngredient);
  }
}
