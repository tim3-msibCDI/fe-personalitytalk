"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create the QueryClient instance
const queryClient = new QueryClient();

export default function LayoutDashboard({ children }) {
  const path = usePathname();

  const Login = ["/admin/login"];

  if (Login.includes(path)) {
    return children;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <section className="flex flex-1">
        <Sidebar />
        <div className="flex flex-col w-full h-full">
          <main>{children}</main>
        </div>
      </section>
    </QueryClientProvider>
  );
}
