import {Injectable} from '@angular/core';

declare let swal: any;

@Injectable()
export class AlertService {

  showAlert(title: String, message: String): void {
    swal({
      title: title,
      text: message
    });
  }

}
