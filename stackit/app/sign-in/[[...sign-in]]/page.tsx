"use client";

import { useSearchParams } from "next/navigation";
import { SignIn, SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function SignInSignUpPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // get ?mode=signup

  const isSignUp = mode === "signup";

  return (
    <div className="flex items-center justify-center bg-zinc-200 h-screen w-full p-10">
      <div className="hero h-[90vh] w-[90%] m-auto flex items-center justify-center border-1 rounded-3xl overflow-hidden">
        {/* Left Side Image */}
        <div className="relative h-full w-1/2 flex bg-center bg-cover bg-no-repeat overflow-hidden rounded-2xl">
          <Image
            src="/images/illustration-1.jpg"
            alt="StackIt"
            width={550}
            height={450}
            priority
            style={{
              objectFit: "cover",
              position: "absolute",
              top: "-24em",
              left: "0",
              borderTopLeftRadius: "3em",
            }}
          />
        </div>

        {/* Right Side Auth Form */}
        <div className="h-full w-1/2 flex items-center justify-center bg-[#E8ECE6]">
          {isSignUp ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </div>
  );
}
