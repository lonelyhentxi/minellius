import { isNil } from 'lodash';

type PipeBuilderInterface = <T extends {}, V>(field: string, value: V | undefined, operator) => (T) => T;
type OptionPipeInterface = <T extends {}>(T) => T;

export function pipeBuild<T extends {}>(target: T, ...pipes: OptionPipeInterface[]) {
  let currentRes = target;
  for (const pipe of pipes) {
    currentRes = pipe(currentRes);
  }
  return currentRes;
}

export function equalPipe<T extends {}, V>(field: string, value: V | undefined, operator?)
  : (T) => T {
  if (isNil(value)) {
    return (target: T) => target;
  } else {
    return (option: T) => {
      if(isNil(operator)) {
        option[field] = value;
      } else {
        option[field] = operator(value);
      }
      return option;
    };
  }
}
