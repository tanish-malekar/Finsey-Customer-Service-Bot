import { Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const MainPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "20px",
  width: "80%",
  height: "100%",
  margin: "auto",
}));

export default MainPaper;
