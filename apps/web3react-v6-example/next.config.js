/**
 * @type {import('next').NextConfig}
 */
const config = {
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
  },
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        electron: false,
        '@ethereumjs/tx': false,
      }
    } else {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        electron: false,
        '@ethereumjs/tx': false,
      }
    }
    return config
  },
  experimental: {
    esmExternals: 'loose',
  },
}

module.exports = config
