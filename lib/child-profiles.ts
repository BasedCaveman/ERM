export const avatarIconIds = ['sprout', 'sun', 'bird', 'flower', 'star'] as const;
export const avatarColors = ['#256f5a', '#b95d41', '#477f95', '#d99d34', '#745b8f'] as const;

export type AvatarIconId = (typeof avatarIconIds)[number];

export type ChildProfile = {
  id: string;
  displayName: string;
  avatarIcon: AvatarIconId;
  avatarColor: string;
  createdAt: string;
};
