import * as React from "react";
import {
  ArchiveX,
  Command,
  File,
  Inbox,
  Send,
  Trash2,
  Contact,
  UserRoundPlus,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { Label } from "@/components/ui/label";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import { useAutenticate } from "../hooks/auth.js";
import { useUserSession } from "../hooks/user-service.js";
import { useEffect, useState } from "react";
import { useConversation } from "../hooks/useConversation.js";
import { useListenFriendAdded } from "../hooks/useListenFriendAdded.js";

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
  const { setOpen } = useSidebar();
  const { logout, user } = useAutenticate();
  const [searchItem, setSearchItem] = useState(null);

  const { getFriendlist, friends } = useUserSession();
  const { fetchMessages, setSelectedFriend } = useConversation();
  useListenFriendAdded();

  const filteredFriends = searchItem
    ? friends?.filter((friend) =>
        friend?.username?.toLowerCase().includes(searchItem?.toLowerCase())
      )
    : friends;

  useEffect(() => {
    getFriendlist();
  }, []);

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
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0">
              <SidebarMenu>
                {data.navMain.map((item) =>
                  item.title !== "Add" ? (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item);
                          setOpen(true);
                        }}
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} logout={logout} />
        </SidebarFooter>
      </Sidebar>
      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {activeItem.title}
            </div>
          </div>
          <SidebarInput
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
            placeholder="Digite e pesquise..."
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredFriends.map((friend) => (
                <a
                  href="#"
                  key={friend?._id}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUserSelectChat(friend);
                  }}
                >
                  <div className="flex w-full flex-wrap gap-2 flex-col items-start">
                    <span className="text-sm font-medium">
                      {friend?.username}
                    </span>
                    <p className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                      {friend?.bio}
                    </p>
                  </div>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
