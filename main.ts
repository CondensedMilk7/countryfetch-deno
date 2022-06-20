import { Countries } from "./countries.ts";

const countries = new Countries();

await countries.sync();

const arg = Deno.args[0];

if (arg === "sync") {
  await countries.sync({ force: true });
}

if (arg === "random") {
  countries.print(countries.random());
}

if (arg === "find") {
  countries.print(Deno.args[1]);
}
