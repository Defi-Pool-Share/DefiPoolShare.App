import { defineStore } from "pinia";
import { User } from "~/lib/data/types";

type UserStoreState = {
  user: User | null;
  isOnMainnet: boolean;
};

export const useUserStore = defineStore({
  id: "user",
  state: (): UserStoreState => ({
    user: null,
    isOnMainnet: false,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setIsOnMainnet(isOnMainnet: boolean) {
      this.isOnMainnet = isOnMainnet;
    },
  },
});

export default {};
