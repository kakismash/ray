import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/model/item.model';
import { BucketService } from 'src/service/bucket.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent {
  item:            Item   = new Item();
  uploadProgress:   boolean = false;
  requiredFileType: string  = 'image/png';

  constructor(public dialogRef:                     MatDialogRef<ItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Item,
              public bucketService:                 BucketService) {

    this.initItem();

    if (data && data.id) {
      Object.assign(this.item, data);
    }
  }

  initItem(): void {
    this.item             = new Item();
    this.item.name        = '';
    this.item.description = '';
    this.item.image       = '';
    this.item.price       = 0;

  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.item);
  }

  onFileSelected(event: any) {
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.item.image = file.name;
      const formData  = new FormData();
      formData.append('upload', file);
      this.bucketService
          .uploadFile(formData)
          .subscribe(r => {
            this.item.image     = r;
            this.uploadProgress = false;
            console.log(this.item.image)
          }, err => {
            console.log(err);
            this.uploadProgress = false;
            this.item.image     = '';
          });
    }
  }

  cancelUpload() {
    this.item.image = '';
  }
}
