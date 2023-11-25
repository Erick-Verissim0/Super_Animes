export type NumberType = (input: NumberType.Input) => NumberType.Output;
export namespace NumberType {
  export type Input = string | number;
  export type Output = number;
}

export type DecimalType = (input: DecimalType.Input, decimal?: number) => DecimalType.Output;
export namespace DecimalType {
  export type Input = string | number;
  export type Output = string;
}
