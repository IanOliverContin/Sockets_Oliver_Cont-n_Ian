import { usernames } from './usernames.json'

export class UsernameMother {
  static random (): string {
    const randomIndex = Math.floor(Math.random() * usernames.length)
    return usernames[randomIndex]
  }
}
