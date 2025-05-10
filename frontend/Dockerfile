# 使用 Node.js 官方镜像
FROM node:20

# 设置容器内的工作目录
WORKDIR /app

# 拷贝依赖文件并安装依赖
COPY package*.json ./
RUN npm install

# 拷贝全部代码
COPY . .

# 构建生产版本（如果你想部署正式站）
RUN npm run build

# 启动 Next.js（开发模式请改成 npm run dev）
CMD ["npm", "run", "start"]
