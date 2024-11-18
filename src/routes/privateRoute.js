import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useLoginQuery } from "@/redux/slices/apiSlices/AuthApiSlice";
import Loader from "@/utls/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(["user"]); // initializing state
  const router = useRouter();
  const { data, isLoading } = useLoginQuery(cookies.login_token);

  useEffect(() => {
    if (!cookies.login_token) {
      setTimeout(() => {
        router.push(`/login`);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.login_token]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isLoading && !data?.user) {
    router.push(`/login`);
  }

  if (!isLoading && data?.user && data?.user?.role) {
    return <>{children}</>;
  }
};

export default PrivateRoute;
