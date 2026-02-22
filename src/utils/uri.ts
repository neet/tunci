export const toHref = (uri: string): string => {
  if (uri.startsWith("http")) {
    return uri;
  }

  if (uri.startsWith("urn:isbn")) {
    const isbn = uri.replace(/^urn:isbn/, "");
    return `https://isbnsearch.org/isbn/${isbn}`;
  }

  throw new Error("Unknown URN provied");
};
