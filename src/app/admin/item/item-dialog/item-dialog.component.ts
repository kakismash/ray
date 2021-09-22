import { Category } from './../../../../model/category.model';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/model/item.model';
import { BucketService } from 'src/service/bucket.service';
import { Image } from 'src/model/image.model';
import { SessionStorageService } from 'src/service/session-storage.service';

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.scss'],
})
export class ItemDialogComponent {
  item:             Item     = new Item();
  uploadProgress:   boolean  = false;
  requiredFileType: string   = 'image/x-png, image/gif, image/jpeg';
  category:         Category = new Category();

  constructor(public dialogRef:                     MatDialogRef<ItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {category: Category, item: Item},
              public readonly sessionService: SessionStorageService,
              public readonly bucketService:                 BucketService) {

    this.initItem();

    Object.assign(this.category, data.category);
    if (data.item && data.item.id) {
      Object.assign(this.item, data.item);
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
    this.item.category = new Category();
    this.item.category = this.category;
    this.dialogRef.close(this.item);
  }

  async onFileSelected(event: any) {
    if (this.item.image) {
      await this.bucketService.deleteFile(this.item.image);
    }
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.item.image = file.name;
      const formData  = new FormData();
      formData.append('file', file);
      this.bucketService
          .uploadFile(formData, this.sessionService.loadStore().name)
          .subscribe(r => {
            const image: Image = r;
            this.item.image     = image.url;
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
