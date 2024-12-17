"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@quikdb/design-system/components/ui/button";
import {
  Input,
  FormDivider,
  PasswordInput,
  FormHeader,
} from "@quikdb/design-system/components/onboarding";
import axios from "axios";
import { CryptoUtils } from "@quikdb/design-system/lib/cryptoUtils";
import { useRouter } from "next/navigation";
import { AuthClient } from "@dfinity/auth-client";

const SignUpPage = () => {
  const [seeOtherOptions, setSeeOtherOptions] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const buttonStyle =
    "w-full border-[1px] bg-transparent border-[#1F1F1F] h-[50px] text-base rounded-2xl px-6 text-white hover:text-blacko";
  const buttonTextPrefix = "Sign Up";

  const handleGoogleSignUp = async () => {
    try {
      const response = await axios.get(
        "https://quikdb-core-beta.onrender.com/a/get-oauth-url"
      );
      if (response.status === 200) {
        window.location.href = response.data.url; // Redirect to Google OAuth
      } else {
        setError("Failed to initiate Google signup. Please try again.");
      }
    } catch (err) {
      console.error("Error during Google sign-up:", err);
      setError(
        "An error occurred while initiating Google sign-up. Please try again."
      );
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok && result.status === "success") {
        setSuccess(true);
        router.push("/verify-otp");
      } else {
        setError(result.error || "Failed to sign up. Please try again.");
      }
    } catch (err: any) {
      console.error("Error during sign-up:", err);
      setError("An error occurred during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  async function loginWithInternetIdentity() {
    const authClient = await AuthClient.create();

    await authClient.login({
      identityProvider: "https://identity.ic0.app",
      onSuccess: async () => {
        const identity = authClient.getIdentity();

        const principalId = identity.getPrincipal().toText();
        
        router.push("/overview");

        console.log("Authenticated Principal:", principalId);
      },
      onError: (err) => {
        console.error("Failed to authenticate with Internet Identity:", err);
      },
    });
  }

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col w-full max-w-screen-2xl">
        <FormHeader
          title="Create an account"
          description="Enter your email to sign up for this app"
          showLogo
        />
        <main className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col w-full md:w-[680px] items-center">
            <form
              onSubmit={handleSignUp}
              className="flex flex-col gap-y-4 items-center w-full"
            >
              <Input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                placeholder="Enter Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-[#141414] h-[50px] text-lg rounded-2xl p-6 text-[#A5A5A5] hover:text-blacko"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Continue"}
              </Button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            {success && (
              <p className="text-green-500">
                Signup successful! Please check your email for OTP.
              </p>
            )}
            <FormDivider />
            <section className="flex flex-col items-center my-6 gap-y-4 w-full">
              <div className="flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4">
                <Button
                  className={buttonStyle}
                  onClick={loginWithInternetIdentity}
                >
                  {buttonTextPrefix} with internet identity
                </Button>
                <Button className={buttonStyle}>
                  {buttonTextPrefix} with one-time link
                </Button>
              </div>
              {seeOtherOptions ? (
                <div className="flex flex-col justify-between w-full md:flex-row items-center gap-y-4 md:gap-x-4">
                  <Button
                    className={buttonStyle}
                    onClick={handleGoogleSignUp}
                  >
                    Sign Up with Google
                  </Button>
                  <Button className={buttonStyle}>
                    {buttonTextPrefix} with Github
                  </Button>
                </div>
              ) : (
                <Button
                  className={buttonStyle}
                  onClick={() => setSeeOtherOptions(!seeOtherOptions)}
                >
                  See other options
                </Button>
              )}
            </section>
            <section className="flex flex-col items-center gap-y-6">
              <p className="text-sm font-light text-[#B3B4B3] text-center">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline"
                >
                  Privacy Policy
                </Link>
              </p>
              <p className="text-lg font-light text-[#B3B4B3]">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="text-gradient font-medium hover:text-white"
                >
                  Log in
                </Link>
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SignUpPage;
