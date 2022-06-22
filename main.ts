import { App } from "./src/app.ts";
import { Logger } from "./src/util/logger.ts";
import { Cache } from "./src/util/cache.ts";
import { Countries } from "./src/countries.ts";

// I wanted to get the hang of OOP but this feels regrettable
const logger = new Logger();
const cache = new Cache();
const countries = new Countries(cache, logger);
const app = new App(logger, countries);

await app.run();
