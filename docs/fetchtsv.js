export async function fetchTsv(url) {
  return new Promise(async (resolve) => {
    // fetch google spreadsheet url
    const text = await (await fetch(url)).text();
    const headers = [];
    const data = [];
    text.split("\n").forEach((line, idx) => {
      if (idx === 0) {
        line.split("\t").forEach((column) => {
          headers.push(column.trim());
        });
      } else {
        const val = {};
        line.split("\t").map((value, idx) => {
          val[[headers[idx]]] = value.trim();
        })
        data.push(val);
      }
    });
    resolve(data);
  });
}