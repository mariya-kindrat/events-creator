import { signIn } from "next-auth/react";

/**
 * Handle Google sign-in with loading state management
 * @param setLoading - Function to set loading state
 */
export const handleGoogleSignIn = async (
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    try {
        await signIn("google");
    } catch (error) {
        console.error("Google sign-in error:", error);
    } finally {
        setLoading(false);
    }
};

/**
 * Handle Facebook sign-in with loading state management
 * @param setLoading - Function to set loading state
 */
export const handleFacebookSignIn = async (
    setLoading: (loading: boolean) => void
) => {
    setLoading(true);
    try {
        await signIn("facebook");
    } catch (error) {
        console.error("Facebook sign-in error:", error);
    } finally {
        setLoading(false);
    }
};

/**
 * Get platform statistics for display
 */
export const getPlatformStats = () => [
    {
        value: "10K+",
        label: "Happy Customers",
    },
    {
        value: "500+",
        label: "Premium Events",
    },
    {
        value: "4.9★",
        label: "Average Rating",
    },
];

/**
 * Get security features list
 */
export const getSecurityFeatures = () => [
    "End-to-end encryption",
    "No spam, ever",
    "GDPR compliant",
];
