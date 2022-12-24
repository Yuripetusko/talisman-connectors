import { Chain, InjectedConnector, InjectedConnectorOptions } from '@wagmi/core'

export type TalismanConnectorOptions = InjectedConnectorOptions & {
  // nothing for now
}

export class TalismanConnector extends InjectedConnector {
  readonly id = 'talisman'
  readonly ready = typeof window != 'undefined' && !!window.talismanEth

  constructor({
    chains,
    options: options_,
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
        ...options_,
      },
    })
  }

  async getProvider() {
    if (typeof window === 'undefined') return
    return window.talismanEth
  }
}
