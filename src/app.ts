import { Countries } from "./countries.ts";
import { Cache } from "./util/cache.ts";
import { help } from "./util/help.ts";

export async function app() {
  const command = Deno.args[0];
  const countries = new Countries(new Cache());

  await countries.sync();
  switch (command) {
    case "sync":
      await countries.sync({ force: true });
      break;
    case "random":
      countries.print(countries.random());
      break;
    case "help":
      help();
      break;
    default:
      countries.print(Deno.args.join(" "));
      break;
  }
}
