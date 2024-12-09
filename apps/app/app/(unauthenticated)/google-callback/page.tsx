'use client';
import { Button } from "@repo/design-system/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

const GoogleCallback = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   const handleGoogleCallback = async () => {
  //     const code = router.query.code;
  //     if (code) {
  //       try {
  //         // Send the authorization code to the backend
  //         const response = await axios.post(
  //           "https://quikdb-core-beta.onrender.com/a/google-oauth-callback",
  //           { code }
  //         );
  //       } catch (error) {
  //         console.error("Error exchanging code for tokens:", error);
  //       }
  //     }
  //   };

  //   handleGoogleCallback();
  // }, [router.query]);

  return (
    <main className="min-h-screen px-20 py-7">
      <div>Loading...</div>;
      {/* when a user clicks on sign in with google send a request to the backend to
      get backend-baseurl/a/get-oauth-url */}
      {/* // 1. extract codee variable from query */}
      {/* 2. send a request to google */}
      {/* oauth callback endpoint on the backend
      (backend-baseurl/a/google-oauth-callback) */}
      {/* backend-baseurl/a/google-oauth-callback?code=<value of the code> */}
      {/* this returns a token that I will save  */}
    </main>
  );
};

export default GoogleCallback;
