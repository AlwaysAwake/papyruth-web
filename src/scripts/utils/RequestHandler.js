'use strict';

import Promise from 'bluebird';
import superagent from 'superagent';

export default {
  GET: (payload) => {
    return new Promise( (resolve, reject) => {
      superagent
        .get(payload.url)
        .set(payload.headers || {})
        .query(payload.query || {})
        .send(payload.body || {})
        .set('Accept', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  POST: (payload) => {
    return new Promise( (resolve, reject) => {
      superagent
        .post(payload.url)
        .set(payload.headers || {})
        .query(payload.query || {})
        .send(payload.body || {})
        .set('Accept', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  PUT: (payload) => {
    return new Promise( (resolve, reject) => {
      superagent
        .put(payload.url)
        .set(payload.headers || {})
        .query(payload.query || {})
        .send(payload.body || {})
        .set('Accept', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body);
        });
    });
  },

  DELETE: (payload) => {
    return new Promise( (resolve, reject) => {
      superagent
        .del(payload.url)
        .set(payload.headers || {})
        .query(payload.query || {})
        .send(payload.body || {})
        .set('Accept', 'application/json')
        .end((err, res) => {
          err ? reject(err) : resolve(res.body);
        });
    });
  }

}
