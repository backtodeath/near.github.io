import {Component, Inject} from '@angular/core';
import { login } from 'src/utils';
import {WINDOW} from "../../services/window.service";

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.css'],
})
export class LoginComponent {
    constructor(@Inject(WINDOW) private window: Window) {}

    login(): void {
        login()
    }
}
