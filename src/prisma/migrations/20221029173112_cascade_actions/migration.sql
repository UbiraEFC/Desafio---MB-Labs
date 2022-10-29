-- DropForeignKey
ALTER TABLE "usersevents" DROP CONSTRAINT "usersevents_event_id_fkey";

-- DropForeignKey
ALTER TABLE "usersevents" DROP CONSTRAINT "usersevents_user_id_fkey";

-- AddForeignKey
ALTER TABLE "usersevents" ADD CONSTRAINT "usersevents_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usersevents" ADD CONSTRAINT "usersevents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
