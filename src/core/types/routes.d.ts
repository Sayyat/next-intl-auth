/*
 * Copyright (c) 2025. Sayat Raykul
 */

import type { LucideIcon } from "lucide-react";
import { TKeysInsideNamespace } from "@/locales/config/translation-types";

export type TRouteKey = TKeysInsideNamespace<"core.config.routes">;

export interface IBaseRoute {
  titleKey: TRouteKey; // Ключ для перевода (гарантированно правильный)
  url: string; // Абсолютный путь
  icon?: LucideIcon; // Иконка маршрута
}

export interface IAppRoute extends IBaseRoute {
  subRoutes?: IBaseRoute[]; // ✅ Можно вложить подмаршруты
}
