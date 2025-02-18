import VoiceList from "@/components/VoiceList";
import React from "react";

const voicePage = () => {
  return (
    <div>
      {" "}
      <p className="text-2xl capitalize text-center pt-40 w-auto">
        Here should be voices
      </p>
      <VoiceList />
    </div>
  );
};

export default voicePage;
