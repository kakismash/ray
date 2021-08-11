import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
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
    this.initCategories();
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

  openCategoryDialog(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
                        data: {store: this.store, category: category}
                      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const category: Category = result;
        if (category && !category.id) {
          this.categoryService
              .createOrEditAndAttachToStore(this.store.id, category)
              .subscribe(rCategory => {
                this.categories.push(rCategory);
                this._snackBar
                    .open('Categoría Creada!', 'Ok', {
                      duration: 3 * 1000,
                    });
              }, err => {
                console.log(err);
                this._snackBar
                    .open('Upss, Algo fue mal!', 'Ok', {
                      duration: 3 * 1000,
                    });
              })
        } else {
          this.categoryService
              .createOrEditAndAttachToStore(this.store.id, category)
              .subscribe(rCategory => {
                for (let a = 0; a < this.categories.length; a++) {
                  if (this.categories[a].id === rCategory.id) {
                    this.categories[a] = rCategory;
                    break;
                  }
                }
                this._snackBar
                    .open('Categoría Actualizada!', 'Ok', {
                      duration: 3 * 1000,
                    });
              }, err => {
                console.log(err);
                this._snackBar
                    .open('Upss, Algo fue mal!', 'Ok', {
                      duration: 3 * 1000,
                    });
              });
        }
      }
    })
  }

  onEdit(event: MouseEvent | TouchEvent, category: Category): void {
    event.stopPropagation();
    this.openCategoryDialog(category);
  }

  onDelete(event: MouseEvent | TouchEvent, category: Category): void {
    event?.stopPropagation();
    this.categoryService
        .removeFromStore(this.store.id, category.id)
        .subscribe(r => {
          console.log(r);
          this.initCategories();
          this._snackBar
              .open('Categoría Eliminada!', 'Ok', {
                duration: 3 * 1000,
              });
        }, err => {
          console.log(err);
          this._snackBar
              .open('Upss, Algo fue mal!', 'Ok', {
                duration: 3 * 1000,
              });
        });
  }

}
