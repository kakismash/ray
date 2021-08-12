import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BucketService } from './../../../../service/bucket.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/model/user.model';
import { Component, OnInit, Inject } from '@angular/core';

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

    this.options          = fb.group({
      email:     this.emailControl,
      password:  this.passwordControl,
      firstname: this.firstnameControl,
      lastname:  this.lastnameControl
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

  onFileSelected(event: any) {
    this.uploadProgress = true;
    const file: File    = event.target.files[0];
    if (file) {
      this.user.image = file.name;
      const formData  = new FormData();
      formData.append('upload', file);
      this.bucketService
          .uploadFile(formData)
          .subscribe(r => {
            this.user.image     = r;
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
