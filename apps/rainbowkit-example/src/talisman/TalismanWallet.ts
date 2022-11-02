import { Chain, Wallet } from '@rainbow-me/rainbowkit'
import imgTalisman from './talisman.png'
import { TalismanConnector } from '@talismn/wagmi-connector'

export interface TalismanWalletOptions {
  chains: Chain[]
  shimDisconnect?: boolean
}

export const talismanWallet = ({ chains, shimDisconnect }: TalismanWalletOptions): Wallet => ({
  id: 'talisman',
  name: 'Talisman',
  iconUrl: imgTalisman,
  iconBackground: '#D5FF5C',
  downloadUrls: {
    browserExtension: 'https://talisman.xyz/download',
  },
  createConnector: () => {
    const connector = new TalismanConnector({
      chains,
      options: {
        shimDisconnect,
      },
    })

    return { connector }
  },
})
