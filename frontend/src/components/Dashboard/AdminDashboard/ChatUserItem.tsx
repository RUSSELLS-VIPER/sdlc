interface User {
  id: number;
  name: string;
  image: string;
  lastMessage: string;
  online: boolean;
}

interface ChatUserItemProps {
  user: User;
  isActive: boolean;
  onClick: () => void;
}

const ChatUserItem = ({
  user,
  isActive,
  onClick,
}: ChatUserItemProps) => {
  return (
    <div
      onClick={onClick}
      className={
        isActive
          ? "flex h-[56px] items-center gap-3 rounded-md border border-[#d1d1d1] px-2 shrink-0 bg-panel/30 cursor-pointer"
          : "flex h-[41px] items-center gap-3 px-2 shrink-0 cursor-pointer hover:bg-panel/20 rounded-md transition"
      }
    >
      <div className="relative h-[32px] w-[32px] shrink-0">
        <img
          src={user.image}
          alt={user.name}
          className="h-full w-full rounded-md object-cover"
        />

        {user.online && (
          <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-[#82d020]"></span>
        )}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[12px] font-medium text-[#1a1a1a]">
          {user.name}
        </p>

        <p className="truncate text-[12px] text-[#9da1ad]">
          {user.lastMessage}
        </p>
      </div>
    </div>
  );
};

export default ChatUserItem;