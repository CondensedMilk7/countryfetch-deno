import {
  syncCountries,
  printCountry,
  findCountry,
  randomCountry,
} from "./countries.util.ts";

await syncCountries();

const arg = Deno.args[0];

if (arg === "sync") {
  await syncCountries(true);
}

if (arg === "random") {
  printCountry(randomCountry());
}

if (arg === "find") {
  let selectedCountry = findCountry(Deno.args[1]);
  printCountry(selectedCountry);
}
