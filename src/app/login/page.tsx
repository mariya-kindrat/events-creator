"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
    BackgroundElements,
    HeroContent,
    LoadingSpinner,
    LoginForm,
    handleFacebookSignIn,
    handleGoogleSignIn,
} from "./shared";

const LoginPage = () => {
    const { data, status } = useSession();
    const router = useRouter();
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [isFacebookLoading, setIsFacebookLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    if (status === "loading") {
        return <LoadingSpinner />;
    }

    if (status === "authenticated") {
        return <LoadingSpinner />;
    }

    const onGoogleSignIn = () => handleGoogleSignIn(setIsGoogleLoading);
    const onFacebookSignIn = () => handleFacebookSignIn(setIsFacebookLoading);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 relative overflow-hidden">
            <BackgroundElements />

            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <HeroContent />
                    <LoginForm
                        onGoogleSignIn={onGoogleSignIn}
                        onFacebookSignIn={onFacebookSignIn}
                        isGoogleLoading={isGoogleLoading}
                        isFacebookLoading={isFacebookLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
