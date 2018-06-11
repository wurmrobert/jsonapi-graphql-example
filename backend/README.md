


# Development

## Setup PostgresSql

Use this link:
https://gist.github.com/lxneng/741932

to start postgres run `postgres -D /usr/local/var/postgres`

## DB Migration

cd `backend/backed`
run `dotnet ef migrations add {MigrationName}`
run `dotnet ef database update`