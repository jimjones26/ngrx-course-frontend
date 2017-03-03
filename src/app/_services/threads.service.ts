import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AllUserData } from '../../../_shared/transfer-objects/all-user-data';

@Injectable()
export class ThreadsService {

  constructor(private http: Http) { }

  loadUserThreads(): Observable<AllUserData> {
    return this.http.get('/api/threads')
      .map(res => res.json());
  }

}
