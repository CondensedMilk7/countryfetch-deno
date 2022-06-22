import { Countries } from "./countries.ts";
import { Logger } from "./util/logger.ts";

export class App {
  constructor(
    // private cache: Cache,
    private logger: Logger,
    private countries: Countries
  ) {}

  async run() {
    const command = Deno.args[0];

    await this.countries.sync();
    switch (command) {
      case undefined:
        this.logger.help();
        break;
      case "help":
        this.logger.help();
        break;
      case "sync":
        await this.countries.sync({ force: true });
        break;
      case "random":
        this.countries.print(this.countries.random());
        break;
      case "capital":
        const [, ...args] = Deno.args;
        const capital = args.join(" ");
        this.countries.capitalOf(capital);
        break;
      case "raw":
        this.logger.log(this.countries.find(Deno.args[1]));
        break;
      default:
        this.countries.print(Deno.args.join(" "));
        break;
    }
  }
}
