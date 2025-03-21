require('dotenv').config();

// here we are exporting all the env variables that our project uses
module.exports = {
    PORT: process.env.PORT || 5000,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key',
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    OTPEMAIL: process.env.OTPEMAIL,
    OTPPASSWORD: process.env.OTPPASSWORD
}