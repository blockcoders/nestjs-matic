import { Provider } from '@nestjs/common';
import { defer, lastValueFrom } from 'rxjs';
import {
  MaticModuleOptions,
  MaticModuleAsyncOptions,
  MaticNetworks,
  MaticClients,
  MaticVersions,
} from './matic.interface';
import { getMaticToken } from './matic.utils';
import { MATIC_MODULE_OPTIONS, MATIC_PROVIDER_NAME } from './matic.constants';
import SDKClient from '@maticnetwork/maticjs/dist/ts/common/SDKClient';
import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';

async function createMaticClient(
  options: MaticModuleOptions,
): Promise<SDKClient> {
  const {
    network = MaticNetworks.Mainnet,
    version = MaticVersions.V1,
    maticProvider,
    parentProvider,
    parentDefaultOptions = {},
    maticDefaultOptions = {},
    maticClient = MaticClients.Plasma,
  } = options;
  const clientOptions = {
    network,
    version,
    maticProvider,
    parentProvider,
    parentDefaultOptions,
    maticDefaultOptions,
  };

  if (maticClient === MaticClients.Plasma) {
    const maticPlasmaClient = new MaticPlasmaClient(clientOptions);
    await maticPlasmaClient.initialize();

    return maticPlasmaClient;
  }

  return new MaticPOSClient(clientOptions);
}

export function createMaticProvider(options: MaticModuleOptions): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (): Promise<SDKClient> => {
      return await lastValueFrom(defer(() => createMaticClient(options)));
    },
  };
}

export function createMaticAsyncProvider(): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (options: MaticModuleOptions): Promise<SDKClient> => {
      return lastValueFrom(defer(() => createMaticClient(options)));
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
