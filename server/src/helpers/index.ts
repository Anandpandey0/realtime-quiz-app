export function genRandonString(length: number) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()";
  var charLength = chars.length;
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
}
