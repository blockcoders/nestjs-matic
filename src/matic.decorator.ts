import { Inject } from '@nestjs/common';
import { getMaticToken } from './matic.utils';

export const IntectTokenProvider = () => Inject(getMaticToken());