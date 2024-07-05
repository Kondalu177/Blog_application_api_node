const {
  PORT,
  CONNECTION_URL,
  JWT_SECRET_KEY,
  SENDER_EMAIL,
  SENDER_EMAIL_PASSWORD,
} = process.env;

module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtsecretkey: JWT_SECRET_KEY,
  senderemail: SENDER_EMAIL,
  sendermailPassword: SENDER_EMAIL_PASSWORD,
};
