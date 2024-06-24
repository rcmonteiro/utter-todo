import { randomUUID } from 'node:crypto'

export class Id {
  private value: string

  constructor(value?: string) {
    this.value = value ?? randomUUID()
  }

  public toString() {
    return this.value
  }

  public toValue() {
    return this.value
  }

  public equals(id: Id): boolean {
    return id.toValue() === this.value
  }
}
