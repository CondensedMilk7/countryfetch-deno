import { join } from "https://deno.land/std@0.144.0/path/mod.ts";
import { ensureDirSync } from "https://deno.land/std@0.78.0/fs/mod.ts";
import { environment } from "../environment/environment.ts";

export class Cache {
  path = environment.cacheDir;

  public saveJson(name: string, data: {}) {
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

  public readJson(name: string): {} | [] | undefined {
    let data;
    try {
      data = Deno.readTextFileSync(join(this.path, `${name}.json`));
    } catch (err) {
      return undefined;
    }
    return JSON.parse(data);
  }

  public readTxt(name: string) {
    try {
      return Deno.readTextFileSync(join(this.path, `${name}.txt`));
    } catch (err) {
      return undefined;
    }
  }
}
