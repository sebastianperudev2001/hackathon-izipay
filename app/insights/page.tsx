//rafce

import Chatbot from "@/components/Chatbot";
import Dashboard from "@/components/Dashboard";
import InsightAssistant from "@/components/InsightAssistant";
import React from "react";

const page = () => {
  return (
    <>
      <Dashboard>
        <InsightAssistant />
      </Dashboard>
    </>
  );
};

export default page;
