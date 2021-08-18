import { Provider } from '@nestjs/common';

import { MaticModuleOptions, MaticModuleAsyncOptions } from './matic.interface';
import { getMaticToken } from './matic.utils';
import { MATIC_MODULE_OPTIONS, MATIC_PROVIDER_NAME } from './matic.constants';
import SDKClient from '@maticnetwork/maticjs/dist/ts/common/SDKClient';
import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';
import { MaticClients } from './matic.interface';

async function createBaseProvider(
  options: MaticModuleOptions,
): Promise<SDKClient> {
  const { maticClient } = options;
  if (maticClient === MaticClients.PoS) {
    return await new MaticPOSClient(options);
  }

  const maticPlasmaClient = new MaticPlasmaClient(options);
  await maticPlasmaClient.initialize();
  return maticPlasmaClient;
}

export function createMaticProvider(options: MaticModuleOptions): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (): Promise<SDKClient> => {
      return await createBaseProvider(options);
    },
  };
}

export function createMaticAsyncProvider(): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (options: MaticModuleOptions): Promise<SDKClient> => {
      return createBaseProvider(options);
    },
    inject: [MATIC_MODULE_OPTIONS],
  };
}

export function createAsyncOptionsProvider(
  options: MaticModuleAsyncOptions,
): Provider {
  return {
    provide: MATIC_MODULE_OPTIONS,
    useFactory: options.useFactory,
    inject: options.inject || [],
  };
}

export function createProviderName(): Provider {
  return {
    provide: MATIC_PROVIDER_NAME,
    useValue: getMaticToken(),
  };
}
