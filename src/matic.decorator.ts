import { Inject } from '@nestjs/common';
import { getMaticToken } from './matic.utils';

export const InjectMaticProvider = () => Inject(getMaticToken());
