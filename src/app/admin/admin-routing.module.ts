import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { StoreComponent } from './store/store.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {path: '', component: AdminComponent, children: [
    {path: 'store', component: StoreComponent},
    {path: 'user', component: UserComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'item', component: ItemComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
