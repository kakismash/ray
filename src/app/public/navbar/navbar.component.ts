import { Public } from './../shared/public.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() public!: Public;

  constructor() {}

  ngOnInit(): void {
  }

}
