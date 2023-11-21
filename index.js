'use strict';

require('dotenv').config();
const fetch = require('node-fetch');

const SENSOR_NAME = 'NatureRemo';

(async () => {
    fetch('https://api.nature.global/1/devices', {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.token}`
        },
    })
        .then(res => {
            if (res.status !== 200) {
                throw new Error(`response status is ${res.status}`);
            }
            return res.text();
        })
        .then(text => {
            return JSON.parse(text);
        })
        .then(json => {
            const records = [];

            json.forEach(device => {
                const record = {
                    sensor: SENSOR_NAME,
                    id: device.id,
                };

                if (device.newest_events.te) {
                    record.time = device.newest_events.te.created_at;
                    record.temperature = device.newest_events.te.val + device.temperature_offset;
                }
                if (device.newest_events.hu) {
                    record.time = device.newest_events.hu.created_at;
                    record.humidity = device.newest_events.hu.val + device.humidity_offset;
                }
                if (device.newest_events.il) {
                    record.time = device.newest_events.il.created_at;
                    record.illumination = device.newest_events.il.val;
                }
                if (device.newest_events.mo) {
                    record.time = device.newest_events.mo.created_at;
                    record.movement = device.newest_events.mo.val;
                }

                records.push(record)
            })

            console.log(JSON.stringify(records));
        });
})();
