# countryfetch

A cli tool for fetching information about countries. It uses https://restcountries.com/ API for backend.

![](./images/countryfetch.png)

## Dependencies

[DENO](https://deno.land/)

## Installation

clone this repository:

```bash
git clone https://github.com/CondensedMilk7/countryfetch.git
```

navigate to the cloned repo folder and run install:

```bash
cd ./countryfetch
./install.sh
```

The app should now be installed.

alternatively, you can compile it yourself and store it in your local bin directory (might be safer):

```bash
deno compile --allow-all main.ts
cp ./countryfetch  ~/.local/bin
```

If after this your shell cannot find countryfetch, this means you haven't added your local bin to PATH. Either add it to PATH, or make an alias in your .bashrc or .zshrc:

```bash
alias countryfetch="~/.local/bin/countryfetch"
```

## Usage

```bash
countryfetch <arguments>
```

### Arguments:

- `<country_name>` - Find country information by name.
- `capital <capital>` - Find country to which the specified capital belongs.
- `sync` - Fetches data from API and stores it in `~/.cache/countryfetch/countries.json`. This is done automatically, but can be triggered manually.
- `random` - Get random country information.
- `raw` - Print country information in raw format as JavaScript object.

### Example:

```
$ countryfetch germany

Country:	Germany 🇩🇪 
Lat/Lng		51/9 
Population:	83,240,525 
Languages:	German 
Capital:	Berlin 
Capital Lat/Lng: 52.52/13.4 
Region:		Europe 
Subregion:	Western Europe 
Timezones:	UTC+01:00 
Currencies:	Euro [€](EUR)

```

## Would be nice to have in the future (a bit ambitious):

- Users can customize which information to display about country,
- Get only one particular property about country (for example, get just the timezone of Netherlands).
- Custom query builder that makes a direct call to api and returns a readable information.
- A capital guessing game.

## Contribution

I will add new features when I have time, but you don't have to wait - add them yourself! Submit pull requests, or fork it and make it your own alltogether.
