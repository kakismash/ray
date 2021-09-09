import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from 'src/model/store.model';
import { StoreService } from 'src/service/store.service';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores:         Array<Store> = new Array<Store>();
  panelOpenState: boolean      = false;

  constructor(public dialog:                      MatDialog,
              private _snackBar:                  MatSnackBar,
              private storeService:               StoreService,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.initStores();
  }

  initStores(): void {
    this.storeService
        .getAll()
        .subscribe(rStores => {
          this.stores = [];
          this.stores = rStores;
        }, err => {
          console.log(err);
        });
  }

  getMainURL(): any {
    return this.document.location.origin;
  }

  openStoreDialog(store?: Store): void {
    const dialogRef = this.dialog.open(StoreDialogComponent, {
      data: store ? store : undefined
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const store: Store = result;
        if (store && !store.id) {
          this.storeService
              .create(store)
              .subscribe(rStore => {
                this.stores.push(rStore);
                this._snackBar
                    .open('Tienda Creada!', 'Ok', {
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
          this.storeService
              .update(store)
              .subscribe(rStore => {
                for (let a = 0; a < this.stores.length; a++) {
                  if (this.stores[a].id === rStore.id) {
                    this.stores[a] = rStore;
                    break;
                  }
                }
                this._snackBar
                    .open('Tienda Actualizada!', 'Ok', {
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

  onEdit(event: MouseEvent | TouchEvent, store: Store): void {
    event.stopPropagation();
    this.openStoreDialog(store);
  }

  onDelete(event: MouseEvent | TouchEvent, store: Store): void {
    event?.stopPropagation();
    this.storeService
        .remove(store.id)
        .subscribe(r => {
          console.log(r);
          this.initStores();
          this._snackBar
              .open('Tienda Eliminada!', 'Ok', {
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

  onPrint(store: Store): void {
    const printContent = document.getElementById("qrCode");
    const WindowPrt    = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt!.document.write(`<html>
                                <head>
                                    <style>
                                        .logo-size {width: 100px; height: 100px; vertical-align: middle;}
                                        .qr-size {width: 400px; height: 400px;}
                                        .text {display: inline-block; font-family: 'Work Sans', sans-serif; font-size: 40px; font-weight: bold;}
                                        .f-center {display: flex; justify-content: center;}
                                        .s-center {padding: 10px;margin: 10px;}
                                    </style>
                                </head>
                                <body>
                                    <div class="f-center">
                                        <div class="s-center">
                                            <img class="logo-size" src="${ store.logo }">
                                            <p class="text">${ store.name }</p>
                                        </div>
                                    </div>
                                    <div class="f-center">
                                        <div class="s-center">
                                            ${ printContent!.innerHTML }
                                        </div>
                                    </div>


                                </body>
                            </html>
                          `);
    WindowPrt!.document.close();
    WindowPrt!.focus();
    WindowPrt!.print();
    // WindowPrt!.close();
  }


}
