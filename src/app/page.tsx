import { Box } from "@mui/material";
import { UperDashbord } from "@/_components/features/dashbord/UpperDashbord";

export default async function Page() {
  return (
    <>
      <UperDashbord />
      <Box sx={{ color: "blue", height: 100 }}>下の段</Box>
    </>
  );
}
