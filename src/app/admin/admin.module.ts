import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { StoreComponent } from './store/store.component';
import { ItemComponent } from './item/item.component';
import { AdminComponent } from './admin.component';
import { StoreDialogComponent } from './store/store-dialog/store-dialog.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    CategoryComponent,
    StoreComponent,
    ItemComponent,
    AdminComponent,
    StoreDialogComponent,
    CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatRippleModule,
    MatMenuModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule
  ]
})
export class AdminModule { }
