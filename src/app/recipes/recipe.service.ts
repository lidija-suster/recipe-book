import { EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

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
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 30)
            ])
    ];

    getRecipes() {
        return this.recipes.slice();
    }
}