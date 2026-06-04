import ChatUserItem from "./ChatUserItem";

interface User {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  online: boolean;
  lastSeen: string;
}
interface ChatSidebarProps {
  users: User[];
  selectedUser: User;
  onSelectUser: (user: User) => void;
}

const ChatSidebar = ({
  users,
  selectedUser,
  onSelectUser,
}: ChatSidebarProps) => {
  return (
    <aside className="flex flex-col rounded-2xl bg-white p-2.5 h-[350px] lg:h-full min-h-0 shadow-xs">
      <label className="mb-4 flex h-[38px] items-center gap-2 rounded-md border border-[#5c5c5c] px-3 shrink-0">
        <i
          className="fa-solid fa-magnifying-glass text-[15px]"
          aria-hidden="true"
        ></i>

        <input
          className="w-full border-0 bg-transparent text-xs outline-none placeholder:text-[#9aa0ad]"
          placeholder="Search for"
        />
      </label>

      <div className="hide-scrollbar flex min-h-0 flex-col gap-[9px] overflow-y-auto pb-1">
        {users.map((user) => (
          <ChatUserItem
            key={user.id}
            user={user}
            isActive={selectedUser.id === user.id}
            onClick={() => onSelectUser(user)}
          />
        ))}
      </div>
    </aside>
  );
};

export default ChatSidebar;