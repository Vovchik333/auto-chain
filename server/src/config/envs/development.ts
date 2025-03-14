const developmentConfig = {
  api: {
    protocol: process.env.API_PROTOCOL,
    host: process.env.API_HOST,
    port: parseInt(process.env.API_PORT!)
  },
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME
  }
}

export { developmentConfig };
