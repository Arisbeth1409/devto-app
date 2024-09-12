import { useUser } from "@/hooks";

import Avatar from "./Avatar";

export default function UserComponent() {
  const { user } = useUser();

  return (
    <div>
      <Avatar user={user} />
    </div>
  );
}
