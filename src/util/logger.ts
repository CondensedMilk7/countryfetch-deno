import * as nano from "https://deno.land/x/nanocolors@0.1.12/mod.ts";
import { FetchedCountry } from "../models/fetched-country.model.ts";

export class Logger {
  public log(data: any) {
    console.log(data);
  }

  public alert(...data: any) {
    console.log(nano.yellow(data));
  }

  public success(...data: any) {
    console.log(nano.green(data));
  }

  public error(...data: any) {
    console.error(nano.red(data));
  }

  public logCountry(country: FetchedCountry) {
    console.log(
      nano.cyan("\nCountry:\t\t"),
      country.country,
      country.flag,
      nano.green("\nLat/Lng\t\t\t"),
      country.latlng,
      nano.green("\nPopulation:\t\t"),
      country.population,
      nano.green("\nLanguages:\t\t"),
      country.languages,
      nano.green("\nCapital:\t\t"),
      country.capital,
      nano.green("\nCapital Lat/Lng:\t"),
      country.capitalLatLng,
      nano.green("\nRegion:\t\t\t"),
      country.region,
      nano.green("\nSubregion:\t\t"),
      country.subregion,
      nano.green("\nTimezones:\t\t"),
      country.timezones,
      nano.green("\nTop Level Domain:\t"),
      country.tld,
      nano.green("\nCurrencies:\t\t"),
      country.currencies
    );
  }

  public capitalOf(capital: string, country: string) {
    console.log(
      nano.green(capital) + " is the capital of " + nano.cyan(country)
    );
  }

  public help(): void {
    console.log(
      "\ncountryfetch\n",
      "\tFetch information about countries",
      "\n",
      "\nUSAGE\n",
      "\tcountryfetch <ARGS>",
      "\n",
      "\nARGS:\n",
      "\tsync",
      "\n\t\tSynchronize database. Stores countries' data in ~/.cache/conntryfetch/countries.json.",
      "\n",
      "\n\trandom",
      "\n\t\tPrint information about a random country.",
      "\n",
      "\n\t<country_name>",
      "\n\t\tPrint information about the specified country.",
      "\n",
      "\n",
      "\n\tcapital <capital>",
      "\n\t\tPrint country to which the specified capital belongs.",
      "\n",
      "\n",
      "\n\traw <country_name>",
      "\n\t\tPrint country information in raw format as JavaScript object.",
      "\n",
      "\nEXAMPLE:\n",
      "\tcountryfetch germany",
      "\n\t\tPrints information about Germany.",
      "\n"
    );
  }
}
