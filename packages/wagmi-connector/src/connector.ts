import {
  Chain,
  ConnectorNotFoundError,
  InjectedConnector,
  ResourceUnavailableError,
  RpcError,
  UserRejectedRequestError,
  InjectedConnectorOptions
} from '@wagmi/core'

export type TalismanConnectorOptions = InjectedConnectorOptions & {
  // nothing for now
}

export class TalismanConnector extends InjectedConnector {
  readonly id = 'talisman'
  readonly ready = typeof window != 'undefined' && !!window.talismanEth

  constructor({
    chains,
    options: options_
  }: {
    chains?: Chain[]
    options?: TalismanConnectorOptions
  } = {}) {
    super({
      chains,
      options: {
        name: 'Talisman',
        shimDisconnect: true,
        shimChainChangedDisconnect: true,
        ...options_
      }
    })
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    try {
      const provider = await this.getProvider()
      if (!provider) throw new ConnectorNotFoundError()

      if (provider.on) {
        provider.on('accountsChanged', this.onAccountsChanged)
        provider.on('chainChanged', this.onChainChanged)
        provider.on('disconnect', this.onDisconnect)
      }

      this.emit('message', { type: 'connecting' })

      const account = await this.getAccount()
      // Switch to chain if provided
      let id = await this.getChainId()
      let unsupported = this.isChainUnsupported(id)
      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId)
        id = chain.id
        unsupported = this.isChainUnsupported(id)
      }

      return { account, chain: { id, unsupported }, provider }
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) throw new UserRejectedRequestError(error)
      if ((<RpcError>error).code === -32002) throw new ResourceUnavailableError(error)
      throw error
    }
  }

  async getProvider() {
    if (typeof window === 'undefined') return
    return window.talismanEth
  }
}
