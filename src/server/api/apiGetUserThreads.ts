import { Application, Request, Response } from 'express';
import { findDbThreadsPerUser } from '../persistence/findDbThreadsPerUser';
import { dbMessages, dbParticipants } from '../db-data';
import * as _ from 'lodash';
import { Message } from '../../../_shared/model/message';
import { AllUserData } from '../../../_shared/transfer-objects/all-user-data';

// gets all threads for a specific user
// gets all messages for each thread
// gets all users participating in each thread
export function apiGetUserThreads(app: Application) {
  app.route('/api/threads').get((req: Request, res: Response) => {

    const participantId = 1;
    const threadsPerUser = findDbThreadsPerUser(participantId);
    let messages: Message[] = [],
      participantIds: string[] = [];

    threadsPerUser.forEach(thread => {
      const threadMessages: Message[] = _.filter(dbMessages, (message: any) => message.threadId = thread.id);
      messages = messages.concat(threadMessages);
      participantIds = participantIds.concat(_.keys(thread.participants));
    });

    const participants = _.uniq(participantIds.map(participantId => dbParticipants[participantId]));

    const response: AllUserData = {
      participants,
      messages,
      threads: threadsPerUser
    };

    res.status(200).json(response);
  });
}
