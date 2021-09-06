import { NestFactory } from '@nestjs/core';
import { Module, Controller, Get, Injectable } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';
import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';
import { platforms } from './utils/platforms';
import { extraWait } from './utils/extraWait';
import {
  MaticClients,
  MaticNetworks,
  MaticVersions,
} from '../src/matic.interface';
import {
  TEST_ADDRESS,
  TEST_TOKEN,
  OPTIONS_PLASMA,
  OPTIONS_POS,
  parentProvider,
  maticProvider,
  defaultOptions,
} from './utils/constants';
import { InjectMaticProvider } from '../src/matic.decorator';
import { MaticModule } from '../src/matic.module';
// import { writeFile } from 'fs';

describe('Matic Module Initialization', () => {
  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate();
    }

    // Load nock definitions
    nock.load('./__tests__/matic.module.mock.json');

    // Recording nock definitions
    // nock.recorder.rec({
    //   dont_print: true,
    //   enable_reqheaders_recording: true,
    //   output_objects: true,
    // });
    nock.disableNetConnect();
    nock.enableNetConnect('127.0.0.1');
  });

  afterAll(() => {
    // Generate nock definitions file
    // const nockCallObjects = nock.recorder.play() as nock.Definition[];
    // const result = nockCallObjects.filter((item) => {
    //   return !item.scope.includes('127.0.0.1');
    // });

    // writeFile(
    //   './__tests__/matic.module.mock.json',
    //   JSON.stringify(result, null, 2),
    //   () => ({}),
    // );

    nock.cleanAll();
    nock.restore();
  });

  for (const PlatformAdapter of platforms) {
    describe(PlatformAdapter.name, () => {
      describe('forRoot', () => {
        it('should compile with parentProvider option', async () => {
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
            imports: [
              MaticModule.forRoot({
                network: MaticNetworks.Testnet,
                version: MaticVersions.Mumbai,
                parentProvider,
              }),
            ],
            controllers: [TestController],
          })
          class TestModule {}

          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
            { logger: false },
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
            { logger: false },
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

        it('should work with PoS provider', async () => {
          @Controller('/')
          class TestController {
            constructor(
              @InjectMaticProvider()
              private readonly maticProvider: MaticPOSClient,
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
            imports: [MaticModule.forRoot(OPTIONS_POS)],
            controllers: [TestController],
          })
          class TestModule {}

          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
            { logger: false },
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
      });

      describe('forRootAsync', () => {
        it('should compile properly with useFactory using Plasma Provider', async () => {
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

          @Injectable()
          class ConfigService {
            public readonly network = MaticNetworks.Testnet;
            public readonly version = MaticVersions.Mumbai;
            public readonly maticProvider = maticProvider;
            public readonly parentProvider = parentProvider;
            public readonly maticDefaultOptions = defaultOptions;
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
                    maticClient: MaticClients.Plasma,
                  };
                },
              }),
            ],
            controllers: [TestController],
          })
          class TestModule {}

          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
            { logger: false },
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

        it('should compile properly with useFactory using PoS Provider', async () => {
          @Controller('/')
          class TestController {
            constructor(
              @InjectMaticProvider()
              private readonly maticProvider: MaticPOSClient,
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

          @Injectable()
          class ConfigService {
            public readonly network = MaticNetworks.Testnet;
            public readonly version = MaticVersions.Mumbai;
            public readonly maticProvider = maticProvider;
            public readonly parentProvider = parentProvider;
            public readonly maticDefaultOptions = defaultOptions;
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
                },
              }),
            ],
            controllers: [TestController],
          })
          class TestModule {}
          const app = await NestFactory.create(
            TestModule,
            new PlatformAdapter(),
            { logger: false },
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
      });
    });
  }
});
