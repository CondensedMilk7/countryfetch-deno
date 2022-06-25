import {
  printImage,
  getImageStrings,
} from "https://x.nest.land/terminal_images@3.0.0/mod.ts";
import { environment } from "../environment/environment.ts";

export class ImageConverter {
  width = environment.flagWidth;
  public getImageStrings(path: string) {
    return getImageStrings({
      path,
      width: this.width,
    });
  }

  public printImage(path: string) {
    return printImage({
      path,
      width: this.width,
    });
  }
}
