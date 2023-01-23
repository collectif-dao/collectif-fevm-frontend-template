# CollectifDAO Frontend Template

[CollectifDAO](https://collectif.finance/) Frontend Template is a project template for developing Filecoin dapp frontend on Filecoin and connect it to FEVM smart contracts. It includes Next.js, SWR, ethers, CollectifDAO UI components and styled-components. This template aims to help developers quickly get started on their dapp with minimal setup.

The template is based on [Lido Frontend template](https://github.com/lidofinance/lido-frontend-template) and has been adapted for Filecoin FEVM, supports both Wallaby and Hyperspace testnets

### Pre-requisites

- Node.js v12+
- Yarn package manager

## Development

Step 0. Read `DOCS.md` in the root of the project

Step 1. Copy the contents of `.env` to `.env.local`

```bash
cp .env .env.local
```

Step 2. Fill out the `.env.local`.

Step 3. Install dependencies

```bash
yarn install
```

Step 4. Start the development server

```bash
yarn dev
```

Step 5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Add your contract

Step 1. Add your contract ABI to `abi` dir
Step 2. Run `yarn typechain` to generate typings for your contract
Step 3. Create a getter for your token address based on `config/example.ts`
Step 4. Create the set of hooks in `hooks/contracts.ts` using contractHooksFactory from `sdk/factories`.

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

The factory creates two hooks that will return the JSON RPC and Web3 contract interfaces which will allow us to use read and write methods respectively.

```
Step 5. Start working with your contract. For read methods, use the `useContractSWR` hook that wraps your rpc interface in `useSwr` for caching and re-validation. Write methods are available directly on the `contractWeb3` property and are automatically typed thanks to generated types.

```ts
import { useContractSWR } from 'sdk/hooks/useContractSWR';

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

### Environment variables

This project uses publicRuntimeConfig in the [next.config.js](./next.config.js) and getServerSideProps on the pages (function may be empty, but it forces Next.js to switch to Server-Side Rendering mode). This is necessary to quickly start the docker container without rebuilding the application. More on that in `DOCS.md`.

Read more about [runtime configuration](https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration) and [automatic static optimization](https://nextjs.org/docs/advanced-features/automatic-static-optimization)

### Content-Security-Policy

In order to improve security, this template includes a Content-Security-Policy boilerplate. Please make sure to customize the policies in [utils/withCsp.ts](utils/withCsp.ts) before shipping the application to production. Learn more about it in [DOCS](/DOCS.md#monitoring).

## Production

```bash
yarn build && yarn start
```