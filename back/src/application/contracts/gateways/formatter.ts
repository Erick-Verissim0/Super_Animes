import { InvalidParameterError } from '@/application/errors';
import { DecimalType, NumberType } from '@/domain/contracts/gateways';

export const setupNumberType: NumberType = (input) => {
  if (input === undefined || input === null || !input) return undefined;
  if (typeof input === 'string') {
    if (Number.isNaN(Number(input))) {
      throw new InvalidParameterError(`${input} is not a number`);
    }
    return Number(input);
  }
  return input;
};

export const setupDecimalType: DecimalType = (input, decimanl = 2) => {
  if (input === undefined || input === null || !input) return undefined;
  if (typeof input === 'string') {
    if (Number.isNaN(Number(input))) {
      throw new InvalidParameterError(`${input} is not a number`);
    }
    return Number(input).toFixed(decimanl);
  }
  return input.toFixed(decimanl);
};
