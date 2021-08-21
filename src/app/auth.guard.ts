import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { SessionStorageService } from "src/service/session-storage.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private sessionService: SessionStorageService) {
    }

    canActivate(): boolean {
        let can = true;

        if (!this.sessionService.hasToken()) {
            this.sessionService.redirectToLogin();
            can = false;
        }

        return can;
    }
}
