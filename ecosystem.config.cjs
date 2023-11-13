module.exports = {
  apps: [
    {
      name: 'chat',
      exec_mode: 'cluster',
      instances: 'max',
      port: '3000',
      script: './.output/server/index.mjs',
      watch: false,
      ignore_watch: ['node_modules', 'logs'],
      error_file: './logs/app-err.log',
      out_file: './logs/app-log.log',
      max_memory_restart: '1G', // 最大内存限制数，超出自动重启
      merge_logs: true, // 设置追加日志而不是新建日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss', // 指定日志文件的时间格式
      autorestart: false, // 启用/禁用应用程序崩溃或退出时自动重启，默认为true, 发生异常的情况下自动重启
      restart_delay: 3000, // 异常重启情况下，延时重启时间
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: ['43.138.180.138'],
      ref: 'origin/main',
      repo: 'git@github.com:szmxx/chat.git',
      path: '/var/www/chat',
      ssh_options: 'StrictHostKeyChecking=no',
      'pre-deploy-local': "echo 'This is a local executed command'",
      'post-deploy': 'pnpm install && pnpm run pm --env production',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
}
