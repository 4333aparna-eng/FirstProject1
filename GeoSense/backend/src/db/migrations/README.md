# Database Migrations for GeoSense

This directory contains the migration files for the GeoSense project. Migrations are used to manage changes to the database schema over time, allowing for version control of the database structure.

## Migration Files

Each migration file should be named in a way that indicates the purpose of the migration and the date it was created. For example, a migration file for creating a new table might be named `YYYYMMDD_create_table_name.sql`.

## Running Migrations

To apply the migrations to the database, you can use the following command:

```bash
# Example command to run migrations
npx prisma migrate deploy
```

Make sure to replace `npx prisma migrate deploy` with the appropriate command for your migration tool if you are using a different one.

## Rollback Migrations

If you need to rollback a migration, you can use the following command:

```bash
# Example command to rollback the last migration
npx prisma migrate rollback
```

Again, replace this with the appropriate command for your migration tool if necessary.

## Best Practices

- Always create a backup of your database before running migrations.
- Test migrations in a development environment before applying them to production.
- Document any changes made in the migration files for future reference.