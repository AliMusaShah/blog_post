import type { Metadata } from "next";

import { ChatScreen } from "@/features/assistant/chat-screen";

export const metadata: Metadata = {
  title: "Assistant",
};

export default function AssistantPage() {
  return <ChatScreen />;
}
