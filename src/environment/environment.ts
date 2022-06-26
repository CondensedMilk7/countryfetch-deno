import home_dir from "https://deno.land/x/dir@1.4.0/home_dir/mod.ts";
import { join } from "https://deno.land/std@0.144.0/path/mod.ts";

export const environment = {
  // Backend from where the information is fetched
  baseUrl: "https://restcountries.com/v3.1/",
  // Update cache if it has been longer than given DAYS since last sync
  syncInterval: 7,
  // Directory where country information should be stored.
  cacheDir: join(home_dir() as string, ".cache", "countryfetch"),
  // Determines the size of ASCII art flag size
  flagWidth: 40,
  // Fields that should be fetched from API
  queries:
    "all?fields=name,capital,currencies,population,flag,languages,region,subregion,timezones,latlng,capitalInfo,tld,flags",
};
