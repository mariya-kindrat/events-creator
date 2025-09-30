"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

interface AdminCategoryEditButtonProps {
    categoryId: string;
}

const AdminCategoryEditButton = ({
    categoryId,
}: AdminCategoryEditButtonProps) => {
    const { data: session } = useSession();

    if (!session?.user.isAdmin) {
        return null;
    }

    return (
        <div className="mb-4">
            <Link
                href={`/edit/category/${categoryId}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
                <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                </svg>
                Edit Category
            </Link>
        </div>
    );
};

export default AdminCategoryEditButton;
