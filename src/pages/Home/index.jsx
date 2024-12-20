import { useEffect, useRef, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button.jsx";
import { Formik } from "formik";
import { Icons } from "../../components/Icons.jsx";
import { useConversation } from "../../hooks/useConversation.js";
import { useAutenticate } from "../../hooks/useAutenticate.js";
import { useListenMessages } from "../../hooks/useListenMessages";
import { MessageCircle } from "lucide-react";

export function Home() {
  const [conversationMessages, setConversationMessages] = useState([]);
  const { selectedFriend, sendMessage, messages } = useConversation();
  const { user } = useAutenticate();
  const messagesEndRef = useRef(null);
  useListenMessages();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversationMessages]);

  useEffect(() => {
    const friendMessages = messages.filter(
      (message) =>
        message.messageSender === selectedFriend?._id ||
        message.messageReceiver === selectedFriend?._id
    );
    setConversationMessages(friendMessages);
  }, [messages, selectedFriend]);

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "350px",
      }}
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          {selectedFriend && (
            <h1 className="text-lg font-semibold">{selectedFriend.username}</h1>
          )}
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 overflow-y-auto">
          {conversationMessages.length > 0 ? (
            conversationMessages.map((message, index) => (
              <div key={index} className="flex flex-col gap-2 justify-end">
                <div
                  className={`rounded-lg p-3 text-right ${
                    message.messageSender === user._id
                      ? "text-base font-light bg-muted/80 self-end flex"
                      : "text-gray-50 font-light bg-zinc-400 self-start"
                  } break-all`}
                >
                  <span>{message.message}</span>
                </div>
                <span
                  className={`text-xs text-muted-foreground ${
                    message.messageSender === user._id
                      ? "self-end"
                      : "self-start"
                  }`}
                >
                  {message.sentTime ?? message.clientSendTime}
                </span>
              </div>
            ))
          ) : (
            <div className="flex w-full h-full justify-center items-center">
              <div className="flex flex-col items-center gap-1">
                <MessageCircle className="text-zinc-400" />
                <strong className="text-zinc-400 font-light">
                  Selecione um Chat ou envie uma mensagem
                </strong>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <Formik
          initialValues={{
            message: "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            if (!selectedFriend) {
              console.error("Nenhum amigo selecionado");
              setSubmitting(false);
              return;
            }

            try {
              await sendMessage(selectedFriend._id, values.message);
              resetForm();
            } catch (error) {
              console.error("Erro ao enviar mensagem:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="sticky bottom-0 flex shrink-0 items-center gap-2 bg-background p-4"
            >
              <Textarea
                className="resize-none h-2 min-h-[42px] focus:outline-none focus:ring-0"
                id="message"
                type="string"
                name="message"
                placeholder="Digite sua mensagem aqui"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !isSubmitting) {
                    e.preventDefault();

                    if (values.message) handleSubmit();
                  }
                }}
                disabled={!selectedFriend}
                required
              />
              <Button
                disabled={!selectedFriend}
                className="h-full"
                type="submit"
              >
                {isSubmitting && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enviar
              </Button>
            </form>
          )}
        </Formik>
      </SidebarInset>
    </SidebarProvider>
  );
}
