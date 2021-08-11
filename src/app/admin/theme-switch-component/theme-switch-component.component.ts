import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-switch-component',
  templateUrl: './theme-switch-component.component.html',
  styleUrls: ['./theme-switch-component.component.scss']
})
export class ThemeSwitchComponent  {
  private static readonly DARK_THEME_CLASS = 'dark-theme';
  private static readonly DARK_THEME_LIGHT = 'light';
  private static readonly DARK_THEME_DARK = 'dark';

  styles?: Array<string> = ['Dark', 'Light'];

  public theme: string;

  constructor(@Inject(DOCUMENT) private document: Document) {
      this.theme = this.document.documentElement.classList.contains(ThemeSwitchComponent.DARK_THEME_CLASS) ? ThemeSwitchComponent.DARK_THEME_DARK : ThemeSwitchComponent.DARK_THEME_LIGHT;
      this.selectDarkTheme();
  }

  private selectDarkTheme(): void {
      this.document.documentElement.classList.add(ThemeSwitchComponent.DARK_THEME_CLASS);
      this.theme = ThemeSwitchComponent.DARK_THEME_DARK;
  }

  onSelectionChange(selected: string): void {
    if (selected === 'Dark') {
      this.selectDarkTheme()
    } else if (selected === 'Light') {
      this.selectLightTheme();
    }
  }

  private selectLightTheme(): void {
      this.document.documentElement.classList.remove(ThemeSwitchComponent.DARK_THEME_CLASS);
      this.theme = ThemeSwitchComponent.DARK_THEME_LIGHT;
  }
}