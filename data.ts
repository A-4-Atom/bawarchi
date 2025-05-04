export interface MenuItem {
  name: string;
  description: string;
  tags: string[];
  rating: number;
}

export interface MenuData {
  breakfast: MenuItem[];
  lunch: MenuItem[];
  dinner: MenuItem[];
}

export const menuData: MenuData = {
  breakfast: [
    {
      name: "Oatmeal",
      description: "Served with fresh fruits and honey",
      tags: ["Vegetarian", "Healthy"],
      rating: 4.2,
    },
    {
      name: "Eggs and Toast",
      description: "Scrambled eggs with whole wheat toast",
      tags: ["Protein", "Popular"],
      rating: 4.5,
    },
  ],
  lunch: [
    {
      name: "Grilled Chicken Salad",
      description: "Chicken breast with mixed greens and vinaigrette",
      tags: ["Healthy", "Protein"],
      rating: 4.3,
    },
    {
      name: "Paneer Wrap",
      description: "Paneer tikka wrapped in whole wheat roti",
      tags: ["Vegetarian", "Popular"],
      rating: 4.7,
    },
  ],
  dinner: [
    {
      name: "Dal Tadka",
      description: "Yellow lentils tempered with spices, served with rice",
      tags: ["Vegetarian", "Healthy"],
      rating: 4.4,
    },
    {
      name: "Chicken Curry",
      description: "Spicy chicken curry with steamed rice",
      tags: ["Protein", "Popular"],
      rating: 4.8,
    },
  ],
};
