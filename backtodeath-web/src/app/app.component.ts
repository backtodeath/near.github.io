import { Component, Inject, OnInit } from '@angular/core'

import { login, logout } from '../utils'
import { WINDOW } from './services/window.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  previousVisitor: string
  numberOfConnections: string
  newVisitor: string
  showNotification = true

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

  constructor(@Inject(WINDOW) private window: Window) {}

  ngOnInit(): void {
    this.fetchPreviousVisitor();
    this.fetchNumberOfConnections();
  }

  login(): void {
    login()
  }

  logout(): void {
    logout()
  }

  async fetchPreviousVisitor(): Promise<void> {
    if (this.signedIn) {
      this.previousVisitor = await this.window.contract.show_previous_visitor();
    }
  }

  async fetchNumberOfConnections(): Promise<void> {
    if (this.signedIn) {
      this.numberOfConnections = await this.window.contract.show_total_number_of_visitors();
    }
  }

  async onSubmit(event): Promise<void> {
    event.preventDefault()

    // get elements from the form using their id attribute
    const { fieldset, visitor } = event.target.elements

    // disable the form while the value gets updated on-chain
    fieldset.disabled = true

    try {
      // make an update call to the smart contract
      await this.window.contract.visit_with_name({ visitor_name: visitor.value })
    } catch (e) {
      alert(
        'Something went wrong! ' +
        'Maybe you need to sign out and back in? ' +
        'Check your browser console for more info.'
      )
      throw e
    } finally {
      // re-enable the form, whether the call succeeded or failed
      fieldset.disabled = false
    }

    // show notification
    this.showNotification = true

    // remove notification again after css animation completes
    // this allows it to be shown again next time the form is submitted
    setTimeout(() => {
      this.showNotification = false
    }, 7000)
  }
}
