import { ItemService } from './../../../service/item.service';
import { Item } from './../../../model/item.model';
import { Store } from './../../../model/store.model';
import { Category } from './../../../model/category.model';
import { CategoryService } from './../../../service/category.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() store!: Store;
  categories:      Array<Category> = new Array<Category>();

  constructor(private categoryService: CategoryService,
              private itemService:     ItemService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService
        .getAllByStore(this.store.id)
        .subscribe(rCategories => {
          this.categories = new Array<Category>();
          Object.assign(this.categories, rCategories);
        }, err => {
          console.log(err);
        });
  }

  getItemsByCategory(categoryId: number): Array<Item> {
    const items: Array<Item> = new Array<Item>();
    this.itemService
        .getAllByCategory(categoryId)
        .subscribe(itemsR => {
          Object.assign(items, itemsR);
          });
    return items;
  }

}
