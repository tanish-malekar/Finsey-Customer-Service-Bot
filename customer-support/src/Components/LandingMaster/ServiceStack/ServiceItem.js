import { Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: 3,
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  height: "50px",
  width: "50px",
  margin: "5px auto",
  color: theme.palette.primary.main,
}));

const ServiceItem = ({ label, Icon }) => {
  return (
    <Container>
      <Item>
        <Icon />
      </Item>
      <Typography textAlign="center" color="primary.dark">
        {label}
      </Typography>
    </Container>
  );
};

export default ServiceItem;
