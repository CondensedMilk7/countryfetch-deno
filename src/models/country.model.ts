// For better currency types, this can be used later:
// https://github.com/freeall/currency-codes
// Same can be done for language abbreviations
type CurrencyAbbr = string;
type CurrencyInfo = { name: string; symbol: string };
type LangAbbr = string;
type ImageFormat = "png" | "svg";
type Flags = Record<ImageFormat, string>;

export type Currencies = Record<CurrencyAbbr, CurrencyInfo>;
export type Languages = Record<LangAbbr, string>;
export enum Region {
  Asia = "Asia",
  Europe = "Europe",
  Americas = "Americas",
  Africa = "Africa",
  Oceania = "Oceania",
  Antarctic = "Antarctic",
}

export interface Country {
  name: {
    common: string;
    official: string;
    // Need type for nativeName later
  };
  currencies: Currencies;
  capital: string[];
  flag: string;
  population: number;
  languages: Languages;
  region: Region;
  subregion: string; //can later be explicit enum
  timezones: string[];
  latlng: number[];
  capitalInfo: {
    latlng: number[];
  };
  tld: string[];
  flags: Flags;
}
