import { MessageI } from "@/types/message";

export const Message = ({ msg }: { msg: MessageI }) => {
  return (
    <div className={`flex ${msg.user ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          msg.user ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        } p-3 rounded-lg max-w-sm break-words`}
      >
        {msg.text}
      </div>
    </div>
  );
};
