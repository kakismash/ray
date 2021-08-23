import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from 'src/model/store.model';
import { BucketService } from 'src/service/bucket.service';

@Component({
  selector: 'app-store-dialog',
  templateUrl: './store-dialog.component.html',
  styleUrls: ['./store-dialog.component.scss'],
})
export class StoreDialogComponent {
  store:            Store   = new Store();
  uploadProgress:   boolean = false;
  requiredFileType: string  = 'image/x-png, image/gif, image/jpeg';

  constructor(public dialogRef:                     MatDialogRef<StoreDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Store,
              public bucketService:                 BucketService) {

    this.initStore();

    if (data && data.id) {
      Object.assign(this.store, data);
    }
  }

  initStore(): void {
    this.store          = new Store();
    this.store.name     = '';
    this.store.about    = '';
    this.store.address  = '';
    this.store.email    = '';
    this.store.facebook = '';
    this.store.logo     = '';
    this.store.phone    = '';
    this.store.background = '';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.store);
  }

  onFileSelected(event: any, type: string) {
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.store.logo = file.name;
      const formData  = new FormData();
      formData.append('upload', file);
      this.bucketService
          .uploadFile(formData)
          .subscribe(r => {
            if (type === 'logo') {
              this.store.logo     = r;
              this.uploadProgress = false;
            } else if (type === 'background') {
              this.store.background = r;
              this.uploadProgress   = false;
            }
          }, err => {
            console.log(err);
            this.uploadProgress = false;
            this.store.logo     = '';
          });
    }
  }

  cancelUpload() {
    this.store.logo = '';
  }
}
