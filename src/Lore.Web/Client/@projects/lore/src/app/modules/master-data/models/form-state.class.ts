export class FormState<T> {
  constructor(readonly value: T, readonly valid = false) {}
}
