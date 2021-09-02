import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from './../../../model/item.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input() item!: Item;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDialog(): void {
    const dialogRef = this.dialog.open(ItemDialogComponent, { data: this.item });
  }

}
