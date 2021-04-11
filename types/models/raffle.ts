import Participant from "./participant";

export default interface Raffle {
  id?: string
  channelId?: string
  code?: string
  liveUrl?: string
  status?: number //0 - Active, 1 - Drawn, 2 - Canceled
  winners?: number
  uid?: string
  user?: firebase.default.firestore.DocumentReference
  createdAt?: Date
  updatedAt?: Date
  participants?: Array<Participant>;
}