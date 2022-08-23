function downloadFile(filename: string, content: string): void {
  const anchor = document.createElement('a');
  anchor.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
  anchor.setAttribute('download', filename);

  anchor.click();
}

export default downloadFile;
