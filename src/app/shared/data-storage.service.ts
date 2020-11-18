import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-book-830ab.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        // take(1) = take 1 value from that observable (latest user), 
        // and then it should automatically unsubscribe
        // exaustMap = waits for the first (uset) observable to complete (after we take the latest user)
        // and there we pass the function, where we get the data from the previous observable, 
        // and then we return the new observable in there, which then will replace our previous observable 
        // in entire observable chain
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                return this.http.get<Recipe[]>('https://recipe-book-830ab.firebaseio.com/recipes.json',
                    {
                        params: new HttpParams().set('auth', user.token)
                    })
            }), map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                });
            }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes);
            }));
    }
}