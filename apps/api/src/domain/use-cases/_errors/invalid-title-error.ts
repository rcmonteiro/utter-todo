export class InvalidTitleError extends Error {
  constructor() {
    super('Title cannot have less than 3 characters')
  }
}
