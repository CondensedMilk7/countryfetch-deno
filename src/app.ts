import { Countries } from "./countries.ts";
import { Logger } from "./util/logger.ts";

export class App {
  constructor(private logger: Logger, private countries: Countries) {}

  async run(): Promise<void> {
    const [command, ...args] = Deno.args;

    await this.countries.sync();
    switch (command) {
      case undefined:
        this.logger.help();
        break;
      case "help":
        this.logger.help();
        break;
      case "sync":
        await this.countries.sync({
          force: true,
          flagAscii: args[0] === "flags",
        });
        break;
      case "random":
        this.countries.print(this.countries.random());
        break;
      case "capital":
        this.countries.capitalOf(args.join(" "));
        break;
      case "raw":
        this.logger.log(this.countries.find(args[0]));
        break;
      default:
        this.countries.print(Deno.args.join(" "));
        break;
    }
  }
}
