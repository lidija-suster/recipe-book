import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe(
            'Pizza',
            'Extra hot sauce pizza',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTfpeXZhCIXBZa4OubuouGNip1XjsC49GfPXw&usqp=CAU',
            [
                new Ingredient('Mushrooms', 20),
                new Ingredient('Olives', 10),
                new Ingredient('Hot sauce', 1)
            ]),
        new Recipe(
            'Kobasice',
            'Super hot barbecue sausages',
            'https://p0.pikrepo.com/preview/409/766/pile-of-grilled-sausages.jpg',
            [
                new Ingredient('Meat', 10),
                new Ingredient('French Fries', 30)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) { }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        // It's not working because we are pushing new recipe to original array, 
        // but getting copy of an array (with slice method)
        this.recipes.push(recipe);
        // Emit event to a copy of an array
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}