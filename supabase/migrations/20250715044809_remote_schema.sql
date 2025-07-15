

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_trgm" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."book_request_sattus" AS ENUM (
    'pending',
    'approve'
);


ALTER TYPE "public"."book_request_sattus" OWNER TO "postgres";


CREATE TYPE "public"."mood" AS ENUM (
    'sad',
    'happy',
    'excited'
);


ALTER TYPE "public"."mood" OWNER TO "postgres";


CREATE TYPE "public"."user_role" AS ENUM (
    'admin',
    'user'
);


ALTER TYPE "public"."user_role" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."books" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" "text",
    "author" character varying,
    "quantity" bigint,
    "available" bigint,
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "fts" "tsvector" GENERATED ALWAYS AS ("to_tsvector"('"english"'::"regconfig", COALESCE("title", ''::"text"))) STORED
);


ALTER TABLE "public"."books" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."search_books_by_title"("search_text" "text") RETURNS SETOF "public"."books"
    LANGUAGE "plpgsql"
    AS $$-- begin


begin
   RETURN QUERY
  SELECT *
  FROM books
  WHERE
    (
      similarity(title, search_text) > 0.1
      OR title ILIKE '%' || search_text || '%'
      OR fts @@ to_tsquery('english', replace(search_text, ' ', ' & '))
    )
  ORDER BY
    GREATEST(
      similarity(title, search_text),
      ts_rank(fts, to_tsquery('english', replace(search_text, ' ', ' & ')))
    ) DESC;
end$$;


ALTER FUNCTION "public"."search_books_by_title"("search_text" "text") OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."book_requests" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "book_id" "uuid",
    "user_id" "uuid",
    "borrowed_at" "date" DEFAULT '2025-07-11'::"date",
    "returned_at" "date",
    "status" "public"."book_request_sattus",
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL
);


ALTER TABLE "public"."book_requests" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "firstname" character varying NOT NULL,
    "lastname" character varying NOT NULL,
    "last_logged_in" "date",
    "email" "text",
    "profile_url" "text",
    "role" "public"."user_role"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


ALTER TABLE ONLY "public"."book_requests"
    ADD CONSTRAINT "book_requests_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."books"
    ADD CONSTRAINT "books_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



CREATE INDEX "books_title_trgm_idx" ON "public"."books" USING "gin" ("title" "extensions"."gin_trgm_ops");



ALTER TABLE ONLY "public"."book_requests"
    ADD CONSTRAINT "borrow_records_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."books"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."book_requests"
    ADD CONSTRAINT "borrow_records_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";






















































































































































































































































GRANT ALL ON TABLE "public"."books" TO "anon";
GRANT ALL ON TABLE "public"."books" TO "authenticated";
GRANT ALL ON TABLE "public"."books" TO "service_role";



GRANT ALL ON FUNCTION "public"."search_books_by_title"("search_text" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."search_books_by_title"("search_text" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."search_books_by_title"("search_text" "text") TO "service_role";


















GRANT ALL ON TABLE "public"."book_requests" TO "anon";
GRANT ALL ON TABLE "public"."book_requests" TO "authenticated";
GRANT ALL ON TABLE "public"."book_requests" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";






























RESET ALL;
