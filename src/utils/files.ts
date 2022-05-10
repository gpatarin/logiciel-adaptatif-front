export function getBase64(file: Blob, callback: (base64: string) => void): void {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    if (reader.result) callback(reader.result.toString());
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}
