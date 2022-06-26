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
      nano.cyan("Country:"),
      country.country,
      country.flag,
      nano.green("\nLat/Lng:"),
      country.latlng,
      nano.green("\nPopulation:"),
      country.population,
      nano.green("\nLanguages:"),
      country.languages,
      nano.green("\nCapital:"),
      country.capital,
      nano.green("\nCapital Lat/Lng:"),
      country.capitalLatLng,
      nano.green("\nRegion:"),
      country.region,
      nano.green("\nSubregion:"),
      country.subregion,
      nano.green("\nTimezones:"),
      country.timezones,
      nano.green("\nTop Level Domain:"),
      country.tld,
      nano.green("\nCurrencies:"),
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
      "\n\t\tPass additional argument 'sync flag' to fetch and convert flags in ASCII art.",
      "\n\t\tAfter syncing flags, every countryfetch command will display flag ASCII art.",
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
