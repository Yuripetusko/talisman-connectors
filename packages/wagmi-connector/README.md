# Wagmi connector - Talisman

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)

## Install

`yarn add @talismn/wagmi-connector`

## Options

```typescript
chains?: Chain[]
```

## Example

```javascript
import { WagmiConfig, configureChains, createClient, defaultChains } from 'wagmi'
import { TalismanConnector } from '@talismn/wagmi-connector'

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [alchemyProvider({ alchemyId })])

const client = createClient({
  autoConnect: true,
  connectors: [
    new TalismanConnector({
      chains,
    }),
    //...other connectors
  ],
  provider,
  webSocketProvider,
})
```

## Version compatibility

`wagmi` 0.9.x is compatible with current version of `@talismn/wagmi-connector`.
`wagmi` 0.8.x isn't compatible.
`wagmi` 0.7.x is compatible with `@talismn/wagmi-connector` version 0.1.x.
