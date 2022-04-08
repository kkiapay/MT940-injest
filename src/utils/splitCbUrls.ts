export function splitCbUrls(delimiter: string = ',') {
  const urls = process.env.CALLBACK_URLS;
  console.log(urls, urls.split(delimiter));
  return urls.split(delimiter);
}
