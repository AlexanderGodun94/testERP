class Config {
  get server() {
    return {
      port: process.env.PORT,
      secret: process.env.SECRET,
      jwtExpiresIn: parseInt(process.env.JWT_EXPIRES_IN, 10) || 600, // 10 min
      jwtRefreshExpiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10) || 86400, // 1 day
    }
  }

  get mysql() {
    return {
      dialect: 'mysql',
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT,
    }
  }

  get loggingLevel() {
    return 'debug'
  }

  get uploadFileLimits() {
    return {
      files: 1,
      fileSize: 100000000
    }
  }

  get longStackTraces() {
    return true
  }

}

module.exports = new Config();
