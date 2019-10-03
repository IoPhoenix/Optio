//routeAuthorization.js

// CONSTANTS
const TOKEN_LIFETIME = 31556926;

//JWT PACKAGES
import jwt from "jsonwebtoken";

//JWT Management Functions
/**
 * @security Validates that a token is still valid
 * @params token - jwt token from user request
 * @params secret - secret or key to decode jwt
 * @returns true if valid token, false if token not valid or missing
 * @access Public
 */
export function isRequestAuthorized(token, secret, path) {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (err) {
        console.log(
            "\x1b[31mError while decoding token - \x1b[0m",
            "\x1b[33m" + path + " - \x1b[0m",
            err.message
        );
        return false;
    }
}

/**
 * @security Creates a JWT token and returns it via callback provided
 * @params payload - the data to encrypt in jwt
 * @params res - call back function
 * @params secret - secret or key to use in encryption
 * @params expiration - lifetime to set token to - defaults to TOKEN_LIFETIME constant
 * @access Public
 */
export function createToken(payload, res, secret, expiration = TOKEN_LIFETIME) {
    // Sign token
    jwt.sign(
        payload,
        secret,
        {
            expiresIn: expiration // 1 year in seconds
        },
        (err, token) => {
            if (!err) {
                res.json({
                    status: 200,
                    token: `${token}`
                });
            } else {
                res.json({
                    status: 500,
                    error: "Unable to generate token."
                });
            }
        }
    );
}
