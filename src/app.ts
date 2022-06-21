import { green, cyan } from "https://deno.land/x/nanocolors@0.1.12/mod.ts";
import { Countries } from "./countries.ts";
import { Cache } from "./util/cache.ts";
import { help } from "./util/help.ts";

export async function app() {
  const command = Deno.args[0];
  const countries = new Countries(new Cache());

  await countries.sync();
  switch (command) {
    case undefined:
      help();
      break;
    case "help":
      help();
      break;
    case "sync":
      await countries.sync({ force: true });
      break;
    case "random":
      countries.print(countries.random());
      break;
    case "capital":
      const [, ...args] = Deno.args;
      const capital = args.join(" ");
      const country = countries.findByCapital(capital);
      console.log(
        green(capital) + " is the capital of " + cyan(country.name.common)
      );
      break;
    default:
      countries.print(Deno.args.join(" "));
      break;
  }
}
