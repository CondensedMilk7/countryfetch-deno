import { App } from "./app.ts";
import { Logger } from "./util/logger.ts";
import { Cache } from "./util/cache.ts";
import { Countries } from "./countries.ts";
import { ImageConverter } from "./util/image-converter.ts";

// I wanted to get the hang of OOP but this feels regrettable
const logger = new Logger();
const cache = new Cache();
const imageConverter = new ImageConverter();

const countries = new Countries(cache, logger, imageConverter);
const app = new App(logger, countries);

export default app;
