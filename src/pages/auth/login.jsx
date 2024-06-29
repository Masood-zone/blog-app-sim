import React from "react";
import { useForm } from "react-hook-form";
import blogApi from "../../reduxApp/api";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUser } from "../../reduxApp/user.slice";
import { useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users, isLoading } = blogApi.useGetUsersQuery();
  const [showPassword, setShowPassword] = React.useState(false);
  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const response = users?.find(
        (user) => user.email === email && user.password === password
      );
      if (!response) {
        toast.error("Invalid email or password!");
        return;
      }
      toast.success("Welcome back!");
      toast.success("Login successful!");
      dispatch(setUser(response));
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.originalStatus + " " + error.error);
    }
  };
  return (
    <div className="w-96 max-[399px]:w-[300px] max-[399px]:mx-auto shadow h-auto p-5">
      <div className="my-5">
        <h1 className="text-2xl font-bold uppercase ">Blog app</h1>
        <p>Welcome back!</p>
      </div>
      <form
        className="flex flex-col items-start gap-7 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full">
          <label className="text-lg py-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            id="email"
            className={`input input-bordered w-full rounded-none ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter your email"
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>
        <div className="flex flex-col w-full ">
          <label className="text-lg py-2" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register(
                "password",
                { required: true },
                { minLength: 5 },
                { maxLength: 20 }
              )}
              id="password"
              className={`input input-bordered w-full rounded-none ${
                errors.password ? "border-red-500" : ""
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
            <button
              data-tip="View password at your own risk!"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute tooltip right-2 top-3"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          </div>
        </div>
        <div>
          Don't have an account?
          <a href="/auth/signup" className="text-base px-2">
            Sign up
          </a>
        </div>
        <button className="btn btn-square bg-black hover:bg-gray-800 text-white p-2 rounded-none w-full">
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
