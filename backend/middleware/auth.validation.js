/**
 * Authentication Validation Middleware (DEBUG VERSION)
 * Logs request bodies + validation failures
 */

const { body, validationResult } = require("express-validator");
const { ApiError } = require("./errorHandler");

// =======================
// GLOBAL TOGGLE (set false later)
// =======================
const DEBUG_VALIDATION = true;

/**
 * Handle validation errors
 * Formats validation errors into a standardized response
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (DEBUG_VALIDATION) {
    console.log("\n================ VALIDATION DEBUG =================");
    console.log("REQUEST BODY:");
    console.dir(req.body, { depth: null });

    console.log("\nRAW VALIDATION ERRORS:");
    console.dir(errors.array(), { depth: null });
    console.log("=================================================\n");
  }

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: error.param,
      message: error.msg,
      value: error.value,
      location: error.location,
    }));

    return next(new ApiError(400, "Validation failed", formattedErrors));
  }

  next();
};

// =======================
// COMMON PASSWORD REGEX
// =======================
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/;

// =======================
// REGISTRATION VALIDATION
// =======================
const validateRegistration = [
  body("name")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),

  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(STRONG_PASSWORD_REGEX)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (DEBUG_VALIDATION) {
        console.log("\nCONFIRM PASSWORD CHECK:");
        console.log("password:", req.body.password);
        console.log("confirmPassword:", value);
      }

      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  handleValidationErrors,
];

// =================
// LOGIN VALIDATION
// =================
const validateLogin = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("password").notEmpty().withMessage("Password is required"),

  body("rememberMe")
    .optional()
    .isBoolean()
    .withMessage("Remember me must be a boolean value"),

  handleValidationErrors,
];

// ============================
// PASSWORD RESET REQUEST
// ============================
const validatePasswordResetRequest = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  handleValidationErrors,
];

// =====================
// PASSWORD RESET
// =====================
const validatePasswordReset = [
  body("token").notEmpty().withMessage("Reset token is required"),

  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(STRONG_PASSWORD_REGEX)
    .withMessage(
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm password is required")
    .custom((value, { req }) => {
      if (DEBUG_VALIDATION) {
        console.log("\nRESET CONFIRM CHECK:");
        console.log("password:", req.body.password);
        console.log("confirmPassword:", value);
      }

      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  handleValidationErrors,
];

// =====================
// PASSWORD UPDATE
// =====================
const validatePasswordUpdate = [
  body("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),

  body("newPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters long")
    .matches(STRONG_PASSWORD_REGEX)
    .withMessage(
      "New password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol"
    ),

  body("confirmNewPassword")
    .trim()
    .notEmpty()
    .withMessage("Confirm new password is required")
    .custom((value, { req }) => {
      if (DEBUG_VALIDATION) {
        console.log("\nUPDATE CONFIRM CHECK:");
        console.log("newPassword:", req.body.newPassword);
        console.log("confirmNewPassword:", value);
      }

      if (value !== req.body.newPassword) {
        throw new Error("New passwords do not match");
      }
      return true;
    }),

  handleValidationErrors,
];

// ========================
// EMAIL VERIFICATION
// ========================
const validateEmailVerification = [
  body("token").notEmpty().withMessage("Verification token is required"),

  handleValidationErrors,
];

// ========================
// RESEND VERIFICATION
// ========================
const validateResendVerification = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  handleValidationErrors,
];

// =====================
// REFRESH TOKEN
// =====================
const validateRefreshToken = [
  body("refreshToken")
    .optional()
    .isString()
    .withMessage("Refresh token must be a string"),

  handleValidationErrors,
];

module.exports = {
  validateRegistration,
  validateLogin,
  validatePasswordResetRequest,
  validatePasswordReset,
  validatePasswordUpdate,
  validateEmailVerification,
  validateResendVerification,
  validateRefreshToken,
  handleValidationErrors,
};