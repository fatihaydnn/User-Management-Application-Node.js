const { validationResult } = require("express-validator");

class ValidationController {
    async validateRequest(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errorMessage: "Validation Error!",
                errors: errors.array(),
            });
        }
        next();
    };
}

module.exports = ValidationController;
