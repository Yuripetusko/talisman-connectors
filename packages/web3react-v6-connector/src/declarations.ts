interface RequestArguments {
  readonly method: string
  readonly params?: readonly unknown[] | object
}

interface TalismanEthereum {
  request: (args: RequestArguments) => Promise<unknown>
  enable: () => Promise<string[]>
  on: (method: string, listener: (...args: any[]) => void) => void
  off: (method: string, listener: (...args: any[]) => void) => void
}

declare interface Window {
  talismanEth?: TalismanEthereum
}

declare const __DEV__: boolean
