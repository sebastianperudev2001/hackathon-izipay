//rafce

import Chatbot from "@/components/Chatbot";
import Dashboard from "@/components/Dashboard";
import InsightAssistant from "@/components/InsightAssistant";
import React from "react";

const page = () => {
  return (
    <>
      <Dashboard>
        <DashboardDummy />
      </Dashboard>
    </>
  );
};

export default page;

const DashboardDummy = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <InsightAssistant />
      </div>
    </div>
  );
};
