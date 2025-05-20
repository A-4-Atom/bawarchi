import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  GlobalProviderProps,
  GlobalContextType,
  Feedback,
  MenuData,
} from "@/types/types";
import { weekDays } from "@/constants/constants";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
const getCurrentDay = () => {
  const date = new Date();
  const day = date.getDay();

  return weekDays[day === 0 ? 6 : day - 1];
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [menuItems, setMenuItems] = useState<MenuData>({} as MenuData);
  // New: cache for all weekday menus
  const [allMenus, setAllMenus] = useState<Record<string, MenuData>>({});

  useEffect(() => {
    fetchFeedbacks();
    // Only fetch menu for currentDay if not already cached
    if (!allMenus[currentDay]) {
      fetchMenu(currentDay);
    } else {
      setMenuItems(allMenus[currentDay]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDay]);

  // Fetch and cache menu for a given day
  const fetchMenu = async (day: string) => {
    setLoadingMenu(true);
    try {
      const response = await axios.get(`${backendUrl}/api/menu/${day}`);
      setAllMenus((prev) => ({ ...prev, [day]: response.data }));
      // If fetching for currentDay, update menuItems
      if (day === currentDay) setMenuItems(response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching menu:", error.message);
      return null;
    } finally {
      setLoadingMenu(false);
    }
  };

  // Exposed function for screens to get menu for any day (uses cache)
  const getMenuForDay = async (
    day: string,
    forceFetch = false
  ): Promise<MenuData | null> => {
    if (!forceFetch && allMenus[day]) return allMenus[day];
    return await fetchMenu(day);
  };

  const fetchFeedbacks = async () => {
    setLoadingFeedback(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/feedback?day=${currentDay}&take=4`
      );
      setFeedbacks(response.data);
    } catch (error: any) {
      console.error("Error fetching Feedback:", error.message);
    } finally {
      setLoadingFeedback(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        loadingMenu,
        loadingFeedback,
        feedbacks,
        menuItems, // for currentDay (feedback etc)
        allMenus, // for menu management
        getMenuForDay, // for menu management
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
