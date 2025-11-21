import "@/styles/globals.scss";
import { Providers } from "./providers";
import BackgroundVideo from "@/components/ui/BackgroundVideo/BackgroundVideo";
import ToastProvider from "@/components/ui/ToastProvider";

export const metadata = {
    title: "Umbrella Weather",
    description: "Best weather app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body suppressHydrationWarning>
        <BackgroundVideo />
        <Providers>{children}</Providers>
        <ToastProvider />
        </body>
        </html>
    );
}
