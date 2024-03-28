import { Skeleton } from "@mui/material";

const Loading = () => {
  return (
    <>
      <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      <Skeleton variant="rounded" width={210} height={60} animation="wave" />
      <Skeleton variant="rounded" width={210} height={60} animation="wave" />
    </>
  );
};

export default Loading;
