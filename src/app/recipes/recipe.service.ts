import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {

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

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}