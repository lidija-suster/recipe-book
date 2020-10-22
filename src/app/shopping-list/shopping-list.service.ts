import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingretientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        // It's not working because we are pushing new ingredient to original array, 
        // but getting copy of an array (with slice method)
        this.ingredients.push(ingredient);
        // Emit event to a copy of an array
        this.ingretientsChanged.emit(this.ingredients.slice());
    }
}