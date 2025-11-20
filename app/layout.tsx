import "@/styles/globals.scss";
import { Providers } from "./providers";
import BackgroundVideo from "@/components/ui/BackgroundVideo/BackgroundVideo";

export const metadata = {
    title: "Umbrella Weather",
    description: "Best weather app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body suppressHydrationWarning={true}>
        <BackgroundVideo />
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
