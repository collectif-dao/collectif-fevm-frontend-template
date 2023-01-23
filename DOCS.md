# CollectifDAO Frontend Template Documentation

This document outlines the template's structure, provides general guidelines and explains best practices for frontend development for FEVM. 

## Stack

The CollectifDAO Frontend Template stack includes:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/docs/getting-started) | API routes, server-side rendering
- [ethers](https://docs.ethers.io/v5/) | Ethereum library
- [web3react v6](https://github.com/NoahZinsmeister/web3-react) | Web3 Provider and wallet connectors
- [SWR](https://swr.vercel.app/) | Data fetching and caching
- [styled-components](https://styled-components.com/docs) | custom styled React components

## Environment variables

For testnet deployment, it is recommended to use [Hyperspace](https://github.com/filecoin-project/testnet-hyperspace) network:

```bash
# Wallaby 31415
DEFAULT_CHAIN=3141
SUPPORTED_CHAINS=3141
```

_Note! `DEFAULT_CHAIN` is the network the application defaults to whenever the user wallet is not connected._

### Build-time Variables

If you need to access an environment variable on the client (e.g. supported networks, analytics IDs), you will need to specify a regular server-side environment variable and export it to the client using `getInitialProps`. Below is the detailed procedure on how to do it.

**Step 1.** Specify a variable in `.env.local`, e.g.

```bash
# .env.local
MY_PUBLIC_VAR=hello
```

**Step 2.** Add it to `publicRuntimeConfig` in `next.config.js`

```js
// next.config.js

const myPublicVar = process.env.MY_PUBLIC_VAR;

module.exports = {
  // ...
  publicRuntimeConfig: {
    // ...
    myPublicVar,
  },
};
```

If you take a look at `_app.tsx`, you will see that the public runtime config will be passed down to the app context using the `getInitialProps` function.

**Step 3.** Export the `getServerSideProps` function from each page where you are planning to use your variable. The function doesn't have to return anything but it forces Next.js to run `getInitialProps` on the server.

```ts
// index.tsx

const HomePage: FC<Props> = () => {
  // ...
};

export const getServerSideProps: GetServerSideProps<
  WithdrawProps
> = async () => {
  return {
    props: {},
  };
};
```

**Step 4.** Use [React Context](https://reactjs.org/docs/context.html) to provide your variable. You can find an example providing `defaultChain` and `supportedChainIds` variables in files:

- [providers/index.tsx](providers/index.tsx)
- [providers/web3.tsx](providers/web3.tsx)

Read more about [runtime configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) and [automatic static optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

## JSON RPC Provider

Apart from Web3 connection provided by the user's wallet, we use an additional JSON RPC connection to be able to query Filecoin network before Web3 connection is established. This allows us to show any relevant information the user might need to know before deciding to connect their wallet.

To use JSON RPC Provider, use the `useFilecoinSWR` hook like so,

```ts
function MyComponent: FC<{}> = () => {
  const gasPrice = useFilecoinSWR({ method: 'getGasPrice' });
  // ..
}
```

## Interacting with a contract

_Note! The words token and contract are used interchangeably._

**Step 1.** Before you are ready to work with your contract, you will need to add its ABI to the `abi` directory and have `typechain` generate the contract factory and infer its types by running,

```bash
yarn typechain
```

If everything goes well, you will see `generated` directory in the root of the project.

**Step 2.** After that, create a getter for your token address based on `config/example.ts`. This is a simple object that is used to dynamically access the address of your contract depending on the network.

**Step 3.** Create the set of hooks using contractHooksFactory from `sdk/factories`.

```ts
// hooks/contracts.ts

// ...
import { contractHooksFactory } from 'sdk/factories';
import { getExampleAddress } from 'config';
import { ExampleAbi__factory } from 'generated';

const example = contractHooksFactory(ExampleAbi__factory, (chainId) =>
  getExampleAddress(chainId),
);
export const useExampleContractRPC = example.useContractRPC;
export const useExampleContractWeb3 = example.useContractWeb3;
// ...
```

The factory creates two hooks that will return the JSON RPC and Web3 contract interfaces which will allow us to use read and write methods respectively.

**Step 4.** Start working with your contract. For read methods, use the `useContractSWR` hook that wraps your rpc interface in `useSwr` for caching and re-validation. Write methods are available directly on the `contractWeb3` property and are automatically typed thanks to generated types.

```ts
import { useContractSWR } from '@lido-sdk/react';

const MyComponent: FC<{}> = () => {
  const contractRPC = useExampleContractRPC();
  const contractWeb3 = useExampleContractWeb3();

  // read call
  const totalSupply = useContractSWR({
    contract: contractRPC,
    method: 'totalSupply',
  });

  const handleSubmit = (to, value) => {
    // write call
    contractWeb3.transfer(to, value);
  };
};
```

## Git commit messages

This repo features a pre-commit hook that lints your commit messages and rejects them if they do not follow the [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) standards specified in [config](/commitlint.config.js). If you are not confident in composing a beautiful commit message on your own, you are free to make use of any Conventional Commit IDE extensions or use the CLI helper already installed in this repo,

```bash
$ git add .
$ yarn commit
```

## Monitoring

Before your application is ready to be deployed within the Lido infrastructure, it should meet certain codebase requirements that will make it more secure, resilient and easier to debug. These are as follows,

- your app must send a [`Content-Security-Policy`](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) header with an appropriate policy to detect and mitigate XSS attacks;
- you app must log essential server-side operations to output in JSON format without revealing any secrets or user addresses;
- any `Content-Security-Policy` violations must be reported to [`api/csp-report`](page/api/csp-report.ts) API route where they will be logged and picked up by our monitoring system;
- your app should export relevant metrics at [`api/metrics`](page/api/metrics.ts) which will give us a better insight into your app's operation and enable us to set up alerts.

### Content-Security-Policy

This template features a boilerplate for configuring `Content-Security-Policy`. If you open up [.env](/.env), you will see three environment variables: `CSP_TRUSTED_HOSTS`, `CSP_REPORT_ONLY`, and `CSP_REPORT_URI`. You will need to fill these out in your `.env.local` file.

- `CSP_TRUSTED_HOSTS` is a comma-separated list of third-party hosts that your application depends on. These can be CDN services, image hosting websites, third-party APIs, etc. You can specify them directly or use a wildcard (which is supported in most modern browsers);
- `CSP_REPORT_ONLY` is a flag that enables/disables report-only mode. In report-only mode, violations are reported but the associated resources/requests are not blocked by the browser. This is useful when you want to test out your `Content-Security-Policy` without the risk of breaking the application for your users. Any other value other than `true` will enable blocking mode;
- `CSP_REPORT_URI` instructs the browser where the violations are ought to be reported to. Because this CSP directive does not support relative paths, the value of this variable depends on your application's environment. For example, if you're running the app locally, this is usually `http://localhost:3000/api/csp-endpoint`.

Below are some example values,

```bash
# allow requests to third-party-api.com and any collectif.finance subdomains
CSP_TRUSTED_HOSTS=third-party-api.com,*.collectif.finance
# blocking mode enabled
CSP_REPORT_ONLY=false
# report CSP violations to https://app.collectif.finance/api/csp-report
CSP_REPORT_URI=https://app.collectif.finance/api/csp-report
```

These variables are passed to `serverRuntimeConfig` in `next.config.js` and then with the help of the [`next-secure-headers`](https://www.npmjs.com/package/next-secure-headers) npm package are transformed into a proper `Content-Security-Header` in [utils/withCSP](/utils//withCsp.ts), which is shipped to the client on each request.

Learn more about `Content-Security-Policy` on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Server-side logger

The template comes with its own custom JSON logger out of the box. Simply import and start logging, e.g.

```typescript
import { serverLogger } from 'utils/serverLogger';

function sendSomeRequest() {
  serverLogger.debug('sending some request');
  try {
    // request logic

    serverLogger.info('some request successful');
  } catch {
    serverLogger.error('some request failed');
  }
}
```

The logger utilizes the [`next-logger`](https://www.npmjs.com/package/next-logger) package which transforms any system output to JSON. As you can see in `package.json` it is only enabled for `start` script meaning it will only work in production mode. In development you will see your usual `console` logs.

Before deploying to production, however, you must make sure that no secrets are exposed in logs. To do this, please specify patterns to mask your secrets in [utils/serverLogger](/utils/serverLogger.ts). There you will find that Infura/Alchemy API keys and user addresses are already masked using the [`@darkobits/mask-string`](https://www.npmjs.com/package/@darkobits/mask-string) module.

### Cache-control

#### API

Use cache control wherever possible. For example - GET requests for statistical data.
For simple setting of cache-control headers, `@lidofinance/next-api-wrappers` are used.
An example can be viewed [here](pages/api/rpc.ts).
API wrappers documentation [here](https://github.com/lidofinance/warehouse/tree/main/packages/next/api-wrapper).

##### Example:

```typescript
import {
  API,
  wrapRequest,
  cacheControl,
  defaultErrorHandler,
} from '@lidofinance/next-api-wrapper';
import { serverLogger } from 'utils/serverLogger';

// Proxy for third-party API.
const someApiRequest: API = async (req, res) => {
  const response = await fetch('api-url');
  const data = await response.json();

  res.json(data);
};

// Example showing how to use API wrappers (error handler and cahce control)
export default wrapRequest([
  cacheControl(),
  defaultErrorHandler({ serverLogger }),
])(someApiRequest);
```
