
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import "@uploadthing/react/styles.css";


import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { TopNav } from "./_components/topnav/topnav";
import { Toaster } from "../components/ui/sonner";
import { CSPostHogProvider } from "./_analytics/provider";

export const metadata = {
  title: "InstaGallery",
  description: "A place to upload your images and share them with the world.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};


export default function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <CSPostHogProvider>
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <html lang="en" className={`${GeistSans.variable}`}>
          <body className="dark">
            <div className="h-screen grid grid-rows-[auto,1fr]">
              <TopNav />
              <main className="overflow-y-scroll">{children}</main>
            </div>
            {modal}
            <div id="modal-root" />
            <Toaster />
          </body>
        </html>
      </CSPostHogProvider>
    </ClerkProvider>
  );
}
