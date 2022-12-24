import * as React from 'react'
import * as ReactDOM from 'react-dom/client'

import { WagmiConfig, configureChains, createClient, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { TalismanConnector } from '@talismn/wagmi-connector'
import { App } from './App'
import { avalanche, polygon } from '@wagmi/chains'

const alchemyId = import.meta.env.VITE_ALCHEMY_ID as string

const { chains, provider, webSocketProvider } = configureChains([mainnet, polygon, avalanche], [publicProvider()])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi', //
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
    new TalismanConnector({
      chains,
    }),
  ],
  provider,
  webSocketProvider,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig client={client}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
)
