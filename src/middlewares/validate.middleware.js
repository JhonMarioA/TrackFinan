const sendValidationError = (res, err) => {
    return res.status(400).json({
        message: "validation error",
        errors: err.issues || err.errors || [],
    });
};

const validate = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    } catch (err) {
        return sendValidationError(res, err);
    }
};

const validateParams = (schema) => (req, res, next) => {
    try {
        req.params = schema.parse(req.params);
        next();
    } catch (err) {
        return sendValidationError(res, err);
    }
};

const validateQuery = (schema) => (req, res, next) => {
    try {
        req.query = schema.parse(req.query);
        next();
    } catch (err) {
        return sendValidationError(res, err);
    }
};

module.exports = {
    validate,
    validateParams,
    validateQuery,
};

