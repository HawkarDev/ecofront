import TextList from "@/components/Texts";
import React from "react";

const textPage = () => {
  return (
    <div>
      {" "}
      <p className="text-2xl capitalize w-auto text-center pt-40">
        Here should be Texts
      </p>
      <TextList />
    </div>
  );
};

export default textPage;
