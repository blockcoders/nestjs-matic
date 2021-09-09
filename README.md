# NestJS-Matic

[![npm](https://img.shields.io/npm/v/nestjs-matic)](https://www.npmjs.com/package/nestjs-matic)
[![CircleCI](https://circleci.com/gh/blockcoders/nestjs-matic/tree/main.svg?style=svg)](https://circleci.com/gh/blockcoders/nestjs-matic/tree/main)
[![Coverage Status](https://coveralls.io/repos/github/blockcoders/nestjs-matic/badge.svg?branch=main)](https://coveralls.io/github/blockcoders/nestjs-matic?branch=main)
[![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/nestjs-matic)](https://snyk.io/test/github/blockcoders/nestjs-matic)
[![supported platforms](https://img.shields.io/badge/platforms-Express%20%26%20Fastify-green)](https://img.shields.io/badge/platforms-Express%20%26%20Fastify-green)

Matic PoS and Plasma utilities for NestJS based on [matic.js](https://github.com/maticnetwork/matic.js/)

## Install

```sh
npm i nestjs-matic
```

## Register module

### Configuration params

`nestjs-matic` can be configured with this options:

```ts
interface MaticModuleOptions {
  /**
   * Optional parameter for connection, must be a MaticNetworks enum.
   * Take 'mainnet' or 'testnet' as possible values.
   * If no network is provided, mainnnet is used.
   * @see {@link https://maticnetwork.github.io/matic.js/docs/plasma/initialize#options}
   */
  network?: MaticNetworks;

  /**
   * Optional parameter for version, must be a MaticVersions enum.
   * Take 'v1' or 'mumbai' as possible values.
   * If no version is provided, v1 is used.
   * @see {@link https://maticnetwork.github.io/matic.js/docs/plasma/initialize#options}
   */
  version?: MaticVersions;

  /**
   * Optional parameter for maticProvider, can be a web3-core provider.
   * If no maticProvider is provided, empty object is used
   * The maticProvider may also be a URL to connect to,
   * such as https://rpc-mumbai.matic.today
   * @see {@link https://github.com/ChainSafe/web3.js/blob/1.x/packages/web3-core/types/index.d.ts#L436}
   */
  maticProvider?: web3-core.provider;

  /**
   * Required parameter for parentProvider, can be a web3-core provider.
   * @see {@link https://github.com/ChainSafe/web3.js/blob/1.x/packages/web3-core/types/index.d.ts#L436}
   */
  parentProvider: web3-core.provider;

  /**
   * Optional parameter for parentDefaultOptions, must be a Matic
   * SendOptions type.
   * If no parentDefaultOptions is provided, empty object is used.
   * @see {@link https://github.com/maticnetwork/matic.js/blob/master/src/types/Common.ts#L3}
   */
  parentDefaultOptions?: SendOptions;

  /**
   * Optional parameter for maticDefaultOptions, must be a Matic
   * SendOptions type.
   * If no parentDefaultOptions is provided, empty object is used.
   * @see {@link https://github.com/maticnetwork/matic.js/blob/master/src/types/Common.ts#L3}
   */
  maticDefaultOptions?: SendOptions;

  /**
   * Optional parameter for maticClient, must be a string.
   * Take 'Plasma' or 'PoS' as possible values.
   * If no maticClient is provided, 'PoS" is used.
   */
  maticClient?: MaticClients;
}
```

### Synchronous configuration

Use `MaticModule.forRoot` method with [Options interface](#configuration-params):

```ts
import { MaticModule } from 'nestjs-matic';
import { MaticClients, MaticNetworks, MaticVersions } from 'nestjs-matic/dist/matic.interface';

@Module({
  imports: [
    MaticModule.forRoot({
      network: MaticNetworks.Testnet,
      version: MaticVersions.Mumbai
      maticProvider: 'https://rpc-mumbai.matic.today',
      parentProvider: 'https://rpc.goerli.mudit.blog',
      parentDefaultOptions: {
        from: '0x9aCd457193F4788Ef7989c88dA89DF7b2754670c',
      },
      maticDefaultOptions: {
        from: '0x54aff400858Dcac39797a81894D9920f16972D1D',
      },
      maticClient: MaticClients.PoS
    })
  ],
  ...
})
class MyModule {}
```

### Asynchronous configuration

With `MaticModule.forRootAsync` allows you, for example, inject `ConfigService` to use it in Nest `useFactory` method.

`useFactory` should return object with [Options interface](#configuration-params).

```ts
import { MaticModule } from 'nestjs-matic';
import { MaticClients, MaticNetworks, MaticVersions } from 'nestjs-matic/dist/matic.interface';

@Injectable()
class ConfigService {
  public readonly network = MaticNetworks.Testnet;
  public readonly version = MaticVersions.Mumbai;
  public readonly maticProvider = 'https://rpc-mumbai.matic.today';
  public readonly parentProvider = 'https://rpc.goerli.mudit.blog';
  public readonly maticDefaultOptions = { from '0x....' };;
}

@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
class ConfigModule {}

@Module({
  imports: [
    MaticModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        await somePromise();

        return {
          network: config.network,
          version: config.version,
          maticProvider: config.maticProvider,
          parentProvider: config.parentProvider,
          maticDefaultOptions: config.maticDefaultOptions,
          parentDefaultOptions: config.maticDefaultOptions,
          maticClient: MaticClients.PoS,
        };
      },
    }),
  ],
  ...
})
class TestModule {}
```

Or you can just pass `ConfigService` to `providers`, if you don't have any `ConfigModule`:

```ts
import {
  MaticModule,
  MaticNetworks,
  MaticVersions,
} from 'nestjs-matic';

@Injectable()
class ConfigService {
  public readonly network = MaticNetworks.Testnet;
  public readonly version = MaticVersions.Mumbai;
  public readonly maticProvider = 'https://rpc-mumbai.matic.today';
  public readonly parentProvider = 'https://rpc.goerli.mudit.blog';
  public readonly maticDefaultOptions = { from '0x....' };
}

@Module({
  imports: [
    MaticModule.forRootAsync({
      providers: [ConfigService],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          network: config.network,
          version: config.version,
          maticProvider: config.maticProvider,
          parentProvider: config.parentProvider,
          maticDefaultOptions: config.maticDefaultOptions,
          parentDefaultOptions: config.maticDefaultOptions,
          maticClient: MaticClients.PoS,
        };
      }
    })
  ],
  controllers: [TestController]
})
class MyModule {}
```

## MaticClients

-  `MaticPlasmaClient` implements standard [PlasmaClient](https://maticnetwork.github.io/matic.js/docs/plasma/initialize).
-  `MaticPOSClient` implements standard [POSClient](https://maticnetwork.github.io/matic.js/docs/pos/initialize).

If you are familiar with it, you are ready to go.

```ts
import { InjectMaticProvider, MaticPOSClient } from 'nestjs-matic';

@Injectable()
export class TestService {
  constructor(
    @InjectMaticProvider()
    private readonly maticClient: MaticPOSClient,
  ) {}
  async someMethod(): Promise<{ nftBalance: string }> {
    const nftBalance: number = await this.maticClient.balanceOfERC721('0x....', '0x....')

    return { nftBalance: nftBalance.toString() };
  }
}
```

## Testing a class that uses @InjectMaticProvider

This package exposes a `getMaticToken()` function that returns a prepared injection token based on the provided context.
Using this token, you can easily provide a mock implementation of the [SDKClient](https://github.com/maticnetwork/matic.js/blob/master/src/common/SDKClient.ts) using any of the standard custom provider techniques, including useClass, useValue, and useFactory.

```ts
const module: TestingModule = await Test.createTestingModule({
  providers: [
    MyService,
    {
      provide: getMaticToken(),
      useValue: mockProvider,
    },
  ],
}).compile();
```

## Change Log

See [Changelog](CHANGELOG.md) for more information.

## Contributing

Contributions welcome! See [Contributing](CONTRIBUTING.md).

## Collaborators

* [__Jose Ramirez__](https://github.com/jarcodallo), [Twitter](https://twitter.com/jarcodallo), [NPM](https://www.npmjs.com/~jarcodallo)
* [__Ana Riera__](https://github.com/AnnRiera)

## License

Licensed under the Apache 2.0 - see the [LICENSE](LICENSE) file for details.
