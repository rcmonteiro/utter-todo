import { Id } from './value-objects/id'

export type TTask = {
  title: string
  id?: string
  createdAt?: string
}

export class Task {
  readonly #id: Id
  readonly #createdAt: Date
  #title: string
  #completedAt?: Date

  constructor({ title, id, createdAt }: TTask) {
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

  toggleCompleted(): void {
    if (this.isCompleted()) {
      this.#completedAt = undefined
    } else {
      this.#completedAt = new Date()
    }
  }

  isCompleted(): boolean {
    return !!this.#completedAt
  }

  static isValidTitle(title: string): boolean {
    return !!title && title.length >= 3
  }
}
