import { SessionStorageService } from 'src/service/session-storage.service';
import { User } from 'src/model/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  loggedUser: User = new User();

  constructor(private sessionStorageService: SessionStorageService) {
    this.loggedUser = sessionStorageService.loadUser();
  }

  ngOnInit(): void {
  }

}
