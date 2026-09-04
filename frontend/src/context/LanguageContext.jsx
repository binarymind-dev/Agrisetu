import { createContext, useContext, useState } from "react";
import en from "../i18n/en.json";
import hi from "../i18n/hi.json";
import mr from "../i18n/mr.json";

const dictionaries = { en, hi, mr };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "mr");

  const changeLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key) => dictionaries[lang]?.[key] || dictionaries.en[key] || key;

  return (
    <LanguageContext.Provider value={{ lang, changeLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
