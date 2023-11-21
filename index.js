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
                Object.keys(device.newest_events).forEach(key => {
                    const event = device.newest_events[key];

                    const record = {
                        sensor: SENSOR_NAME,
                        id: device.id,
                        time: event.created_at
                    }

                    switch (key) {
                        case 'te': record.temperature = event.val + device.temperature_offset; break;
                        case 'hu': record.humidity = event.val + device.humidity_offset; break;
                        case 'il': record.illumination = event.val; break;
                        case 'mo': record.movement = event.val; break;
                    }

                    records.push(record);
                })

            })

            console.log(JSON.stringify(records));
        });
})();
