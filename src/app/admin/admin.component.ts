import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Store } from 'src/model/store.model';
import { SessionStorageService } from 'src/service/session-storage.service';
import { StoreService } from 'src/service/store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  showFiller:                       boolean          = false;
  stores:                           Array<Store>     = new Array<Store>();
  selectedStore!:                   Store;
  loading:                          boolean          = false;
  @ViewChild(MatMenuTrigger) menu?: MatMenuTrigger;

  constructor(private storeService: StoreService,
              private sessionStorageService: SessionStorageService) {}

  ngOnInit(): void {
    this.loadStores(false);
  }

  onStoreChange(): void {
    this.loadStores(true);
  }

  loadStores(needMenuOpen: boolean): void {
    this.loading = true;
    this.storeService
        .getAll()
        .subscribe(rStores => {
          this.stores = rStores;
          if (!this.selectedStore && this.stores && this.stores.length > 0) {
            this.sessionStorageService.save(this.stores[0]);
            this.selectedStore = this.stores[0];
          }
          if (needMenuOpen) {
            this.menu?.openMenu();
          }

          this.loading = false;
        }, err => {
          console.log(err);
          this.loading = false;
        });
  }

}
