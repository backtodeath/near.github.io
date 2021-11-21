import { Contract, WalletConnection } from 'near-api-js'

interface MyContract extends Contract {
  show_previous_visitor(): string | null
  show_total_number_of_visitors(): string | null
  visit_with_name(value: { visitor_name: string }): number | null
}

declare global {
  interface Window {
    walletConnection: WalletConnection
    accountId: string
    contract: MyContract
    nearInitPromise: Promise<void>
  }
}
