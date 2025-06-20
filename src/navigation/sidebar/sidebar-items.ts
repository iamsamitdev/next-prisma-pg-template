import {
    Home,
    Calendar,
    Users,
    LucideIcon,
    Car,
    User,
    MapPin,
    Route,
    CreditCard,
    Zap,
  } from "lucide-react";
  
  export interface NavSubItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    comingSoon?: boolean;
    newTab?: boolean;
  }
  
  export interface NavMainItem {
    title: string;
    url: string;
    icon?: LucideIcon;
    subItems?: NavSubItem[];
    comingSoon?: boolean;
    newTab?: boolean;
  }
  
  export interface NavGroup {
    id: number;
    label?: string;
    items: NavMainItem[];
  }
  
  export const sidebarItems: NavGroup[] = [
    {
      id: 1,
      label: "Dashboard",
      items: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: Home
        },
      ],
    },
    {
      id: 2,
      label: "Management",
      items: [
        {
          title: "Users",
          url: "/admin/users",
          icon: Users,
          subItems: [
            {
              title: "Standard",
              url: "/admin/users",
              icon: Users,
              newTab: false,
            },
            {
              title: "Optimized",
              url: "/admin/users/optimized",
              icon: Zap,
              newTab: false,
            },
          ],
        },
        {
          title: "Bookings",
          url: "/admin/bookings",
          icon: Calendar,
          subItems: [
            {
              title: "List",
              url: "/admin/bookings",
              icon: Calendar,
              newTab: false,
            },
            {
              title: "Create",
              url: "/admin/bookings/create",
              icon: Calendar,
              newTab: false,
            },
          ],
        },
        {
          title: "Vehicles",
          url: "/admin/vehicles",
          icon: Car,
          subItems: [
            { title: "List", url: "/admin/vehicles", newTab: false },
            { title: "Create", url: "/admin/vehicles/create", newTab: false },
          ],
        },
        {
          title: "Drivers",
          url: "/admin/drivers",
          icon: User,
          subItems: [
            { title: "List", url: "/admin/drivers", newTab: false },
            { title: "Create", url: "/admin/drivers/create", newTab: false },
          ],
        },
        {
          title: "Locations",
          url: "/admin/locations",
          icon: MapPin,
          subItems: [
            { title: "List", url: "/admin/locations", newTab: false },
            { title: "Create", url: "/admin/locations/create", newTab: false },
          ],
        },
        {
          title: "Routes",  
          url: "/admin/routes",
          icon: Route,
          subItems: [
            { title: "List", url: "/admin/routes", newTab: false },
            { title: "Create", url: "/admin/routes/create", newTab: false },
          ],
        },
        {
          title: "Trips",
          url: "/admin/trips",
          icon: MapPin,
          subItems: [
            { title: "List", url: "/admin/trips", newTab: false },
            { title: "Create", url: "/admin/trips/create", newTab: false },
          ],
        },
        {
          title: "Payments",
          url: "/admin/payments",
          icon: CreditCard,
          subItems: [
            { title: "List", url: "/admin/payments", newTab: false },
            { title: "Create", url: "/admin/payments/create", newTab: false },
          ],
        }
      ],
    },
  ];