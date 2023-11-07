import { ReactElement } from "react";

const Loading = (): ReactElement => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="mt-4 text-center text-2xl">Loading...</h2>
    </div>
  );
};

export default Loading;
