import { ReactNode } from "react";

export type GlobalProviderProps = {
  children: ReactNode;
};

export type GlobalContextType = {
  loadingMenu: boolean;
  loadingFeedback: boolean;
  feedbacks: Feedback[];
  menuItems: MenuData;
  allMenus: Record<string, MenuData>; // cache for all weekdays
  getMenuForDay: (
    day: string,
    forceFetch?: boolean
  ) => Promise<MenuData | null>; // fetch/cached menu for any day
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  rating: number;
};

export type MenuData = {
  BREAKFAST: MenuItem[];
  LUNCH: MenuItem[];
  DINNER: MenuItem[];
};

export type Feedback = {
  feedbackId: string;
  item: {
    itemId: string;
    name: string;
    price: number;
  };
  itemId: string;
  rating: number;
  comment: string;
  user: {
    email: string;
    name: string;
    userId: string;
  };
  userId: string;
};

export type WeekDays = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
];
