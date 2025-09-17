import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Notification from "@/components/Notification";
import QueryProvider from "@/components/QueryProvider";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const poppins = Poppins({
    variable: "--font-poppins",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Event Management System",
    description: "New Events, New Opportunities",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <AuthProvider>
                    <QueryProvider>
                        <Notification />
                        <Navbar />
                        {children}
                        <Footer />
                        <ToastContainer
                            position="bottom-right"
                            theme="dark"
                            autoClose={3000}
                        />
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
