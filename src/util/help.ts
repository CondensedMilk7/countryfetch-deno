export function help(): void {
  console.log(
    "\ncountryfetch\n",
    "\tFetch information about countries",
    "\n",
    "\nUSAGE\n",
    "\tcountryfetch <ARGS>",
    "\n",
    "\nARGS:\n",
    "\tsync",
    "\n\t\tSynchronize database. Stores countries' data in ~/.cache/conntryfetch/countries.json.",
    "\n",
    "\n\trandom",
    "\n\t\tPrint information about a random country.",
    "\n",
    "\n\t<country_name>",
    "\n\t\tPrint information about the specified country.",
    "\n",
    "\n",
    "\n\tcapital <capital>",
    "\n\t\tPrint country to which the specified capital belongs.",
    "\n",
    "\nEXAMPLE:\n",
    "\tcountryfetch germany",
    "\n\t\tPrints information about Germany",
    "\n"
  );
}
