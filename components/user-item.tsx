"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUserStore, useVeltIdentify } from "@/hooks/use-user-store";
import { ChevronsLeftRight } from "lucide-react";

export const UserItem = () => {
  const { currentUser, users, setCurrentUser, logout } = useUserStore();

  // Sync current user (or guest) with Velt and handle sign-out
  useVeltIdentify();

  // Fallback UI when no user is logged in
  if (!currentUser) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          >
            <div className="gap-x-2 flex items-center min-w-[150px]">
              <Avatar className="h-5 w-5">
                <AvatarImage src="https://picsum.photos/seed/guest/200/200" />
              </Avatar>
              <span className="text-start font-medium line-clamp-1">
                Please log in
              </span>
            </div>
            <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80"
          align="start"
          alignOffset={11}
          forceMount
          style={{ zIndex: 999999 }}
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              guest@example.com
            </p>
            <div className="flex items-center gap-x-2">
              <div
                className="rounded-md p-1"
                style={{ backgroundColor: "#CCCCCC" }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/seed/guest/200/200" />
                </Avatar>
              </div>
              <div className="space-y-1">
                <p
                  className="text-sm line-clamp-1"
                  style={{ color: "#000000" }}
                >
                  Guest
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator />
          <div className="p-2">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Select a user:
            </p>
            {users.map((user) => (
              <DropdownMenuItem
                key={user.uid}
                onClick={() => setCurrentUser(user)}
                className="w-full cursor-pointer hover:bg-primary/5"
              >
                <div className="flex items-center gap-x-2">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={user.photoURL} />
                  </Avatar>
                  <span className="text-sm">{user.displayName}</span>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center min-w-[150px]">
            <Avatar className="h-5 w-5">
              <AvatarImage src={currentUser.photoURL} />
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {currentUser.displayName}&apos;s Notion
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
        style={{ zIndex: 999999 }}
      >
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {currentUser.email}
          </p>
          <div className="flex items-center gap-x-2">
            <div
              className="rounded-md p-1"
              style={{ backgroundColor: currentUser.colorCode }}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.photoURL} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p
                className="text-sm line-clamp-1"
                style={{ color: currentUser.textColor }}
              >
                {currentUser.displayName}&apos;s Notion
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <div className="p-2">
          <p className="text-xs font-medium text-muted-foreground mb-2">
            Switch user:
          </p>
          {users.map((user) => (
            <DropdownMenuItem
              key={user.uid}
              onClick={() => setCurrentUser(user)}
              className="w-full cursor-pointer hover:bg-primary/5"
              disabled={user.uid === currentUser.uid}
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={user.photoURL} />
                </Avatar>
                <span className="text-sm">{user.displayName}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="w-full cursor-pointer text-muted-foreground"
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
