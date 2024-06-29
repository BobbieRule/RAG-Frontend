import { ReloadIcon } from "@radix-ui/react-icons";

const Loader = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ReloadIcon className="h-8 w-8 animate-spin" />
    </div>
  );
};

export { Loader };
