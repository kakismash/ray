import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from 'src/model/store.model';
import { SessionStorageService } from 'src/service/session-storage.service';
import { StoreService } from 'src/service/store.service';
import { StoreDialogComponent } from './store-dialog/store-dialog.component';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores:           Array<Store>                  = new Array<Store>();
  panelOpenState:   boolean                       = false;
  displayedColumns: string[]                      = ['name', 'address', 'phone', 'email', 'facebook', 'about', 'actions'];
  dataSource!:      MatTableDataSource<Store>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!:           MatSort;
  selectedStore:  Store = new Store();

  constructor(public dialog:          MatDialog,
              private _snackBar:      MatSnackBar,
              private storeService:   StoreService,
              private sessionStorageService: SessionStorageService) {

                this.selectedStore = sessionStorageService.loadStore();
               }

  ngOnInit(): void {
    this.initStores();
  }

  applyFilter(event: Event): void {
    const filterValue      = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private refreshTable(): void {
    this.dataSource           = new MatTableDataSource(this.stores);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort      = this.sort;
  }

  initStores(): void {
    this.storeService
        .getAll()
        .subscribe(rStores => {
          this.stores = [];
          this.stores = rStores;
          this.refreshTable();
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

}
