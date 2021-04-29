export function readGoogleSpreadsheet(url, callback) {
  // fetch google spreadsheet url
  fetch(url, {
      method: "GET",
    }).then(response => response.text())
    .then(text => {
      console.log(text);
      var headers = [];
      var data = []
      text.split("\n").forEach((line, idx) => {
        if (idx === 0) {
          line.split("\t").forEach((column) => {
            headers.push(column.trim())
          })
        } else {
          console.log(headers)
          var val = {}
          line.split("\t").map((value, idx) => {
            val[[headers[idx]]] = value.trim()
          })
          data.push(val)
        }
      })
      console.log('00000000')
      console.log(data)
      console.log('11111111')
      callback(data)
    });
}