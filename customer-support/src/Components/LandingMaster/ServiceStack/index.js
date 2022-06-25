import { Stack } from "@mui/material";
import React from "react";
import ServiceItem from "./ServiceItem";
import serviceList from "./serviceList";

const ServiceStack = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        transform: "translateY(-40%)",
      }}
    >
      {serviceList.map((service, index) => (
        <ServiceItem {...service} key={index} />
      ))}
    </Stack>
  );
};

export default ServiceStack;
