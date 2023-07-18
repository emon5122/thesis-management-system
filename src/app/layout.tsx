import "./globals.css";
import Navbar from "@/components/Header";
import Footer from "@/components/footer";
import AuthProvider from "@/context/authprovider";
import QueryProvider from "@/context/queryProvider";
import ToastProvider from "@/context/toastProvider";

export const metadata = {
    title: "Thesis Management System",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <QueryProvider>
                        <div className="h-full bg-gradient-to-r from-slate-300 to-slate-500">
                            <Navbar />
                            {children}
                        </div>
                        <ToastProvider />
                        <Footer />
                    </QueryProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
