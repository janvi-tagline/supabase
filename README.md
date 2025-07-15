Supabase Demo
Supabase Database Password
To find or reset your Supabase database password:
Go to Settings → Database Settings → Database Password → Reset Database Password

========================================
To find your Supabase connection details:
Go to Database → Connect → Psql → Pooler
Supabase Dump Command
Use the following command to export (dump) your Supabase database:
 PGPASSWORD="your_password" pg_dump \
  -h aws-0-ap-south-1.pooler.supabase.com \
  -p 6543 \
  -d postgres \
  -U postgres.efbgbclvwjjwluvoprfj \
  -F c \
  -f ~/Documents/backup2.sql

Supabase Restore Command
Use the following command to restore (import) a .dump file into Supabase:
PGPASSWORD="your_password" pg_restore \
  -h aws-0-ap-south-1.pooler.supabase.com \
  -p 6543 \
  -U postgres.icvocmvfjciypdoeclmz \
  -d postgres \
  -F c \
  ~/Documents/backup2.dump
========================================

Enable Extensions (like pg_trgm)
To enable extensions in Supabase:
Go to Database → Extensions in the left sidebar
pg_trgm – for fuzzy search

SUPABASE CLI.
supabase login 
supabase init
supabase start