import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { UserService } from './../../../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  users:          Array<User> = new Array<User>();
  panelOpenState: boolean     = false;

  constructor(public dialog:          MatDialog,
              private _snackBar:      MatSnackBar,
              private userService:    UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService
        .getAll()
        .subscribe(rUsers => {
          this.users = [];
          this.users = rUsers;
        }, err => {
          console.log(err);
      });
  }

  openUserDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user ? user : undefined
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const user: User = result;
        if (user && !user.id) {
          this.userService
              .create(user)
              .subscribe(rUser => {
                this.users.push(rUser);
                this._snackBar
                    .open('Usuario Creado!', 'Ok', {
                      duration: 3 * 1000,
                    });
              }, err => {
                console.log(err);
                this._snackBar
                    .open('Upss, Algo fue mal!', 'Ok', {
                      duration: 3 * 1000,
                    });
              })
        } else {
          this.userService
              .update(user)
              .subscribe(rUser => {
                for (let a = 0; a < this.users.length; a++) {
                  if (this.users[a].id === rUser.id) {
                    this.users[a] = rUser;
                    break;
                  }
                }
                this._snackBar
                    .open('Usuario Actualizado!', 'Ok', {
                      duration: 3 * 1000,
                    });
              }, err => {
                console.log(err);
                this._snackBar
                    .open('Upss, Algo fue mal!', 'Ok', {
                      duration: 3 * 1000,
                    });
              });
        }
      }
    })
  }

  onEdit(event: MouseEvent | TouchEvent, user: User): void {
    event.stopPropagation();
    this.openUserDialog(user);
  }

  onDelete(event: MouseEvent | TouchEvent, user: User): void {
    event?.stopPropagation();
    this.userService
        .remove(user.id)
        .subscribe(r => {
          console.log(r);
          this.loadUsers();
          this._snackBar
              .open('Usuario Eliminado!', 'Ok', {
                duration: 3 * 1000,
              });
        }, err => {
          console.log(err);
          this._snackBar
              .open('Upss, Algo fue mal!', 'Ok', {
                duration: 3 * 1000,
              });
        });
  }

}
