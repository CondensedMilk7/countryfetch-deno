import home_dir from "https://deno.land/x/dir@1.4.0/home_dir/mod.ts";
import { join } from "https://deno.land/std@0.144.0/path/mod.ts";

export const environment = {
  baseUrl: "https://restcountries.com/v3.1/",
  syncInterval: 7,
  cacheDir: join(home_dir() as string, ".cache", "countryfetch"),
  queries:
    "all?fields=name,capital,currencies,population,flag,languages,region,subregion,timezones,latlng,capitalInfo,tld",
};
