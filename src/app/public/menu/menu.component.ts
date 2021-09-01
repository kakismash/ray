import { Store } from './../../../model/store.model';
import { Category } from './../../../model/category.model';
import { Public } from './../shared/public.model';
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

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
  }

  loadCategories(): void {
    this.categoryService
        .getAllByStore(this.store.id)
        .subscribe(rCategories => {
          this.categories = new Array<Category>();
          this.categories = rCategories;
        }, err => {
          console.log(err);
        });
  }

}
