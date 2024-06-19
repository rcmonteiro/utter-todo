import { Id } from './value-objects/id'

export type TTask = {
  title: string
  id?: string
  createdAt?: string | null
  completedAt?: string | null
}

export class Task {
  readonly #id: Id
  readonly #createdAt: Date
  #title: string
  #completedAt?: Date | null

  constructor({ title, id, createdAt, completedAt }: TTask) {
    this.#id = id ? new Id(id) : new Id()
    this.#title = title
    this.#createdAt = createdAt ? new Date(createdAt) : new Date()
    this.#completedAt = completedAt ? new Date(completedAt) : null
  }

  get id(): Id {
    return this.#id
  }

  get createdAt(): Date {
    return this.#createdAt
  }

  get completedAt(): Date | undefined | null {
    return this.#completedAt
  }

  get title(): string {
    return this.#title
  }

  set title(newTitle: string) {
    this.#title = newTitle
  }

  toggleCompleted(): void {
    if (this.isCompleted()) {
      this.#completedAt = null
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
