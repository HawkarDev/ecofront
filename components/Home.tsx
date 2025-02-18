import React from "react";
import Hero from "./Hero";

import { data } from "./constants";
import { Data } from "@/typing";
type Props = {
  data: Data[]; //
};

const Home = () => {
  return (
    <>
      <Hero data={data} />
    </>
  );
};

export default Home;
