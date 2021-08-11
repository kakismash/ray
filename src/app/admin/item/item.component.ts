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
  categories: Array<Category> = [];
  items: Array<Item> = [];
  constructor(private readonly categoryService: CategoryService,
              private readonly itemService: ItemService,
              private readonly sessionStorageService: SessionStorageService) { }

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

  }

  onDelete(event: MouseEvent | TouchEvent, item: Item) {

  }

  openItemDialog(item?: Item): void {

  }

}
