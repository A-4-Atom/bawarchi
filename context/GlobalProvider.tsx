import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import axios from "axios";
import { GlobalProviderProps, GlobalContextType, Feedback, MenuData } from "@/types/types";
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
  const [loading, setLoading] = useState(false);
  const [currentDay, setCurrentDay] = useState(getCurrentDay());
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [menuItems, setMenuItems] = useState<MenuData>({} as MenuData);

  useEffect(() => {
    fetchFeedbacks();
    fetchMenu();
  }, [currentDay]);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/menu/${currentDay}`
      );
      setMenuItems(response.data);
    } catch (error: any) {
      console.error("Error fetching menu:", error.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendUrl}/api/feedback?day=${currentDay}`
      );
      setFeedbacks(response.data);
    } catch (error: any) {
      console.error("Error fetching Feedback:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{ loading, feedbacks, menuItems }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
