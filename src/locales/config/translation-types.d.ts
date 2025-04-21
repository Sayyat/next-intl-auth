/*
 * Copyright (c) 2025. Sayat Raykul
 */

// locales/config/translation-types.ts

import type kk from "../messages/kk.json";

// Шаг 1: Базовый тип всех переводов
export type TMessages = typeof kk;

// Шаг 2: Рекурсивно получить все пути вида "auth.errors.firstname.min"
export type NestedKeyOf<ObjectType> = ObjectType extends object
  ? {
      [Key in keyof ObjectType & (string | number)]:
        | `${Key}`
        | `${Key}.${NestedKeyOf<ObjectType[Key]>}`;
    }[keyof ObjectType & (string | number)]
  : never;

export type TAllKeys = NestedKeyOf<TMessages>;

// Шаг 3: Найти только namespace'ы (те, кто не строки)
export type TAllNamespaces = {
  [Key in TAllKeys]: NestedValueOf<TMessages, Key> extends string ? never : Key;
}[TAllKeys];

// Шаг 4: Найти только ключи-строки
export type TAllMessageKeys = {
  [Key in TAllKeys]: NestedValueOf<TMessages, Key> extends string ? Key : never;
}[TAllKeys];

// Шаг 5: Извлечь значение по пути
export type NestedValueOf<
  ObjectType,
  Path extends string,
> = Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof ObjectType
    ? NestedValueOf<ObjectType[Key], Rest>
    : never
  : Path extends keyof ObjectType
    ? ObjectType[Path]
    : never;

// Шаг 6: Ключи внутри неймспейса
export type TKeysInsideNamespace<N extends TAllNamespaces> =
  Extract<TAllKeys, `${N}.${string}`> extends `${N}.${infer K}` ? K : never;
