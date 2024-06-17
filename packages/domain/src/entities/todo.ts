import { Id } from './value-objects/id'

export type TTodo = {
  title: string
  id?: string
  createdAt?: string
}

export class Todo {
  readonly #id: Id
  readonly #createdAt: Date
  #title: string
  #completedAt?: Date

  constructor({ title, id, createdAt }: TTodo) {
    this.#id = id ? new Id(id) : new Id()
    this.#title = title
    this.#createdAt = createdAt ? new Date(createdAt) : new Date()
  }

  get id(): Id {
    return this.#id
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  get title(): string {
    return this.#title
  }

  set title(newTitle: string) {
    this.#title = newTitle
  }

  markAsCompleted(): void {
    this.#completedAt = new Date()
  }

  isCompleted(): boolean {
    return !!this.#completedAt
  }

  static isValidTitle(title: string): boolean {
    return !!title && title.length >= 3
  }
}
