"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { TVShow } from "@/types/tmdb";

const STORAGE_KEY = "favorites:v2";
const UPDATE_EVENT = "favorites:update";
const EXPIRY_MS = 2 * 60 * 60 * 1000; 

export type FavoriteShow = Pick<
  TVShow,
  | "id"
  | "name"
  | "poster_path"
  | "backdrop_path"
  | "vote_average"
  | "first_air_date"
>;

export function useFavorites() {
  const [favorites, setFavorites] = useState<Record<number, FavoriteShow>>({});

  const readFromStorage = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { data: Record<number, FavoriteShow>; savedAt: number };
      if (parsed && parsed.data && parsed.savedAt && Date.now() - parsed.savedAt < EXPIRY_MS) {
        setFavorites(parsed.data);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }, []);

  useEffect(() => { readFromStorage(); }, [readFromStorage]);

  const persist = useCallback((next: Record<number, FavoriteShow>) => {
    try {
      const payload = { data: next, savedAt: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      setTimeout(() => window.dispatchEvent(new Event(UPDATE_EVENT)), 0);
    } catch {}
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) readFromStorage();
    };
    const onCustom = () => readFromStorage();
    window.addEventListener('storage', onStorage);
    window.addEventListener(UPDATE_EVENT, onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener(UPDATE_EVENT, onCustom as EventListener);
    };
  }, [readFromStorage]);

  const isFavorite = useCallback(
    (id: number) => Boolean(favorites[id]),
    [favorites]
  );

  const add = useCallback((show: FavoriteShow) => {
    setFavorites((prev) => {
      const next = { ...prev, [show.id]: show };
      persist(next);
      return next;
    });
  }, [persist]);

  const remove = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = { ...prev };
      delete next[id];
      persist(next);
      return next;
    });
  }, [persist]);

  const toggle = useCallback((show: FavoriteShow) => {
    setFavorites((prev) => {
      const exists = Boolean(prev[show.id]);
      const next = { ...prev };
      if (exists) {
        delete next[show.id];
      } else {
        next[show.id] = show;
      }
      persist(next);
      return next;
    });
  }, [persist]);

  const list = useMemo(() => Object.values(favorites), [favorites]);

  return { list, add, remove, toggle, isFavorite };
}


