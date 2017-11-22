'use strict';

// BASE_URL must have '/' at the end to make correct request urls
let subDomain = location.hostname.split('.')[0].toLowerCase();
let BASE_URL;
if (process.env.NODE_ENV === "production") {
  if (subDomain === "papyruth") {
    BASE_URL = "https://snu-api.papyruth.com/api/v1/";
  } else {
    BASE_URL = "https://" + subDomain + "-api.papyruth.com/api/v1/";
  }
} else {
  BASE_URL = "https://api-staging.papyruth.com/api/v1/";
}

const clientSpecs = {
  "device_type": "web",
  "app_version": "1.1.2",
  "os_version": "-",
  "device_model": "-"
};

export default {
  BASE_URL: BASE_URL,
  clientSpecs: clientSpecs,
  subDomain: subDomain
}
