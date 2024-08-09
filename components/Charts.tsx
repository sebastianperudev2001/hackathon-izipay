"use client";
import React from "react";
import BarChartPlot from "./recharts/BarChartPlot";
import PieChartPlot from "./recharts/PieChartPlot";

const Charts = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {/* First section */}
        <div className="flex gap-2">
          <div className="flex-1 h-21 w-full rounded-lg bg-gray-100 dark:bg-neutral-800">
            <div className="p-2">
              <p className="text-gray-900 dark:text-white font-bold">
                Ventas totales semanales
              </p>
              <p className="py-1 font-bold">$30,000</p>
            </div>
          </div>
          <div className="flex-1 h-21 w-full rounded-lg bg-gray-100 dark:bg-neutral-800">
            <div className="p-2">
              <p className="text-gray-900 dark:text-white font-bold">
                Comisiones totales semanales
              </p>
              <p className="py-1 font-bold">$30,000</p>
            </div>
          </div>
          <div className="flex-1 h-21 w-full rounded-lg bg-gray-100 dark:bg-neutral-800">
            <div className="p-2">
              <p className="text-gray-900 dark:text-white font-bold">
                Ventas totales diarias
              </p>
              <p className="py-1 font-bold">$30,000</p>
            </div>
          </div>
          <div className="flex-1 h-21 w-full rounded-lg bg-gray-100 dark:bg-neutral-800">
            <div className="p-2">
              <p className="text-gray-900 dark:text-white font-bold">
                Comisiones totales diarias
              </p>
              <p className="py-1 font-bold">$30,000</p>
            </div>
          </div>
        </div>

        {/* Second section */}
        <div className="flex gap-2 flex-1">
          <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
          <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-neutral-800">
            <BarChartPlot />
          </div>
        </div>

        {/* Third section */}
        <div className="flex gap-2">
          <div className="w-1/3 h-[280px] rounded-lg bg-gray-100 dark:bg-neutral-800">
            <PieChartPlot />
          </div>
          <div className="w-1/3 h-[280px] rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
          <div className="w-1/3 h-[280px] rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
