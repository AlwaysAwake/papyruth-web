'use strict';

export function replaceNewline(s) {
  return s.replace(/\\r\\n|\\r|\\n|<br\s*[\/]?>/gm, " ");
}

export function ellipsis(s, len) {
  return s.length > len ? s.substring(0, len) + ' ...' : s;
}

export function truncate(s, len) {
  return s.length > len ? s.substring(0, len) : s;
}

export function splitByNewline(s) {
  return s.split(/\r\n|\n|\r|\\r\\n|\\r|\\n|<br\s*[\/]?>/gm);
}
