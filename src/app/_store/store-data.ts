import { Participant } from '../../../_shared/model/participant';
import { Thread } from '../../../_shared/model/thread';
import { Message } from '../../../_shared/model/message';

export interface StoreData {
  participants: { [key: number]: Participant };
  threads: { [key: number]: Thread };
  messages: { [key: number]: Message };
}
