import { isNil } from 'lodash';

export function orderParse(orderValue:boolean|undefined|null,isAsc:boolean) {
  if(isNil(orderValue)) {
    return undefined;
  } else if (isAsc) {
    return orderValue===true?'ASC':'DESC';
  } else {
    return orderValue===false?'ASC':'DESC';
  }
}