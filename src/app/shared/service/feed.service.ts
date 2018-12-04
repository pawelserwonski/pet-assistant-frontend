import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../model/feed.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const feedControlerUrl = environment.apiEndpoint + '/feed';

@Injectable()
export class FeedService {
  constructor(private httpClient: HttpClient) {
  }

  public createFeed(feed: Feed): Observable<Feed> {
    return this.httpClient.post<Feed>(feedControlerUrl, feed);
  }
}
