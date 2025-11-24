export default {
  apps: [
    {
      name: "dashboard",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "fork",
      env_file: ".env",
      env: {
        NODE_ENV: "development",
        PORT: 3006,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3006,
      },
      error_file: "./logs/pm2-error.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      min_uptime: "10s",
      max_restarts: 10,
    },
  ],
};
