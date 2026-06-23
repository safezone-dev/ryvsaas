import { supabase } from "@/lib/supabase";
import UserHeader from "@/components/UserHeader";
import UsersTable from "@/components/UsersTable";

async function getUsers() {
  const { data } = await supabase
    .from("users")
    .select("*")
    .order("full_name");

  return data || [];
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <UserHeader />

      {/* TABLA */}

        <UsersTable users={users} />

        </div>
  );
}