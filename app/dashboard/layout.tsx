import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllPlaygroundForUser } from "@/features/dashboard/actions";
import DashboardSidebar from "@/features/dashboard/components/dashboard-sidebar";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const playgroundData: Array<any> = await getAllPlaygroundForUser() || [];

  const technologyIconMap: Record<string, string> = {
    REACT: "Zap",
    NEXTJS: "Lightbulb",
    EXPRESS: "Database",
    VUE: "Compass",
    HONO: "FlameIcon",
    ANGULAR: "Terminal",
  }

  const formattedPlaygroundData = playgroundData?.map((playground) => ({
    id: playground.id,
    name: playground.title,
    starred: playground.starmark?.[0]?.inMarked || false,
    icon: technologyIconMap[playground.template] || "Code2"
  })) || [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-x-hidden">
        <DashboardSidebar initialPlaygroundData={formattedPlaygroundData} />
        <main className="flex-1">
            <SidebarTrigger />
            {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
