export default interface Raffle {
  id?: string
  email?: string
  enterDate?: firebase.default.firestore.Timestamp
}