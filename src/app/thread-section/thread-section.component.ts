import { Component, OnInit } from '@angular/core';
import { ThreadsService } from '../_services/threads.service';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../_store/application-state';
import { LoadUserThreadsAction } from '../_store/actions';
import { Observable } from 'rxjs/Rx';
import { Thread } from '../../../_shared/model/thread';
import { ThreadSummaryVM } from './thread-summarry.vm';
import { mapStateToUserName } from './mapStateToUserName';
import { mapStateToUnreadMessagesCounter } from './mapStateToUnreadMessagesCounter';
import * as _ from 'lodash';

@Component({
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {

  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(private threadService: ThreadsService, private store: Store<ApplicationState>) {

    this.userName$ = store
      .skip(1)
      .map(mapStateToUserName);

    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapStateToUnreadMessagesCounter);

    this.threadSummaries$ = store.select(state => {
      const threads = _.values<Thread>(state.storeData.threads);
      return threads.map(thread => {

        const names = _.keys(thread.participants).map(participantId => state.storeData.participants[participantId].name);
        const lastMessageId = _.last(thread.messageIds),
              lastMessage = state.storeData.messages[lastMessageId];

        return {
          id: thread.id,
          participantNames: _.join(names, ','),
          // lastMessageText: lastMessage.text,
          // timestamp: lastMessage.timestamp
        };
      });
    });
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(
      allUserData => this.store.dispatch(
        new LoadUserThreadsAction(allUserData)
      )
      );
  }

}
