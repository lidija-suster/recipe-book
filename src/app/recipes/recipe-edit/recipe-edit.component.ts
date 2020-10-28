import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        // Assign new value to editMode: check if params has an id property
        // If yes (if NOT null) -> this will be string id, otherwise it will be undefined
        // Params (id) will NOT be undefined if we are in edit mode
        // If this check return true (if id IS undefined), this will be false (opposite check),
        // and that means we are in new mode
        this.editMode = params['id'] != null;
      }
    )
  }

}
