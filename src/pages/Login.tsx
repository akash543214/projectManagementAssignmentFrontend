import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { loginUser } from "@/BackendApi/authApi"
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router";

type LoginFormData = {
  email: string;
  password: string;
}

  
 export default function Login() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
        const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(data);
      console.log(response);
      if (!response.login)
       {  setError(response.error || "");

        return;
       }
      else dispatch(login(response.user));

      reset({
        email: "",
        password: "",
      });
        console.log("navigating")
      //navigate("/home");
    } catch (error) {
      console.error("Error logging in user:", error);
      setServerError(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {error && <p className="text-center text-red-600">{error}</p>}

        <Card className="shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">
              Welcome back
            </CardTitle>
            {serverError && (
              <p className="text-sm text-red-600 mt-1">{serverError}</p>
            )}
            <CardDescription>Login with your Google account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLogin)} className="grid gap-6">
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {!loading ? (
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                ) : (
                  <Button disabled className="w-full">
                    <Loader2Icon className="animate-spin mr-2" />
                    Logging in
                  </Button>
                )}

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="underline underline-offset-4">
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
