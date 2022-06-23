import { environment } from "./environment/environment.ts";
import {
  Country,
  Region,
  Currencies,
  Languages,
} from "./models/country.model.ts";
import { Cache } from "./util/cache.ts";
import { Logger } from "./util/logger.ts";

export class Countries {
  list: Country[] = [];
  names: string[] = [];
  query = environment.queries;

  constructor(private cache: Cache, private logger: Logger) {}

  public async sync(config?: { force: boolean }): Promise<Country[]> {
    if (this.shouldSync() || config?.force) {
      this.logger.alert(
        "Synchronizing countries database...",
        config?.force
          ? ""
          : `\nThis will only happen every ${environment.syncInterval} days`
      );

      // Fetch and parse countries data from API
      const response = await fetch(environment.baseUrl + this.query);
      const countries = (await response.json()) as Country[];

      this.list = countries;
      this.cache.saveJson("countries", countries);
      this.cache.saveTxt("last-synced", JSON.stringify(Date.now()));

      this.logger.success(
        `Synced successfully: cache saved at ${environment.cacheDir}`
      );
    } else {
      this.list = this.cache.readJson("countries") as Country[];
    }
    this.names = this.list.map((c) => c.name.common);
    return this.list;
  }

  getAll() {
    return this.list;
  }

  public find(name: string) {
    name = name.toLowerCase();

    // Find exact match first
    let country = this.list.find((c) => {
      const countryName = c.name.common.toLowerCase();
      return countryName === name;
    });

    // Find fuzzy match if exact was not found
    if (!country) {
      country = this.list.find((c) => {
        const countryName = c.name.common.toLowerCase();
        return countryName.includes(name);
      });
    }

    if (!country) {
      throw `Cannot find country named ${name}`;
    }

    return country;
  }

  public findByCapital(capital: string) {
    const country = this.list.find((c) => {
      const capitalsLowercase = c.capital.map((capital) =>
        capital.toLowerCase()
      );
      return capitalsLowercase.includes(capital);
    });

    if (!country) {
      throw `Could not find the country of capital: ${capital}`;
    }

    return country;
  }

  capitalOf(capital: string) {
    const country = this.findByCapital(capital);
    this.logger.capitalOf(capital, country.name.common);
  }

  public filterByRegion(region: Region) {
    return this.list.filter((country) => country.region === region);
  }

  public print(name: string) {
    const country = this.find(name);
    const currencies = this.extractCurrencies(country.currencies);
    const languages = this.extractLanguages(country.languages);

    this.logger.logCountry({
      country: country.name.common,
      capital: country.capital[0],
      flag: country.flag,
      population: country.population.toLocaleString(),
      region: country.region,
      currencies,
      languages,
    });
  }

  public random(): string {
    const randomNum = Math.floor(Math.random() * this.names.length);
    return this.names[randomNum];
  }

  private shouldSync() {
    const lastSynced = this.cache.readTxt("last-synced");
    const cacheExists = this.cache.exists("countries", ".json");
    const week = environment.syncInterval * 23 * 60 * 60 * 1000;
    const updateDue = Date.now() - Number(lastSynced) > week;

    return !cacheExists || !lastSynced || updateDue;
  }

  private extractCurrencies(currencies: Currencies) {
    const result = [];
    for (const currencyAbbr in currencies) {
      const currency = currencies[currencyAbbr];
      result.push(`${currency.name} [${currency.symbol}](${currencyAbbr})`);
    }
    return result.join("\n\t\t ");
  }

  private extractLanguages(languages: Languages) {
    const result = [];
    for (const langAbbr in languages) {
      result.push(languages[langAbbr]);
    }
    return result.join(" | ");
  }
}
