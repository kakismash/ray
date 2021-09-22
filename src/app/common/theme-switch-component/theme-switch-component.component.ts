import { Component, OnInit, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'theme-switch-component',
  templateUrl: './theme-switch-component.component.html',
  styleUrls: ['./theme-switch-component.component.scss']
})
export class ThemeSwitchComponent  {

  @Input() color!: string;

  private static readonly DARK_THEME_CLASS = 'dark-theme';
  private static readonly DARK_THEME_LIGHT = 'light';
  private static readonly DARK_THEME_DARK  = 'dark';

  styles?: Array<string> = ['Modo Oscuro', 'Modo Claro'];

  public theme: string;



  constructor(@Inject(DOCUMENT) private document: Document) {
      this.theme = this.document.documentElement.classList.contains(ThemeSwitchComponent.DARK_THEME_CLASS) ? ThemeSwitchComponent.DARK_THEME_DARK : ThemeSwitchComponent.DARK_THEME_LIGHT;
      this.selectDarkTheme();
  }

  ngOnInit(): void {
    if (this.color && this.color === 'claro') {
      this.selectLightTheme();
    } else {
      this.selectDarkTheme();
    }
  }

  private selectDarkTheme(): void {
      this.document.documentElement.classList.add(ThemeSwitchComponent.DARK_THEME_CLASS);
      this.theme = ThemeSwitchComponent.DARK_THEME_DARK;
  }

  onSelectionChange(selected: string): void {
    if (selected === 'Modo Oscuro') {
      this.selectDarkTheme()
    } else if (selected === 'Modo Claro') {
      this.selectLightTheme();
    }
  }

  private selectLightTheme(): void {
      this.document.documentElement.classList.remove(ThemeSwitchComponent.DARK_THEME_CLASS);
      this.theme = ThemeSwitchComponent.DARK_THEME_LIGHT;
  }
}
