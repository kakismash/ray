import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitchComponent } from './theme-switch-component/theme-switch-component.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ThemeSwitchComponent],
  exports: [ThemeSwitchComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class CommonPackModule { }
