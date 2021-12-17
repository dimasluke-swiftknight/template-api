const { uuid } = require('uuidv4');

const config = {
    params: {
        basePath: '/template/v1/api',
        headers: {
            'x-correlation-id': uuid()
        }
    }
}
module.exports = config;