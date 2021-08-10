export interface InfuraProviderOptions {
  projectId?: string;
  projectSecret?: string;
}

export interface AlchemyProviderOptions {
  apiKey?: string; // Or apiUrl
}

export interface AnkrProviderOptions {
  projectUsername?: string;
  projectPassword?: string;
}

export interface Network {
  network: string;
  version: string;
  maticProvider: string;
  parentProvider: string;
  parentDefaultOptions: {
    from: Record<string, any>;
  };
  maticDefaultOptions: {
    from: Record<string, any>;
  };
}

export interface MaticModuleOptions extends Record<string, any> {
  network?: Network | string;
  alchemy?: AlchemyProviderOptions | string;
  chainstack?: string;
  maticVigil?: string;
  quickNode?: string;
  infura?: InfuraProviderOptions | string;
  ankr?: AnkrProviderOptions | string;
  useDefaultProvider?: boolean;
}
