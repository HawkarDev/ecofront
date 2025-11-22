import React from "react";
import Hero from "./Hero";
import { data } from "./constants";

const Home = () => {
  return (
    <>
      <Hero data={data} />
    </>
  );
};

export default Home;
