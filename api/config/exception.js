/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const defaultExceptionHandler = async function (error, req, res, _next) {
    logger.error({
        application: applicationName,
        message: 'default-exception-handler ' + JSON.stringify(error.message),
        correlationId: req.headers['x-knight-correlation-id'],
    })

    switch (error.cause) {
        case 'validation-error':
            res.status(400).send({
                status: 'Error',
                message: error.message,
            });
            break;
        case 'downstream-error':
            res.status(502).send({
                status: 'Error',
                message: error.message,
            });
            break;
        default:
            res.status(500).send({
                status: 'Error',
                message: error.message,
            });
    }

    return;
}

module.exports = defaultExceptionHandler;