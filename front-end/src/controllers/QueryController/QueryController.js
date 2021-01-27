import http from 'http';
import queryString from 'query-string';

export default class QueryController {
    async get(body) {
        let results;
        const options = {
            hostname: 'localhost',
            port: 80,
            path: '/search',
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(body).length,
            }
        };
        return await new Promise((resolve, reject) => {
            let request = http.request(options, res => {
                let response = "";

                console.log(options);

                if (200 < res.statusCode && 300 > res.statusCode) {
                    return resolve(res.headers);
                }

                if (400 <= res.statusCode) {
                    let err = new Error(response);
                    err.statusCode = res.statusCode;
                    return reject(err);
                }

                res.on("data", function (chunk) {
                    response += chunk;
                });

                res.on("end", () => {
                    let reply = JSON.parse(response);
                    resolve(reply);
                });
            });

            request.write(JSON.stringify(body));

            request.on('error', function (err) {
                return reject(err);
            });

            request.end();
        });
        // try {
        //     results = await new Promise((resolve, reject) => {
        //         http.request(options, (res) => {
        //             let { statusCode, message } = res;
        //             let contentType = res.headers['content-type'];

        //             let error;

        //             if (statusCode !== 200) {
        //                 error = new Error('Request Failed.\n' +
        //                     `Status Code: ${statusCode}\n` +
        //                     `Message: ${message}`);
        //             } else if (!/^application\/json/.test(contentType)) {
        //                 error = new Error('Invalid content-type.\n' +
        //                     `Expected application/json but received ${contentType}`);
        //             }

        //             if (error) {
        //                 console.error(error.message);
        //                 // consume response data to free up memory
        //                 res.resume();
        //             }

        //             res.setEncoding('utf8');
        //             let rawData = '';

        //             res.on('data', (chunk) => {
        //                 rawData += chunk;
        //             });

        //             res.on('end', () => {
        //                 try {
        //                     const parsedData = JSON.parse(rawData);
        //                     resolve(parsedData);
        //                 } catch (e) {
        //                     reject(e.message);
        //                 }
        //             });
        //         }).on('error', (e) => {
        //             reject(`Got error: ${e.message}`);
        //         });

        //     }).then(response => {
        //         return response;
        //     }).catch(error => {
        //         return error;
        //     })
        // } catch (e) {
        //     console.log(e);
        //     results = '{}';
        // }
        // return results;
    }
}