import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        "@media screen and (maxWidth: 600px)": { width: "100%" },
      }}
    >
      <Skeleton height={200} variant="rectangular" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </div>
  );
};
export default Loading;
