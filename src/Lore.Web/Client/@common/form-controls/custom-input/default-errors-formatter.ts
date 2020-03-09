export interface ErrorsFormatter {
  [error: string]: ((error: any) => string) | string;
}

export const defaultErrorsFormatter: ErrorsFormatter = {
  // Errors handlers
  maxlength: error =>
    `Максимальное количество символов: ${error.requiredLength}`,
  minlength: error =>
    `Минимальное количество символов: ${error.requiredLength}`,
  max: error => `Максимальное значение: ${error.max}`,
  min: error => `Минимальное значение: ${error.min}`,

  // Errors messages
  invalidIntegerValue: 'Допустимо только целое значение',
  alreadyBinded: 'Элемент уже сопоставлен',
  alreadyExist: 'Введите уникальное значение',
  doesNotExist: 'Элемент не существует',
  email: 'Некорректный email',
  lengthTooLong: 'Слишком длинное значение',
  noVisibility: 'Вне области видимости',
  outOfRange: 'Значение выходит за рамки допустимого диапазона',
  required: 'Поле обязательно',
  requiredField: 'Поле обязательно',
  requirementNotResolved: 'Условия не выполнены',
  verstampChanged: 'Версия не совпадает',
  invalidPeriod: 'Дата начала должна быть меньше даты окончания',
  wrongFormat: 'Некорректный формат данных',
  typeIncompatibility: 'Несовпадение типов данных',
  lengthTooShort: 'Слишком короткое значение'
};
