# Wagmi connector - Talisman

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoEthereumProviderError](#noethereumprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install

`yarn add @talismn/wagmi-connector`

## Options

```typescript
chains?: Chain[]
```

## Example

```javascript
import { TalismanConnector } from '@talismn/wagmi-connector'

const talisman = new TalismanConnector({ supportedChainIds: [1, 3, 4, 5, 42] })

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [alchemyProvider({ alchemyId })])

const client = createClient({
  autoConnect: true,
  connectors: [
    new TalismanConnector({
      chains
    })
    //...
  ],
  provider,
  webSocketProvider
})
```
