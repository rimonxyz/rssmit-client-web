import {Injectable} from '@angular/core';

declare let toastr: any;

@Injectable()
export class ToastrService{

    success(title: string, message: string){
        toastr.success(message,title);
    }

    info(title: string, message: string){
        toastr.info(message,title);
    }

    warning(title: string, message: string){
        toastr.warning(message,title);
    }

    error(title: string, message: string){
        toastr.error(message,title);
    }

}