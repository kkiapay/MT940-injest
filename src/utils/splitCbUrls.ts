export function splitCbUrls(delimiter = ',') {
  const urls = process.env.CALLBACK_URLS;
  console.log(urls, urls.split(delimiter));
  return urls.split(delimiter);
}
