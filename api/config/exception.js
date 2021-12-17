/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const defaultExceptionHandler = async function (error, req, res, _next) {
    logger.error({
        application: applicationName,
        message: 'default-exception-handler ' + JSON.stringify(error.message),
        correlationId: req.headers['x-correlation-id'],
    })

    switch (error.cause) {
        case 'validation-error':
            return res.status(400).send({
                status: 'Error',
                message: error.message,
            });
        case 'authentication-error':
            return res.status(401).send({
                status: 'Error',
                message: error.message,
            });
        case 'authorization-error':
            return res.status(403).send({
                status: 'Error',
                message: error.message,
            });
        case 'downstream-error':
            return res.status(502).send({
                status: 'Error',
                message: error.message,
            });
        default:
            return res.status(500).send({
                status: 'Error',
                message: error.message,
            });
    }
}

module.exports = defaultExceptionHandler;