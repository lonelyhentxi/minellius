import {HttpErrorResponse} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';

export function errorPrompt(translator: TranslateService,error: HttpErrorResponse) {
  let message;
  if (error.error instanceof ErrorEvent) {
    message = `${translator.instant('ERROR.CLIENT_OR_NETWORK')}${translator.instant('ERROR.'+error.error.message)}`;
  } else {
    message = `${translator.instant('ERROR.BACKEND')}${translator.instant('ERROR.STATUSTEXT.'+error.statusText)}`;
  }
  return message;
}
