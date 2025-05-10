# 使用 Python 官方镜像
FROM python:3.10

# 设置工作目录
WORKDIR /app

# 拷贝依赖文件
COPY requirements.txt ./

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

# 拷贝所有源代码
COPY . .

# 启动 FastAPI 服务器
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
