import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../gql/graphql';

interface UserState {
  id: number | undefined;
  avatarUrl: string | null;
  fullname: string;
  email?: string;
  updateProfileImage: (image: string) => void;
  updateUsername: (name: string) => void;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      id: undefined,
      avatarUrl: null,
      fullname: '',
      email: undefined,
      updateProfileImage: (image) => set({ avatarUrl: image }),
      updateUsername: (name) => set({ fullname: name }),
      setUser: (user) =>
        set({
          id: user.id || undefined,
          avatarUrl: user.avatarUrl,
          fullname: user.fullname,
          email: user.email,
        }),
    }),
    {
      name: 'user-storage',
    }
  )
);
