import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
}

const ChatInput = ({ onSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="shrink-0 px-4 sm:px-[62px] pb-[22px]">
      <div className="flex h-[50px] items-center gap-3 sm:gap-5 rounded-xl border border-[#404040] px-4 bg-white">
        
        <button
          className="text-[#4d65c9] hover:opacity-80 transition shrink-0 cursor-pointer"
          aria-label="Voice"
        >
          <img
            src="/image/icon/chat_vioce_icon.png"
            alt="vioce icon"
            className="h-[30px] w-[30px] sm:px-[25] object-contain"
          />
        </button>

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 border-0 bg-transparent text-[12px] outline-none text-black placeholder:text-gray-500"
          placeholder="Type something"
        />

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            onClick={handleSend}
            className="text-[#91de18] hover:opacity-80 transition cursor-pointer"
            aria-label="Send"
          >
            <i
              className="fa-solid fa-paper-plane text-[20px] sm:text-[22px]"
              aria-hidden="true"
            ></i>
          </button>

          <button
            aria-label="Attach image"
            className="text-black hover:opacity-70 transition cursor-pointer"
          >
            <i
              className="fa-solid fa-image text-[18px] sm:text-[20px]"
              aria-hidden="true"
            ></i>
          </button>

          <button
            aria-label="Emoji"
            className="text-black hover:opacity-70 transition cursor-pointer"
          >
            <i
              className="fa-solid fa-face-smile text-[18px] sm:text-[20px]"
              aria-hidden="true"
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;