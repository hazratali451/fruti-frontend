import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useLoginQuery } from "@/redux/slices/apiSlices/AuthApiSlice";
import Loader from "@/utls/Loader/Loader";

const FreeRoute = ({ children }) => {
  const [cookies] = useCookies(["user"]); // initializing state
  const router = useRouter();
  const { data, isLoading } = useLoginQuery(cookies.login_token);

  if (!cookies.login_token) {
    return children;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !data?.user) {
    {
      children;
    }
  }

  if (!isLoading && data?.user && data?.user?.role) {
    router.push(`/dashboard`);
  }
};

export default FreeRoute;
