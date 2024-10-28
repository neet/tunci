import { algoliasearch } from "algoliasearch";
import assert from "assert";

assert(process.env.ALGOLIA_APP_ID, "ALGOLIA_APP_ID is required");
assert(process.env.ALGOLIA_API_KEY, "ALGOLIA_API_KEY is required");

export const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY,
);
