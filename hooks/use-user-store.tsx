import { create } from "zustand";
import { toast } from "sonner";
import { useIdentify, useVeltClient } from "@veltdev/react";
import { useEffect } from "react";

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  organizationId: string;
  colorCode: string;
  textColor: string;
}

const dummyUsers: User[] = [
  {
    uid: "user123",
    displayName: "John Doe",
    email: "john.doe@example.com",
    photoURL: "https://picsum.photos/seed/user123/200/200",
    organizationId: "org-456789",
    colorCode: "#4A90E2",
    textColor: "#FFFFFF",
  },
  {
    uid: "user456",
    displayName: "Jane Smith",
    email: "jane.smith@example.com",
    photoURL: "https://picsum.photos/seed/user456/200/200",
    organizationId: "org-456789",
    colorCode: "#E94E77",
    textColor: "#FFFFFF",
  },
  {
    uid: "user789",
    displayName: "Alex Johnson",
    email: "alex.johnson@example.com",
    photoURL: "https://picsum.photos/seed/user789/200/200",
    organizationId: "org-456789",
    colorCode: "#2ECC71",
    textColor: "#FFFFFF",
  },
];

interface UserStore {
  currentUser: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  logout: () => void;
}

export const useVeltIdentify = () => {
  const { currentUser } = useUserStore();
  const { client } = useVeltClient();

  const guestVeltUser = {
    userId: "guest",
    organizationId: "org-456789",
    name: "Guest",
    email: "guest@example.com",
    photoUrl: "https://picsum.photos/seed/guest/200/200",
    color: "#CCCCCC",
    textColor: "#000000",
  };

  const veltUser = currentUser
    ? {
        userId: currentUser.uid,
        organizationId: currentUser.organizationId,
        name: currentUser.displayName,
        email: currentUser.email,
        photoUrl: currentUser.photoURL,
        color: currentUser.colorCode,
        textColor: currentUser.textColor,
      }
    : guestVeltUser;

  try {
    useIdentify(veltUser, { forceReset: true });
  } catch (error) {
    console.error("Failed to identify user with Velt:", error);
    toast.error("Failed to sync user with Velt");
  }

  useEffect(() => {
    return () => {
      try {
        if (client) {
          client.signOutUser();
        }
      } catch (error) {
        console.error("Failed to sign out user from Velt:", error);
        toast.error("Failed to sign out user from Velt");
      }
    };
  }, [currentUser, client]);

  return currentUser;
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: dummyUsers[0],
  users: dummyUsers,
  setCurrentUser: (user: User) => {
    set({ currentUser: user });
    toast.success(`Switched to ${user.displayName}`);
  },
  logout: () => {
    toast.success("Logged out!");
    set({ currentUser: null });
  },
}));
