import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

function Page() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  return (
    <>
      {isMounted && (
        <>
          <Connect />
          {isConnected && (
            <>
              <Account />
              <NetworkSwitcher />
            </>
          )}
        </>
      )}
    </>
  )
}

export default Page
