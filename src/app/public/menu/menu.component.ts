import { Public } from './../shared/public.model';
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

  @Input() public!: Public;

  constructor() { }

  ngOnInit(): void {
  }

  getItemsByCategory(categoryId: number): Array<Item> {
    const items: Array<Item> = new Array<Item>();
    const category: Category = this.public.store.categories.find(c => c.id === categoryId) || new Category();
    items.push(...category.items);
    return items;
  }

}
