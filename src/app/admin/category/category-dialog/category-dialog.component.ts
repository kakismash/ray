import { BucketService } from './../../../../service/bucket.service';
import { Category } from './../../../../model/category.model';
import { Store } from './../../../../model/store.model';
import { CategoryService } from './../../../../service/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { Image } from 'src/model/image.model';
import { SessionStorageService } from 'src/service/session-storage.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {

  store:            Store    = new Store();
  category:         Category = new Category();
  uploadProgress:   boolean  = false;
  requiredFileType: string   = 'image/x-png, image/gif, image/jpeg';

  constructor(public dialogRef:                     MatDialogRef<CategoryDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {store: Store, category: Category},
              public readonly sessionService: SessionStorageService,
              public readonly bucketService:                 BucketService) {

    Object.assign(this.store, data.store);
    if (data.category && data.category.id) {
      Object.assign(this.category, data.category);
    }
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.category.store = new Store();
    this.category.store = this.store;
    this.dialogRef.close(this.category);
  }

  cancelUpload() {
    this.category.image = '';
  }

}
