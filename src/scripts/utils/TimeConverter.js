'use strict';

export function timeAgo(orgTimeStr) {
  let date = new Date(orgTimeStr);
  let seconds = Math.floor((new Date() - date) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 0) {
      return interval + "년 전";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 0) {
      return interval + "달 전";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 0) {
      return interval + "일 전";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 0) {
      return interval + "시간 전";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 0) {
      return interval + "분 전";
  }
  return Math.floor(seconds) + "초 전";
}

export function timeStamp(orgTimeStr) {
  let date = new Date(orgTimeStr);

  return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
}
