import {Component, Inject} from '@angular/core';
import { logout } from 'src/utils';
import {WINDOW} from "../../services/window.service";

@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.css'],
})
export class HomeComponent {
    showNotification = true

    constructor(@Inject(WINDOW) private window: Window) {
    }

    get accountId(): string {
        return this.window.walletConnection.getAccountId()
    }

    get signedIn(): boolean {
        return this.window.walletConnection.isSignedIn()
    }

    get contractId(): string {
        return this.window.contract.contractId
    }

    get buttonDisabled(): boolean {
        return false
    }

    logout(): void {
        logout()
    }

}
