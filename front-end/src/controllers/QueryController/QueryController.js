import React from 'react';
import http from 'http';

export default class QueryController {
    async get() {
        let results;
        const options = {
            hostname: 'localhost',
            port: 3001,
            path: '/search',
            method: 'GET',
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
            }
        };
        try {
            results = new Promise((resolve, reject) => {
                http.get(options, (res) => {
                    let { statusCode, message } = res;
                    let contentType = res.headers['content-type'];

                    let error;

                    if (statusCode !== 200) {
                        error = new Error('Request Failed.\n' +
                            `Status Code: ${statusCode}\n` +
                            `Message: ${message}`);
                    } else if (!/^application\/json/.test(contentType)) {
                        error = new Error('Invalid content-type.\n' +
                            `Expected application/json but received ${contentType}`);
                    }

                    if (error) {
                        console.error(error.message);
                        // consume response data to free up memory
                        res.resume();
                    }

                    res.setEncoding('utf8');
                    let rawData = '';

                    res.on('data', (chunk) => {
                        rawData += chunk;
                    });

                    res.on('end', () => {
                        try {
                            const parsedData = JSON.parse(rawData);
                            resolve(parsedData);
                        } catch (e) {
                            reject(e.message);
                        }
                    });
                }).on('error', (e) => {
                    reject(`Got error: ${e.message}`);
                });

            }).then(response => {
                return response;
            }).catch(error => {
                return error;
            })
        } catch (e) {
            results = '{}';
        }
        return results;
    }
}