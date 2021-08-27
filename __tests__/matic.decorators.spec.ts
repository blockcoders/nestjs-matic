import { NestFactory } from '@nestjs/core';
import { Injectable, Module, Controller, Get } from '@nestjs/common';
import * as request from 'supertest';
import * as nock from 'nock';
import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';
import { platforms } from './utils/platforms';
import { extraWait } from './utils/extraWait';
import { OPTIONS_PLASMA, OPTIONS_POS } from './utils/constants';
import { InjectMaticProvider } from '../src/matic.decorator';
import { MaticModule } from '../src/matic.module';
// import { writeFile } from 'fs';

describe('InjectMaticProvider', () => {
  beforeAll(() => {
    if (!nock.isActive()) {
      nock.activate();
    }

    // Load nock definitions
    nock.load('./__tests__/matic.decorators.mock.json');

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
    //   './__tests__/matic.decorators.mock.json',
    //   JSON.stringify(result, null, 2),
    //   () => ({}),
    // );

    nock.cleanAll();
    nock.restore();
  });

  for (const PlatformAdapter of platforms) {
    describe(PlatformAdapter.name, () => {
      it('should inject matic Plasma client in a service successfully', async () => {
        @Injectable()
        class TestService {
          constructor(
            @InjectMaticProvider()
            private readonly maticProvider: MaticPlasmaClient,
          ) {}
          async someMethod(): Promise<MaticPlasmaClient> {
            return this.maticProvider.network;
          }
        }

        @Controller('/')
        class TestController {
          constructor(private readonly service: TestService) {}
          @Get()
          async get() {
            const network = await this.service.someMethod();

            return { network };
          }
        }

        @Module({
          imports: [MaticModule.forRoot(OPTIONS_PLASMA)],
          controllers: [TestController],
          providers: [TestService],
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
            expect(res.body.network).toBeDefined();
            expect(res.body.balance).not.toBeNull();
          });

        await app.close();
      });

      it('should inject matic Plasma client in a controller successfully', async () => {
        @Controller('/')
        class TestController {
          constructor(
            @InjectMaticProvider()
            private readonly maticProvider: MaticPlasmaClient,
          ) {}
          @Get()
          async get() {
            const network = await this.maticProvider.network;

            return { network };
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
            expect(res.body.network).toBeDefined();
            expect(res.body.balance).not.toBeNull();
          });

        await app.close();
      });

      it('should inject matic PoS client in a service successfully', async () => {
        @Injectable()
        class TestService {
          constructor(
            @InjectMaticProvider()
            private readonly maticProvider: MaticPOSClient,
          ) {}
          async someMethod(): Promise<MaticPOSClient> {
            return this.maticProvider.network;
          }
        }

        @Controller('/')
        class TestController {
          constructor(private readonly service: TestService) {}
          @Get()
          async get() {
            const network = await this.service.someMethod();

            return { network };
          }
        }

        @Module({
          imports: [MaticModule.forRoot(OPTIONS_POS)],
          controllers: [TestController],
          providers: [TestService],
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
            expect(res.body.network).toBeDefined();
            expect(res.body.balance).not.toBeNull();
          });

        await app.close();
      });

      it('should inject matic PoS client in a controller successfully', async () => {
        @Controller('/')
        class TestController {
          constructor(
            @InjectMaticProvider()
            private readonly maticProvider: MaticPOSClient,
          ) {}
          @Get()
          async get() {
            const network = await this.maticProvider.network;

            return { network };
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
            expect(res.body.network).toBeDefined();
            expect(res.body.balance).not.toBeNull();
          });

        await app.close();
      });
    });
  }
});
