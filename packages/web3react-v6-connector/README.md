# `web3-react` Documentation - Talisman

- [Install](#install)
- [Arguments](#arguments)
- [Example](#example)
- [Errors](#errors)
  - [NoEthereumProviderError](#noethereumprovidererror)
    - [Example](#example-1)
  - [UserRejectedRequestError](#userrejectedrequesterror)
    - [Example](#example-2)

## Install

`yarn add @talismn/web3react-v6-connector`

## Arguments

```typescript
supportedChainIds?: number[]
```

## Example

```javascript
import { TalismanConnector } from '@talismn/web3react-v6-connector'

const talisman = new TalismanConnector({ supportedChainIds: [1, 3, 4, 5, 42] })
```

## Errors

### NoEthereumProviderError

#### Example

```javascript
import { NoEthereumProviderError } from '@talismn/web3react-v6-connector'

function Component() {
  const { error } = useWeb3React()
  const isNoEthereumProviderError = error instanceof NoEthereumProviderError
  // ...
}
```

### UserRejectedRequestError

#### Example

```javascript
import { UserRejectedRequestError } from '@talismn/web3react-v6-connector'

function Component() {
  const { error } = useWeb3React()
  const isUserRejectedRequestError = error instanceof UserRejectedRequestError
  // ...
}
```
