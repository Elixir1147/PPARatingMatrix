## 必要な.envファイルの例

POSTGRES_PASSWORD=postgres

POSTGRES_USER=postgres

POSTGRES_DB=matrix

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/matrix?schema=public"

## 起動のためのコマンド
postgres 起動のために.envファイルを事前に作成する必要あり．

1. docker-compose up -d
2. npm run dev


