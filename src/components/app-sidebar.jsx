import { Command, Contact, UserRoundPlus } from "lucide-react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAutenticate } from "../hooks/auth.js";
import { useUserSession } from "../hooks/user-service.js";
import { useEffect, useState } from "react";
import { useConversation } from "../hooks/useConversation.js";
import { AddFriendModal } from "../components/AddFriendModal";
import nemlyLogo from "../images/nemly-logo-branco.svg";

const data = {
  navMain: [
    {
      title: "Amigos",
      url: "#",
      icon: Contact,
      isActive: true,
    },
    {
      title: "Add",
      url: "#",
      icon: UserRoundPlus,
      isActive: false,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const [activeItem, setActiveItem] = useState(data.navMain[0]);
  const [searchItem, setSearchItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { logout, user } = useAutenticate();
  const { getFriendlist, friends } = useUserSession();
  const { fetchMessages, setSelectedFriend, selectedFriend, resetApplication } =
    useConversation();

  const filteredFriends = searchItem
    ? friends?.filter((friend) =>
        friend?.username?.toLowerCase().includes(searchItem?.toLowerCase())
      )
    : friends || [];

  useEffect(() => {
    getFriendlist();
  }, []);

  const handleChildDialogOpen = (state) => {
    setIsDialogOpen(state);
  };

  const handleUserSelectChat = (friend) => {
    setSelectedFriend(friend);
    fetchMessages(friend._id);
  };

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img
                    src={nemlyLogo}
                    alt="Logotipo do aplicativo nemly"
                    className="h-6 w-6 p-1"
                  />
                </div>
              </a>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) =>
                  item.title === "Add" ? (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => setIsDialogOpen(true)}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ) : (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {}}
                        isActive={activeItem.title === item.title}
                        className="px-2.5 md:px-2"
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                )}
                <AddFriendModal
                  isDialogOpen={isDialogOpen}
                  handleUserDialog={handleChildDialogOpen}
                  title="Adicione seu amigo"
                  caption="Digite o número de telefone para adicionar o seu amigo"
                />
              </SidebarMenu>
            </SidebarGroupContent>
            <div
              id="mobile-chat-list"
              className="block md:hidden overflow-y-auto max-h-[350px] mt-4 border-t pt-2"
            >
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <a
                    href="#"
                    key={friend?._id}
                    className={`flex flex-col items-start gap-2 border-b p-2 text-sm leading-tight last:border-b-0 
                      ${
                        selectedFriend?._id === friend._id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserSelectChat(friend);
                    }}
                  >
                    <div className="flex w-full flex-wrap gap-2 flex-col max-w-[300px] items-start">
                      <span className="text-sm font-medium">
                        {friend?.username}
                      </span>
                      <p className="line-clamp-2 text-xs">
                        {friend?.bio || "Sem descrição"}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="flex w-full flex-wrap gap-2 flex-col max-w-[300px] items-start mt-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Nenhum chat encontrado, adicione um amigo!
                  </p>
                </div>
              )}
            </div>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser
            user={user}
            logout={logout}
            resetApplication={resetApplication}
          />
        </SidebarFooter>
      </Sidebar>
      <Sidebar
        collapsible="none"
        className="hidden md:flex flex-1"
        id="desktop-sidebar"
      >
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">Chats</div>
          </div>
          <SidebarInput
            onChange={(e) => setSearchItem(e.target.value)}
            placeholder="Pesquisar chats..."
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => (
                  <a
                    href="#"
                    key={friend?._id}
                    className={`flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 
                      ${
                        selectedFriend?._id === friend._id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleUserSelectChat(friend);
                    }}
                  >
                    <div className="flex w-full flex-wrap gap-2 flex-col items-start">
                      <span className="text-sm font-medium">
                        {friend?.username}
                      </span>
                      <p className="line-clamp-2 w-[260px] text-xs">
                        {friend?.bio}
                      </p>
                    </div>
                  </a>
                ))
              ) : (
                <div className="flex w-full flex-wrap gap-2 flex-col max-w-[300px] items-start mt-4 px-4">
                  <p className="text-muted-foreground text-center">
                    Nenhum chat encontrado, adicione um amigo!
                  </p>
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
