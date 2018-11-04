import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Auth} from './auth.service';
import {Observable} from 'rxjs/Observable';
import {Credentials} from '../model/credentials.model';
import {ApiEndpoints} from './api.endpoints';

@Injectable()
export class NotificationService {

  constructor(private http: Http, private auth: Auth) {
  }


  postNotification(userId: number, notification: any): Observable<Credentials> {
    let url: string = this.postNotificationUrl(userId, notification);
    return this.http.post(url, null)
      .map((res: Response) => console.log(res.json()))
      .catch(this.handleError);
  }

  postNotificationUrl(userId: number, notification: any): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/firebase/notify/' + userId + '?access_token=' + this.auth.getAccessToken() + '&title=' + notification.title + '&message=' + notification.message + '&type=' + notification.notificationType + '&code=' + notification.code;
  }

  postNotificationToTopicUrl(notification: any): string {
    return ApiEndpoints.BASE_URL + ApiEndpoints.API_VERSION + '/firebase/notify/topic/' + notification.topic + '?access_token=' + this.auth.getAccessToken() + '&title=' + notification.title + '&message=' + notification.message + '&type=' + notification.notificationType + '&code=' + notification.code;
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  postNotificationToTopic(notification: any) {
    let url: string = this.postNotificationToTopicUrl(notification);
    return this.http.post(url, null)
      .map((res: Response) => console.log(res.json()))
      .catch(this.handleError);
  }
}
