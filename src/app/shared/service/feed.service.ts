import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../model/feed.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

const feedControllerUrl = environment.apiEndpoint + '/feed';

@Injectable()
export class FeedService {
  constructor(private httpClient: HttpClient) {
  }

  public createFeed(feed: Feed): Observable<Feed> {
    return this.httpClient.post<Feed>(feedControllerUrl, feed);
  }

  public deleteFeed(id: number) {
    return this.httpClient.delete(feedControllerUrl + `/${id}`);
  }

  public getFeed(id: number): Observable<Feed> {
    return this.httpClient.get<Feed>(feedControllerUrl + `/${id}`);
  }

  public updateFeed(feed: Feed, id: number) {
    return this.httpClient.put(feedControllerUrl + `/${id}`, feed);
  }
}
