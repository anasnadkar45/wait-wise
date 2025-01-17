"use client"; // Ensure this runs on the client side

import React, { useEffect, useState } from "react";

const Waitlist = ({ code }: { code: string }) => {
  const [Component, setComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    try {
      // Convert the waitlist string code into an actual React component
      const DynamicComponent = new Function(
        "React",
        `return ${code}`
      )(React) as React.FC;

      setComponent(() => DynamicComponent);
    } catch (error) {
      console.error("Error rendering waitlist code:", error);
    }
  }, [code]);

  return (
    <div className="mt-6">
      {Component ? <Component /> : <p className="text-red-500">Error loading waitlist form</p>}
    </div>
  );
};

export default Waitlist;
