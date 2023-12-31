// const config = {
//     db: {
//       /* don't expose password or any sensitive info, done only for demo */
//       host: "localhost",
//       user: "root",
//       password: "chl0504165772",
//       database: "aclc",
//     },
//     listPerPage: 10,
  // };

  const config = {
    db: {
      /* don't expose password or any sensitive info, done only for demo */
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      port: process.env.DB_PORT
    },
    listPerPage: 10,
  };
  module.exports = config;