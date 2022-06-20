// For better currency types, this can be used later:
// https://github.com/freeall/currency-codes
export type CurrencyAbbr = string;
export type CurrencyInfo = { name: string; symbol: string };
export type LangAbbr = string;

export interface Country {
  name: {
    common: string;
    official: string;
    // Need type for nativeName later
  };
  currencies: Record<CurrencyAbbr, CurrencyInfo>;
  capital: string[];
  flag: string;
  population: number;
  languages: Record<LangAbbr, string>;
  region: string;
}
