//rafce

import Charts from "@/components/Charts";
import Chatbot from "@/components/Chatbot";
import Dashboard from "@/components/Dashboard";

import React from "react";

const page = () => {
  return (
    <>
      <Dashboard>
        <Charts />
      </Dashboard>
      <Chatbot></Chatbot>
    </>
  );
};

export default page;
