import { SessionStorageService } from 'src/service/session-storage.service';
import { Store } from './../../../model/store.model';
import { Category } from './../../../model/category.model';
import { CategoryService } from './../../../service/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories:     Array<Category> = new Array<Category>();
  panelOpenState: boolean         = false;
  store:          Store           = new Store();

  constructor(public dialog:                 MatDialog,
              private _snackBar:             MatSnackBar,
              private categoryService:       CategoryService,
              private sessionStorageService: SessionStorageService) {

    this.store = sessionStorageService.loadStore();
  }

  ngOnInit(): void {
  }


  initCategories(): void {
    this.categoryService
        .getAllByStore(this.store.id)
        .subscribe(rCategories => {
          this.categories = new Array<Category>();
          this.categories = rCategories;
        }, err => {
          console.log(err);
        });
  }

  openCategoryDialog(): void {
  }

  onEdit(event: MouseEvent | TouchEvent, category: Category): void {

  }

  onDelete(event: MouseEvent | TouchEvent, category: Category): void {

  }

}
