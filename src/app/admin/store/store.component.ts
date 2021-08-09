import { SessionStorageService } from './../../service/session-storage.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from 'src/model/store.model';
import { StoreService } from 'src/service/store.service';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores:         Array<Store> = new Array<Store>();
  panelOpenState: boolean      = false;

  constructor(public dialog:          MatDialog,
              private _snackBar:      MatSnackBar,
              private storeService:   StoreService,
              private sessionStorage: SessionStorageService) { }

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
                this.sessionStorage.saveStore(store.name, JSON.stringify(store));
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
          this.sessionStorage.removeStore(store.name);
        }, err => {
          console.log(err);
          this._snackBar
              .open('Upss, Algo fue mal!', 'Ok', {
                duration: 3 * 1000,
              });
        });
  }

}
