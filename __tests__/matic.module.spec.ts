import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';
import { MaticModule, InjectMaticProvider } from '../src';
import { platforms } from './utils/platforms';
import { extraWait } from './utils/extraWait';
// import {
//   MaticClients,
//   MaticNetworks,
//   MaticVersions,
// } from '../src/matic.interface';
import {
  TEST_ADDRESS,
  TEST_TOKEN,
  // TEST_BALANCE,
  OPTIONS_PLASMA,
  // OPTIONS_POS,
  // INFURA_BODY,
  // INFURA_RESPONSE,
  // INFURA_MUMBAI_RPC,
  // parentProvider,
  // childProvider,
  // defaultOptions,
} from './utils/constants';
// import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';
import MaticPlasmaClient from '@maticnetwork/maticjs';

describe('Matic Module Initialization', () => {
  beforeEach(() => nock.cleanAll());

  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate();
    }

    // nock.recorder.rec();
    nock.disableNetConnect();
    nock.enableNetConnect(
      (host) =>
        host.includes('127.0.0.1') ||
        host.includes('rpc.goerli.mudit.blog') ||
        host.includes('rpc-mumbai.matic.today'),
    );
  });

  afterAll(() => {
    nock.restore();
  });

  for (const PlatformAdapter of platforms) {
    describe(PlatformAdapter.name, () => {
      describe.only('forRoot', () => {
        it('should work with Plasma provider', async () => {
          @Controller('/')
          class TestController {
            constructor(
              @InjectMaticProvider()
              private readonly maticProvider: MaticPlasmaClient,
            ) {}
            @Get()
            async get() {
              const balance: number = await this.maticProvider.balanceOfERC20(
                TEST_ADDRESS,
                TEST_TOKEN,
                {},
              );

              return { balance };
            }
          }
          @Module({
            imports: [MaticModule.forRoot(OPTIONS_PLASMA)],
            controllers: [TestController],
          })
          class TestModule {}

          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
          );
          const server = app.getHttpServer();

          await app.init();
          await extraWait(PlatformAdapter, app);

          await request(server)
            .get('/')
            .expect(200)
            .expect((res) => {
              expect(res.body).toBeDefined();
              expect(res.body.balance).not.toBeNull();
            });

          await app.close();
        });

        // it('should work with PoS provider', async () => {
        //   nock(INFURA_MUMBAI_RPC)
        //     .post('/', INFURA_BODY)
        //     .reply(200, TEST_BALANCE);

        //   @Controller('/')
        //   class TestController {
        //     constructor(
        //       @InjectMaticProvider()
        //       private readonly maticProvider: MaticPOSClient,
        //     ) {}
        //     @Get()
        //     async get() {
        //       const balance: number = await this.maticProvider.balanceOfERC20(
        //         TEST_ADDRESS,
        //         TEST_TOKEN,
        //       );

        //       return { accountBalance: balance.toString() };
        //     }
        //   }
        //   @Module({
        //     imports: [MaticModule.forRoot(OPTIONS_POS)],
        //     controllers: [TestController],
        //   })
        //   class TestModule {}

        //   const app = await NestFactory.create(
        //     TestModule,
        //     new PlatformAdapter(),
        //   );
        //   const server = app.getHttpServer();

        //   await app.init();
        //   await extraWait(PlatformAdapter, app);

        //   await request(server)
        //     .get('/')
        //     .expect(200)
        //     .expect((res) => {
        //       expect(res.body).toBeDefined();
        //       expect(res.body).toHaveProperty(
        //         'accountBalance',
        //         '1000000000000000000',
        //       );
        //     });

        //   await app.close();
        // });
      });

      // describe('forRootAsync', () => {
      //   it('should compile properly with useFactory using Plasma Provider', async () => {
      //     @Controller('/')
      //     class TestController {
      //       constructor(
      //         @InjectMaticProvider()
      //         private readonly maticProvider: MaticPlasmaClient,
      //       ) {}
      //       @Get()
      //       async get() {
      //         const balance: number = await this.maticProvider.balanceOfERC20(
      //           TEST_ADDRESS,
      //           TEST_TOKEN,
      //           {},
      //         );

      //         return { accountBalance: balance.toString() };
      //       }
      //     }

      //     @Injectable()
      //     class ConfigService {
      //       public readonly network = MaticNetworks.Testnet;
      //       public readonly version = MaticVersions.Mumbai;
      //       public readonly maticProvider = childProvider;
      //       public readonly parentProvider = parentProvider;
      //       public readonly maticDefaultOptions = defaultOptions;
      //     }

      //     @Module({
      //       imports: [
      //         MaticModule.forRootAsync({
      //           providers: [ConfigService],
      //           inject: [ConfigService],
      //           useFactory: (config: ConfigService) => {
      //             return {
      //               network: config.network,
      //               version: config.version,
      //               maticProvider: config.maticProvider,
      //               parentProvider: config.parentProvider,
      //               maticDefaultOptions: config.maticDefaultOptions,
      //               parentDefaultOptions: config.maticDefaultOptions,
      //               maticClient: MaticClients.Plasma,
      //             };
      //           },
      //         }),
      //       ],
      //       controllers: [TestController],
      //     })
      //     class TestModule {}

      //     const app = await NestFactory.create(
      //       TestModule,
      //       new PlatformAdapter(),
      //     );
      //     const server = app.getHttpServer();

      //     await app.init();
      //     await extraWait(PlatformAdapter, app);

      //     await request(server)
      //       .get('/')
      //       .expect(200)
      //       .expect((res) => {
      //         console.log(res);
      //         expect(res.body).toBeDefined();
      //         expect(res.body).toHaveProperty(
      //           'accountBalance',
      //           '1000000000000000000',
      //         );
      //       });

      //     await app.close();
      //   });

      //   it('should compile properly with useFactory using PoS Provider', async () => {
      //     @Controller('/')
      //     class TestController {
      //       constructor(
      //         @InjectMaticProvider()
      //         private readonly maticProvider: MaticPOSClient,
      //       ) {}
      //       @Get()
      //       async get() {
      //         const balance: number = await this.maticProvider.balanceOfERC20(
      //           TEST_ADDRESS,
      //           TEST_TOKEN,
      //           {},
      //         );

      //         return { accountBalance: balance.toString() };
      //       }
      //     }

      //     @Injectable()
      //     class ConfigService {
      //       public readonly network = MaticNetworks.Testnet;
      //       public readonly version = MaticVersions.Mumbai;
      //       public readonly maticProvider = childProvider;
      //       public readonly parentProvider = parentProvider;
      //       public readonly maticDefaultOptions = defaultOptions;
      //     }

      //     @Module({
      //       imports: [
      //         MaticModule.forRootAsync({
      //           providers: [ConfigService],
      //           inject: [ConfigService],
      //           useFactory: (config: ConfigService) => {
      //             return {
      //               network: config.network,
      //               version: config.version,
      //               maticProvider: config.maticProvider,
      //               parentProvider: config.parentProvider,
      //               maticDefaultOptions: config.maticDefaultOptions,
      //               parentDefaultOptions: config.maticDefaultOptions,
      //               maticClient: MaticClients.PoS,
      //             };
      //           },
      //         }),
      //       ],
      //       controllers: [TestController],
      //     })
      //     class TestModule {}
      //     const app = await NestFactory.create(
      //       TestModule,
      //       new PlatformAdapter(),
      //     );
      //     const server = app.getHttpServer();

      //     await app.init();
      //     await extraWait(PlatformAdapter, app);

      //     await request(server)
      //       .get('/')
      //       .expect(200)
      //       .expect((res) => {
      //         console.log(res);
      //         expect(res.body).toBeDefined();
      //         expect(res.body).toHaveProperty(
      //           'accountBalance',
      //           '1000000000000000000',
      //         );
      //       });
      //     await app.close();
      //   });
      // });
    });
  }
});
