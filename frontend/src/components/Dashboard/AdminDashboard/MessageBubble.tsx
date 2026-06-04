interface Message {
  id: number;
  sender: "user" | "admin";
  text: string;
  time: string;
  image: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.sender === "user") {
    return (
      <div className="flex flex-col items-start max-w-[85%] sm:max-w-[70%]">
        <div className="rounded-xl bg-[#d5d5d5] px-4 sm:px-6 py-3 text-[12px] leading-6 text-black">
          {message.text}
        </div>

        <div className="mt-2 flex items-center gap-2 pl-2">
          <img
            src={message.image}
            alt="User"
            className="h-5 w-5 rounded-md object-cover"
          />

          <p className="text-[11px] text-[#666]">
            {message.time}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end max-w-[85%] sm:max-w-[70%] self-end">
      <div className="rounded-xl bg-sidebar px-4 sm:px-6 py-3 text-[12px] leading-6 text-white text-left">
        {message.text}
      </div>

      <div className="mt-2 flex items-center gap-2 pr-2 justify-end w-full">
        <p className="text-[11px] text-[#666]">
          {message.time}
        </p>

        <img
          src={message.image}
          alt="Admin"
          className="h-5 w-5 rounded-md object-cover"
        />
      </div>
    </div>
  );
};

export default MessageBubble;