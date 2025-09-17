"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthDebug() {
    const { data: session, status } = useSession();
    const [debugInfo, setDebugInfo] = useState<any>(null);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signIn("google", {
                redirect: false,
                callbackUrl: "/",
            });
            setDebugInfo(result);
            console.log("SignIn result:", result);
        } catch (error) {
            console.error("SignIn error:", error);
            setDebugInfo({ error: error });
        }
    };

    const testApiCall = async () => {
        try {
            const response = await fetch("/api/auth/session");
            const sessionData = await response.json();
            setDebugInfo({ apiSession: sessionData });
            console.log("API Session:", sessionData);
        } catch (error) {
            console.error("API call error:", error);
            setDebugInfo({ apiError: error });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white shadow rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">
                        NextAuth Debug Page
                    </h1>

                    {/* Session Status */}
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                            Session Status
                        </h2>
                        <p>
                            <strong>Status:</strong> {status}
                        </p>
                        {session && (
                            <div className="mt-2">
                                <p>
                                    <strong>User:</strong> {session.user?.email}
                                </p>
                                <p>
                                    <strong>Name:</strong> {session.user?.name}
                                </p>
                                <p>
                                    <strong>Image:</strong>{" "}
                                    {session.user?.image}
                                </p>
                                <p>
                                    <strong>Is Admin:</strong>{" "}
                                    {session.user?.isAdmin ? "Yes" : "No"}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Environment Variables */}
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                            Environment Check
                        </h2>
                        <p>
                            <strong>NEXTAUTH_URL:</strong>{" "}
                            {process.env.NEXTAUTH_URL || "Not set"}
                        </p>
                        <p>
                            <strong>NODE_ENV:</strong> {process.env.NODE_ENV}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mb-6 space-y-4">
                        <h2 className="text-lg font-semibold">Actions</h2>
                        <div className="space-x-4">
                            <button
                                onClick={handleGoogleSignIn}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Test Google Sign In
                            </button>
                            <button
                                onClick={testApiCall}
                                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                                Test API Session
                            </button>
                            {session && (
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Debug Info */}
                    {debugInfo && (
                        <div className="mb-6 p-4 bg-yellow-100 rounded-lg">
                            <h2 className="text-lg font-semibold mb-2">
                                Debug Information
                            </h2>
                            <pre className="text-sm overflow-auto">
                                {JSON.stringify(debugInfo, null, 2)}
                            </pre>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="p-4 bg-blue-100 rounded-lg">
                        <h2 className="text-lg font-semibold mb-2">
                            Troubleshooting Steps
                        </h2>
                        <ol className="list-decimal list-inside space-y-2 text-sm">
                            <li>
                                Check that your Google OAuth client is
                                configured with the correct redirect URI:{" "}
                                <code>
                                    http://localhost:3000/api/auth/callback/google
                                </code>
                            </li>
                            <li>
                                Clear your browser cookies and local storage
                            </li>
                            <li>
                                Make sure your .env file has NEXTAUTH_URL set to{" "}
                                <code>http://localhost:3000</code>
                            </li>
                            <li>
                                Check the browser console and server logs for
                                any errors
                            </li>
                            <li>
                                Verify that your Google OAuth client ID and
                                secret are correct
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Force dynamic rendering - prevent static generation
export const dynamic = "force-dynamic";
