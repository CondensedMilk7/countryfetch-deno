import { join } from "https://deno.land/std@0.144.0/path/mod.ts";
import {
  ensureDirSync,
  existsSync,
} from "https://deno.land/std@0.78.0/fs/mod.ts";
import { environment } from "../environment/environment.ts";
import { Country } from "../models/country.model.ts";
import { FlagAscii } from "../models/flag-ascii.model.ts";

export class Cache {
  path = environment.cacheDir;

  public saveJson(name: string, data: Country[] | FlagAscii[]) {
    ensureDirSync(this.path);

    Deno.writeTextFileSync(
      join(this.path, `${name}.json`),
      JSON.stringify(data)
    );
  }

  public saveTxt(name: string, value: string) {
    ensureDirSync(this.path);
    Deno.writeTextFileSync(join(this.path, `${name}.txt`), value);
  }

  public readJson(name: string): any {
    let data;
    try {
      data = Deno.readTextFileSync(join(this.path, `${name}.json`));
    } catch {
      return undefined;
    }
    return JSON.parse(data);
  }

  public readTxt(name: string) {
    try {
      return Deno.readTextFileSync(join(this.path, `${name}.txt`));
    } catch {
      return undefined;
    }
  }

  public exists(name: string, extension?: string) {
    return existsSync(join(this.path, `${name}${extension}`));
  }
}
