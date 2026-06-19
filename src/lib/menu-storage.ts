"use client";

import { useMemo, useSyncExternalStore } from "react";
import { defaultMenuState } from "@/lib/menu-data";
import type { MenuCategory, MenuItem, MenuState } from "@/types/menu";

const STORAGE_KEY = "sutlu-cardak-menu-state";
const STORAGE_EVENT = "sutlu-cardak-menu-state-change";
const DEFAULT_MENU_JSON = JSON.stringify(defaultMenuState);

function cloneDefaultState(): MenuState {
  return {
    categories: defaultMenuState.categories.map((category) => ({ ...category })),
    items: defaultMenuState.items.map((item) => ({ ...item, tags: item.tags ? [...item.tags] : [] })),
  };
}

function normalizeMenuState(value: unknown): MenuState | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<MenuState>;
  if (!Array.isArray(candidate.categories) || !Array.isArray(candidate.items)) {
    return null;
  }

  return {
    categories: candidate.categories.filter(Boolean) as MenuCategory[],
    items: candidate.items.filter(Boolean) as MenuItem[],
  };
}

function parseMenuState(raw: string): MenuState {
  try {
    return normalizeMenuState(JSON.parse(raw)) ?? cloneDefaultState();
  } catch {
    return cloneDefaultState();
  }
}

function getSnapshot() {
  return window.localStorage.getItem(STORAGE_KEY) ?? DEFAULT_MENU_JSON;
}

function getServerSnapshot() {
  return DEFAULT_MENU_JSON;
}

function subscribe(callback: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(STORAGE_EVENT, callback);
  };
}

function writeMenuState(menuState: MenuState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(menuState));
  window.dispatchEvent(new Event(STORAGE_EVENT));
}

export function useMenuStore() {
  const rawMenuState = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const menuState = useMemo(() => parseMenuState(rawMenuState), [rawMenuState]);

  const actions = useMemo(
    () => ({
      setCategories: (categories: MenuCategory[]) =>
        writeMenuState({
          ...menuState,
          categories,
        }),
      setItems: (items: MenuItem[]) =>
        writeMenuState({
          ...menuState,
          items,
        }),
      resetMenu: () => writeMenuState(cloneDefaultState()),
    }),
    [menuState],
  );

  return { ...menuState, hydrated: true, ...actions };
}
