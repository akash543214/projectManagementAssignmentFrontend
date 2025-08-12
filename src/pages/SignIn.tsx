import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { createUser } from "@/BackendApi/authApi"; 
import { login } from "@/store/authSlice";
import { useNavigate } from "react-router";
import { loginUser } from "@/BackendApi/authApi";
type SignupFormData = {
  name: string;
  email: string;
  password: string;
};

export default function Signup() {
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
  } = useForm<SignupFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (data: SignupFormData) => {
    setError("");
    setLoading(true);

    try {
      const response = await createUser(data);
      console.log(response);

      if (!response.success) {
        setError(response.error || "Registration failed");
        return;
      }

      const {email,password} = data;
    const res =  await loginUser({email,password});
dispatch(login(res.user));     
 reset();
    } catch (error) {
      console.error("Error registering user:", error);
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col gap-6 w-full max-w-md">
        {error && <p className="text-center text-red-600">{error}</p>}

        <Card className="shadow-xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-semibold">
              Create your account
            </CardTitle>
            {serverError && (
              <p className="text-sm text-red-600 mt-1">{serverError}</p>
            )}
            <CardDescription>Sign up with your details below</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleSignup)} className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  type="text"
                  placeholder="John Doe"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
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
                  Sign Up
                </Button>
              ) : (
                <Button disabled className="w-full">
                  <Loader2Icon className="animate-spin mr-2" />
                  Signing up
                </Button>
              )}

              <div className="text-center text-sm">
                Already have an account?{" "}
                <button onClick={()=>navigate('/login')} className="underline underline-offset-4">
                  Log in
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking Sign Up, you agree to our{" "}
          <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
