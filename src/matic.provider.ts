import { Provider } from '@nestjs/common';

import { MaticModuleOptions, MaticModuleAsyncOptions } from './matic.interface';
import { getMaticToken } from './matic.utils';
import { MATIC_MODULE_OPTIONS, MATIC_PROVIDER_NAME } from './matic.constants';
import MaticPlasmaClient, { MaticPOSClient } from '@maticnetwork/maticjs';

export function createMaticPlasmaInstance(
  options: MaticModuleOptions,
): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (): Promise<MaticPlasmaClient> => {
      const maticPlasmaClient = new MaticPlasmaClient(options);
      await maticPlasmaClient.initialize();
      return maticPlasmaClient;
    },
  };
}

export function createMaticPoSInstance(options: MaticModuleOptions): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (): Promise<MaticPOSClient> => {
      return await new MaticPOSClient(options);
    },
  };
}

export function createAsyncMaticPlasmaInstance(): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (
      options: MaticModuleOptions,
    ): Promise<MaticPlasmaClient> => {
      const asyncMaticPlasmaClient = new MaticPlasmaClient(options);
      await asyncMaticPlasmaClient.initialize();
      return asyncMaticPlasmaClient;
    },
    inject: [MATIC_MODULE_OPTIONS],
  };
}

export function createAsyncMaticPoSInstance(): Provider {
  return {
    provide: getMaticToken(),
    useFactory: async (
      options: MaticModuleOptions,
    ): Promise<MaticPOSClient> => {
      return await new MaticPOSClient(options);
    },
    inject: [MATIC_MODULE_OPTIONS],
  };
}

/* I created this and createProviderName without havng any idea about its use, but 
  I assumed that it's important because ethers uses it. Please let me know if those methods
  are needed.
*/
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
