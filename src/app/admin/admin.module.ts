import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { StoreComponent } from './store/store.component';
import { ItemComponent } from './item/item.component';
import { AdminComponent } from './admin.component';
import { StoreDialogComponent } from './store/store-dialog/store-dialog.component';
import { CategoryDialogComponent } from './category/category-dialog/category-dialog.component';
import { ItemDialogComponent } from './item/item-dialog/item-dialog.component';
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
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ThemeSwitchComponent } from './theme-switch-component/theme-switch-component.component';
import { UserDialogComponent } from './user/user-dialog/user-dialog.component';
import { UserMenuComponent } from './user/user-menu/user-menu.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './interceptor/request.interceptor';
import { ResponseInterceptor } from './interceptor/response.interceptor';

@NgModule({
  declarations: [
    UserComponent,
    CategoryComponent,
    StoreComponent,
    ItemComponent,
    AdminComponent,
    StoreDialogComponent,
    CategoryDialogComponent,
    ItemDialogComponent,
    ThemeSwitchComponent,
    UserDialogComponent,
    UserMenuComponent
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
    MatButtonToggleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: []
})
export class AdminModule { }
