function hashString() {
  // 入力フォームから文字列、ソルト、ハッシュ化回数を取得する
  const str = document.getElementById("string").value;
  const salt = document.getElementById("salt").value;
  const rounds = document.getElementById("rounds").value;

  let hash = salt + str; // ソルトを文字列の先頭に追加する

  // 指定された回数だけハッシュ化する
  for (let i = 0; i < rounds; i++) {
    // SHA-256 ハッシュ関数を使用して文字列をハッシュ化する
    const buffer = new TextEncoder().encode(hash);
    hash = crypto.subtle.digest("SHA-512", buffer).then(function(hash) {
      return hex(hash);
    });
  }

  // ハッシュ化された文字列を画面上に表示する
  hash.then(function(hashedString) {
    const resultElement = document.getElementById("result");
    resultElement.innerText = hashedString;
  });
}

// ArrayBuffer を 16 進数の文字列に変換する関数
function hex(buffer) {
  const hexCodes = [];
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    // 一時的な ArrayBuffer を作成する
    const value = view.getUint32(i);
    const stringValue = value.toString(16);
    const padding = "00000000";
    const paddedValue = (padding + stringValue).slice(-padding.length);
    hexCodes.push(paddedValue);
  }

  // hexCodes 配列を結合して 16 進数の文字列を作成する
  return hexCodes.join("");
}
