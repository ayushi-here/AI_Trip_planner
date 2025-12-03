"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

export default function SelectDaysUI({ onSelectedOption }: any) {
  const [days, setDays] = useState(3);

  const incrementDays = () => {
    setDays((prev) => prev + 1);
  };

  const decrementDays = () => {
    setDays((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleConfirm = () => {
    onSelectedOption(`${days} days`);
  };

  return (
    <div className="mt-4 p-4 bg-white rounded-xl shadow-md w-full max-w-md">
      <h3 className="text-lg font-semibold text-gray-800 text-center">
        How many days do you want to travel?
      </h3>

      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          onClick={decrementDays}
          className="h-10 w-10 flex items-center justify-center"
        >
          <Minus className="h-5 w-5" />
        </Button>

        <p className="text-xl font-semibold">{days} Days</p>

        <Button
          variant="outline"
          onClick={incrementDays}
          className="h-10 w-10 flex items-center justify-center"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex justify-center mt-4">
        <Button className="px-6 py-2" onClick={handleConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
