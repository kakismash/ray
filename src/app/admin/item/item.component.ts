import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/model/category.model';
import { Item } from 'src/model/item.model';
import { CategoryService } from 'src/service/category.service';
import { ItemService } from 'src/service/item.service';
import { SessionStorageService } from 'src/service/session-storage.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  categorySelected?: Category;
  categories:        Array<Category> = new Array<Category>();
  items:             Array<Item>     = new Array<Item>();

  constructor(private readonly categoryService:       CategoryService,
              private readonly itemService:           ItemService,
              private readonly sessionStorageService: SessionStorageService,
              public  dialog:                         MatDialog,
              private _snackBar:                      MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService
        .getAllByStore(this.sessionStorageService.loadStore().id)
        .subscribe(categoriesR => {
          categoriesR.forEach(c => {
            const newCategory: Category = new Category();
            Object.assign(newCategory, c);
            this.categories.push(newCategory);
          })
        });
  }

  loadItems(categoryId: number): void {
    this.items = [];
    this.itemService
        .getAllByCategory(categoryId)
        .subscribe(itemsR => {
          itemsR.forEach(i => {
            const item = new Item();
            Object.assign(item, i);
            this.items.push(item);
          });
        });
  }

  onSelectionChange(event: any) {
    this.categorySelected = this.categories.find(c => c.id === +event.value);
    this.loadItems(+event.value);
  }

  onEdit(event: MouseEvent | TouchEvent,  item: Item) {
    event.stopPropagation();
    this.openItemDialog(item);
  }

  onDelete(event: MouseEvent | TouchEvent, item: Item) {
    event?.stopPropagation();
    const cat = this.categorySelected ? this.categorySelected : new Category();
    this.itemService
        .removeFromCategory(cat.id, item.id)
        .subscribe(r => {
          console.log(r);
          this.loadItems(cat.id);
          this._snackBar
              .open('Item Eliminado!', 'Ok', {
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

  openItemDialog(item?: Item): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, {
                        data: {category: this.categorySelected, item: item}
                      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const item: Item = result;
        if (item && !item.id && this.categorySelected) {
          this.itemService
              .createOrEditAndAttachToCategory(this.categorySelected.id, item)
              .subscribe(rItem => {
                this.items.push(rItem);
                this._snackBar
                    .open('Item Creado!', 'Ok', {
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
          const cat = this.categorySelected ? this.categorySelected : new Category();
          this.itemService
              .createOrEditAndAttachToCategory(cat.id, item)
              .subscribe(rItem => {
                for (let a = 0; a < this.items.length; a++) {
                  if (this.items[a].id === rItem.id) {
                    this.items[a] = rItem;
                    break;
                  }
                }
                this._snackBar
                    .open('Item Actualizado!', 'Ok', {
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

}
