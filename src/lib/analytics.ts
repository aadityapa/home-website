"use client";

type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  const key = "ulu-analytics-session-v1";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;
  const next = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  window.sessionStorage.setItem(key, next);
  return next;
}

/**
 * Lightweight analytics bridge:
 * - pushes events to `window.dataLayer` when present
 * - emits a browser CustomEvent for local listeners/debug
 */
export function trackEvent(event: string, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const message = {
    event,
    ...payload,
    timestamp: new Date().toISOString(),
    sessionId: getSessionId(),
    path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(message);
  window.dispatchEvent(new CustomEvent("ulu:analytics", { detail: message }));
}
