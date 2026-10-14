import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from "react";
import { zhTranslations } from "./zh";

export type SiteLanguage = "en" | "zh-CN";
type LanguageContextValue = { language: SiteLanguage; changeLanguage: (value: SiteLanguage) => void; tr: (value: string) => string };
const LanguageContext = createContext<LanguageContextValue>({
  language: "en",
  changeLanguage: () => {},
  tr: (value: string) => value,
});
const STORAGE_KEY = "portfolio-language";

/** An explicit shareable URL language wins over a visitor's saved preference. */
export function languageFromSearch(search: string): SiteLanguage | null {
  const requested = new URLSearchParams(search).get("lang");
  return requested === "zh-CN" || requested === "en" ? requested : null;
}

/** Keep the current route hash and any independent URL parameters untouched. */
export function languageSharePath(href: string, next: SiteLanguage): string {
  const url = new URL(href);
  url.searchParams.set("lang", next);
  return url.pathname + url.search + url.hash;
}
const textMemory = new WeakMap<Text, { original: string; rendered: string }>();
const attributeMemory = new WeakMap<Element, Map<string, { original: string; rendered: string }>>();
const attributes = ["aria-label", "aria-description", "placeholder", "title", "alt", "value"] as const;

export function translateText(value: string, language: SiteLanguage): string {
  if (language === "en") return value;
  const exact = zhTranslations[value];
  if (exact !== undefined) return exact;
  const normalized = value.trim();
  if (!normalized) return value;
  const translated = zhTranslations[normalized];
  if (translated !== undefined) {
    const lead = value.match(/^\s*/)?.[0] ?? "";
    const trail = value.match(/\s*$/)?.[0] ?? "";
    return lead + translated + trail;
  }
  const matched = normalized.match(/^(\d+) (public repositories|research previews|dated stories|records shown|records|entries|entry|programmes)$/);
  if (matched) {
    const words: Record<string, string> = {
      "public repositories": "个公开代码仓库", "research previews": "项研究预览", "dated stories": "条按日期归档的动态",
      "records shown": "条记录", records: "条记录", entries: "条动态", entry: "条动态",
      programmes: "个项目",
    };
    return String(matched[1]) + words[matched[2]];
  }
  return value;
}

/**
 * Translate existing, proven English React content without destructive HTML
 * replacement, remote APIs, or changing stored publication metadata.
 * Text/attributes are translated independently and original values are retained
 * for an exact, reversible English switch.
 */
function localizeNode(node: Node, language: SiteLanguage) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node as Text;
    const now = text.nodeValue ?? "";
    const saved = textMemory.get(text);
    const original = saved && now === saved.rendered ? saved.original : now;
    const rendered = translateText(original, language);
    textMemory.set(text, { original, rendered });
    if (now !== rendered) text.nodeValue = rendered;
    return;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return;
  const element = node as Element;
  if (element.matches("script,style,code,pre,[data-no-translate]")) return;
  if (element.tagName === "INPUT" && (element as HTMLInputElement).type !== "button") {
    // Never translate user input or payment addresses; only its labels.
  }
  let originals = attributeMemory.get(element);
  if (!originals) { originals = new Map(); attributeMemory.set(element, originals); }
  for (const attribute of attributes) {
    if (!element.hasAttribute(attribute)) continue;
    // Never localize URL/copy-value attributes, or data source identities.
    if (attribute === "value" && !["BUTTON", "INPUT"].includes(element.tagName)) continue;
    if (attribute === "value" && element.tagName === "INPUT" && (element as HTMLInputElement).type !== "button") continue;
    const now = element.getAttribute(attribute) ?? "";
    const saved = originals.get(attribute);
    const original = saved && saved.rendered === now ? saved.original : now;
    const rendered = translateText(original, language);
    originals.set(attribute, { original, rendered });
    if (now !== rendered) element.setAttribute(attribute, rendered);
  }
  for (const child of Array.from(element.childNodes)) localizeNode(child, language);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    if (typeof window === "undefined") return "en";
    const requested = languageFromSearch(window.location.search);
    if (requested) return requested;
    try {
      return window.localStorage.getItem(STORAGE_KEY) === "zh-CN" ? "zh-CN" : "en";
    } catch { return "en"; }
  });

  const changeLanguage = useCallback((next: SiteLanguage) => {
    setLanguage(next);
    if (typeof window !== "undefined") {
      const path = languageSharePath(window.location.href, next);
      window.history.replaceState(window.history.state, "", path);
    }
  }, []);

  useEffect(() => {
    // Browser back/forward can change an explicit locale in the URL.
    const syncUrlLanguage = () => {
      const requested = languageFromSearch(window.location.search);
      if (requested) setLanguage(requested);
    };
    window.addEventListener("popstate", syncUrlLanguage);
    return () => window.removeEventListener("popstate", syncUrlLanguage);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    try { window.localStorage.setItem(STORAGE_KEY, language); } catch { /* browser restrictions */ }
    const root = document.getElementById("root") ?? document.body;
    localizeNode(root, language);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") localizeNode(mutation.target, language);
        else if (mutation.type === "attributes") localizeNode(mutation.target, language);
        else for (const added of Array.from(mutation.addedNodes)) localizeNode(added, language);
      }
    });
    observer.observe(root, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: [...attributes] });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language, changeLanguage, tr: (text: string) => translateText(text, language),
  }), [language, changeLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  // English fallback keeps standalone archive and story components testable.
  return useContext(LanguageContext);
}
