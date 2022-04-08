export function splitCbUrls(delimiter: string = ',') {
  const urls = process.env.CALLBACK_URLS;
  return urls.split(delimiter);
}
