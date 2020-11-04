import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingretientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        // It's not working because we are pushing new ingredient to original array, 
        // but getting copy of an array (with slice method)
        this.ingredients.push(ingredient);
        // Emit event to a copy of an array
        this.ingretientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredients);
        this.ingretientsChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingretientsChanged.next(this.ingredients.slice());
    }
}