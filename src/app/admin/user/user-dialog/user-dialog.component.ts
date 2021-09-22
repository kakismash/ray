import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BucketService } from './../../../../service/bucket.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/model/user.model';
import { Component, OnInit, Inject } from '@angular/core';
import { Image } from 'src/model/image.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  user:              User         = new User();
  uploadProgress:    boolean      = false;
  requiredFileType:  string       = 'image/x-png, image/gif, image/jpeg';
  options!:          FormGroup;
  emailControl!:     FormControl;
  passwordControl!:  FormControl;
  firstnameControl!: FormControl;
  lastnameControl!:  FormControl;
  phoneControl!:     FormControl;

  constructor(private fb:                           FormBuilder,
              public dialogRef:                     MatDialogRef<UserDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              public bucketService:                 BucketService) {

    if (data && data.id) {
      Object.assign(this.user, data);
    }

    this.emailControl     = new FormControl(this.user.email, [Validators.required]);
    this.passwordControl  = new FormControl(this.user.password, [Validators.required]);
    this.firstnameControl = new FormControl(this.user.firstname, [Validators.required]);
    this.lastnameControl  = new FormControl(this.user.lastname, [Validators.required]);
    this.phoneControl  = new FormControl(this.user.phone, [Validators.required]);

    this.options          = fb.group({
      email:     this.emailControl,
      password:  this.passwordControl,
      firstname: this.firstnameControl,
      lastname:  this.lastnameControl,
      phone:     this.phoneControl
    });
  }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.user);
  }

  async onFileSelected(event: any) {
    if (this.user.image) {
      await this.bucketService.deleteFile(this.user.image);
    }
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.user.image = file.name;
      const formData  = new FormData();
      formData.append('file', file);
      this.bucketService
          .uploadFile(formData, this.user.firstname + this.user.lastname)
          .subscribe(r => {
            const image: Image = r;
            this.user.image     = image.url;
            this.uploadProgress = false;
            console.log(this.user)
          }, err => {
            console.log(err);
            this.uploadProgress = false;
            this.user.image     = '';
          });
    }
  }

  cancelUpload() {
    this.user.image = '';
  }

}
