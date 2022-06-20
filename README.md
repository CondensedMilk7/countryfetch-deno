# countryfetch

A cli tool for fetching information about countries. It uses https://restcountries.com/ API for backend.

## dependencies

[DENO](https://deno.land/)

## usage

```bash
deno run --allow-all /path/to/program/main.ts <arguments>
```

available arguments:

- `find <country-name>` - Find country information by name. Country names cannot have whitespaces, use kebab-case or snake_case instead.
- `sync` - Synchronizes databes, stores it in localStorage. This is done automatically, but can be triggered manually.
- `random` - Get random country information.

## Issues

- App will not match names that include "-", which is replaced by whitespace by program.
