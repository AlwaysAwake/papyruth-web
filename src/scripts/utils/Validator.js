'use strict';

export function validateEmail(email) {
  return !(
    email.indexOf('@') === -1 ||
    email.indexOf('.') === -1 ||
    email.indexOf('@') > email.indexOf('.')
  );
}
