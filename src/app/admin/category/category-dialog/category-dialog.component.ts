import { BucketService } from './../../../../service/bucket.service';
import { Category } from './../../../../model/category.model';
import { Store } from './../../../../model/store.model';
import { CategoryService } from './../../../../service/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

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
              public bucketService:                 BucketService) {

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

  onFileSelected(event: any) {
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.category.image = file.name;
      const formData      = new FormData();
      formData.append('upload', file);
      this.bucketService
          .uploadFile(formData)
          .subscribe(r => {
            this.category.image = r;
            this.uploadProgress = false;
            console.log(this.category)
          }, err => {
            console.log(err);
            this.uploadProgress = false;
            this.category.image     = '';
          });
    }
  }

  cancelUpload() {
    this.category.image = '';
  }

}
