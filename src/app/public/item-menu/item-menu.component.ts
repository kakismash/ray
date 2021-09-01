import { ItemService } from './../../../service/item.service';
import { Item } from './../../../model/item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input() item!: Item;

  constructor() { }

  ngOnInit(): void {
    console.log(this.item)
  }

}
