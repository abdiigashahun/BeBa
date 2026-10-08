"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AdminPage } from "../../components/admin/AdminPage";
import { useBeBaUser } from "../../lib/beba-auth";

const ADMIN_EMAIL = "abdigashahun0@gmail.com";

export default function AdminRoute() {
	const router = useRouter();
	const { user, isLoading, error } = useBeBaUser();
	const isAdmin = user?.role === "ADMIN" && user.email === ADMIN_EMAIL;

	useEffect(() => {
		if (!isLoading && !isAdmin) router.replace("/account");
	}, [isAdmin, isLoading, router]);

	if (isLoading) {
		return <main className="flex min-h-screen items-center justify-center bg-[#f4f1eb]" aria-busy="true">Checking access...</main>;
	}

	if (error) {
		return <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f4f1eb] px-6 text-center"><h1 className="text-xl font-semibold">Unable to verify admin access</h1><p className="max-w-md text-sm text-gray-600">{error}. Check that the backend Clerk configuration is available, then reload this page.</p></main>;
	}

	if (!isAdmin) return null;

	return <AdminPage />;
}
