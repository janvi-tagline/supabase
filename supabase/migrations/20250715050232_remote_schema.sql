create policy "Enable insert for authenticated users only"
on "storage"."buckets"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "storage"."buckets"
as permissive
for select
to public
using (true);


create policy "Enable insert for authenticated users only"
on "storage"."objects"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable insert/update/delete access for all users 10xlbfw_0"
on "storage"."objects"
as permissive
for insert
to public
with check ((bucket_id = 'user-bucket'::text));


create policy "Enable insert/update/delete access for all users 10xlbfw_1"
on "storage"."objects"
as permissive
for update
to public
using ((bucket_id = 'user-bucket'::text));


create policy "Enable insert/update/delete access for all users 10xlbfw_2"
on "storage"."objects"
as permissive
for delete
to public
using ((bucket_id = 'user-bucket'::text));


create policy "Enable read access for all users"
on "storage"."objects"
as permissive
for select
to public
using (true);



