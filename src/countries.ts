import * as nano from "https://deno.land/x/nanocolors@0.1.12/mod.ts";
import { environment } from "./environment/environment.ts";
import { Country } from "./models/country.model.ts";
import { Cache } from "./util/cache.ts";

export class Countries {
  list: Country[] = [];
  names: string[] = [];
  query = environment.queries;

  constructor(private cache: Cache) {}

  async sync(config?: { force: boolean }): Promise<Country[]> {
    const lastSynced = this.cache.readTxt("last-synced");
    const savedCountries = this.cache.readJson("countries") as
      | Country[]
      | undefined;
    const week = environment.syncInterval * 23 * 60 * 60 * 1000;

    const shouldSync =
      !savedCountries ||
      !lastSynced ||
      config?.force ||
      Date.now() - Number(lastSynced) > week;

    if (shouldSync) {
      console.log(
        nano.cyan("Syncronizing countries database..."),
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

      console.log("Synced successfully");
    } else {
      this.list = savedCountries;
    }
    this.names = this.list.map((c) => c.name.common);
    return this.list;
  }

  find(name: string) {
    name = name.toLowerCase();
    // Find exact match first, then fall back to fuzzy match
    const country = this.list.find((c) => {
      const countryName = c.name.common.toLowerCase();
      return countryName === name || countryName.includes(name);
    });

    if (!country) {
      throw Error(`Cannot find country named ${name}`);
    }

    return country;
  }

  findByCapital(capital: string) {
    const country = this.list.find((c) => {
      const capitalsLowercase = c.capital.map((capital) =>
        capital.toLowerCase()
      );
      return capitalsLowercase.includes(capital);
    });

    if (!country) {
      throw Error(`Could not find the country of capital: ${capital}`);
    }

    return country;
  }

  print(name: string) {
    const country = this.find(name);
    let currencies = [];
    let iteration = 0;
    for (const currencyAbbr in country.currencies) {
      iteration++;
      const currency = country.currencies[currencyAbbr];
      currencies.push(
        `${iteration > 1 ? "\t\t " : ""}${currency.name} [${
          currency.symbol
        }](${currencyAbbr})\n`
      );
    }

    let languages = [];
    for (const langAbbr in country.languages) {
      languages.push(country.languages[langAbbr]);
    }

    // above code needs refactoring

    console.log(
      nano.cyan("\nCountry:\t"),
      country.name.common,
      country.flag,
      nano.green("\nLanguages:\t"),
      languages.join(" | "),
      nano.green("\nCapital:\t"),
      country.capital[0],
      nano.green("\nRegion:\t\t"),
      country.region,
      nano.green("\nPopulation:\t"),
      country.population.toLocaleString(),
      nano.green("\nCurrencies:\t"),
      ...currencies
    );
  }

  random(): string {
    const randomNum = Math.floor(Math.random() * this.names.length);
    return this.names[randomNum];
  }
}
