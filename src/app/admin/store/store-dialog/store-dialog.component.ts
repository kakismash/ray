import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Image } from 'src/model/image.model';
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
    this.store.colorMode = 'oscuro';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.store);
  }

  async onFileSelected(event: any, type: string, previusURL?: string) {
    if (previusURL) {
      await this.bucketService.deleteFile(previusURL);
    }
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      if (type === 'logo') {
        this.store.logo = file.name;
      } else if (type === 'background') {
        this.store.background = file.name;
      }
      const formData  = new FormData();
      formData.append('file', file);
      this.bucketService
          .uploadFile(formData, this.store.name)
          .subscribe(r => {
            const image: Image = r;
            if (type === 'logo') {
              this.store.logo     = image.url;
              this.uploadProgress = false;
            } else if (type === 'background') {
              this.store.background = image.url;
              this.uploadProgress   = false;
            }
          }, err => {
            console.log(err);
            this.uploadProgress = false;
            this.store.logo     = '';
          });
    }
  }

  onSelectionChange(event: any) {
    this.store.colorMode = event.value;
  }

  cancelUpload() {
    this.store.logo = '';
  }
}
