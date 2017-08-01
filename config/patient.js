module.exports = {
  db: process.env.MONGODB || 'mongodb://localhost:27017/patient',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here'
};
