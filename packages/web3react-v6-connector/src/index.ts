import { AbstractConnectorArguments, ConnectorUpdate } from '@web3-react/types'
import { AbstractConnector } from '@web3-react/abstract-connector'

export class NoEthereumProviderError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'Talisman EVM provider was not found on window.talismanEth.'
  }
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class TalismanConnector extends AbstractConnector {
  constructor({ supportedChainIds }: AbstractConnectorArguments) {
    super({
      supportedChainIds
    })

    this.handleConnect = this.handleConnect.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleDisconnect = this.handleDisconnect.bind(this)
  }

  private handleChainChanged(chainId: string | number): void {
    if (__DEV__) {
      console.log("Handling 'chainChanged' event with payload", chainId)
    }
    this.emitUpdate({ chainId, provider: window.talismanEth })
  }

  private handleAccountsChanged(accounts: string[]): void {
    if (__DEV__) {
      console.log("Handling 'accountsChanged' event with payload", accounts)
    }
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  private handleDisconnect(code: number, reason: string): void {
    if (__DEV__) {
      console.log("Handling 'close' event with payload", code, reason)
    }
    this.emitDeactivate()
  }

  private handleConnect(data: { chainId: string }): void {
    if (__DEV__) {
      console.log("Handling 'connect' event with payload", data)
    }
    this.emitUpdate({ chainId: data.chainId, provider: window.talismanEth })
  }

  public async activate(): Promise<ConnectorUpdate> {
    if (!window.talismanEth) {
      throw new NoEthereumProviderError()
    }

    if (window.talismanEth.on) {
      window.talismanEth.on('chainChanged', this.handleChainChanged)
      window.talismanEth.on('accountsChanged', this.handleAccountsChanged)
      window.talismanEth.on('disconnect', this.handleDisconnect)
      window.talismanEth.on('connect', this.handleConnect)
    }

    // enable talisman with eth_requestAccounts
    let account: string | undefined
    try {
      const accounts = (await window.talismanEth.request({
        method: 'eth_requestAccounts'
      })) as string[] | undefined

      if (accounts && accounts.length) account = accounts[0]
    } catch (error) {
      if ((error as any).code === 4001) {
        throw new UserRejectedRequestError()
      }
    }

    return { provider: window.talismanEth, account }
  }

  public async getProvider(): Promise<any> {
    return window.talismanEth
  }

  public async getChainId(): Promise<number | string> {
    if (!window.talismanEth) {
      throw new NoEthereumProviderError()
    }

    return (await window.talismanEth.request({
      method: 'eth_chainId'
    })) as string
  }

  public async getAccount(): Promise<null | string> {
    if (!window.talismanEth) {
      throw new NoEthereumProviderError()
    }

    const accounts = (await window.talismanEth.request({
      method: 'eth_accounts'
    })) as string[] | undefined

    return accounts && accounts.length > 0 ? accounts[0] : null
  }

  public deactivate() {
    if (window.talismanEth) {
      window.talismanEth.off('chainChanged', this.handleChainChanged)
      window.talismanEth.off('accountsChanged', this.handleAccountsChanged)
      window.talismanEth.off('connect', this.handleConnect)
      window.talismanEth.off('disconnect', this.handleDisconnect)
    }
  }

  public async isAuthorized(): Promise<boolean> {
    if (!window.talismanEth) {
      return false
    }

    try {
      const accounts = (await window.talismanEth.request({
        method: 'eth_accounts'
      })) as string[] | undefined
      return !!accounts && accounts.length > 0
    } catch {
      return false
    }
  }
}
