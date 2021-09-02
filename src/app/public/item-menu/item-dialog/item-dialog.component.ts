import { Item } from './../../../../model/item.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss']
})
export class ItemDialogComponent implements OnInit {

  item: Item = new Item();

  constructor(public  dialogRef:                    MatDialogRef<ItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Item) {

    Object.assign(this.item, data);
  }

  ngOnInit(): void {
  }

}
