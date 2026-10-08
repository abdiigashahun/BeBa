"use client";

import { useAuth } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type BeBaRole = "CUSTOMER" | "SELLER" | "ADMIN";

export type BeBaUser = {
	id: string;
	email?: string;
	name?: string;
	role: BeBaRole;
};

type BeBaUserContextValue = {
	user: BeBaUser | null;
	isLoading: boolean;
	error: string | null;
};

const BeBaUserContext = createContext<BeBaUserContextValue | undefined>(undefined);

function normalizeRole(value: unknown): BeBaRole {
	return value === "ADMIN" || value === "SELLER" ? value : "CUSTOMER";
}

function normalizeUser(payload: unknown): BeBaUser {
	const source = typeof payload === "object" && payload !== null ? payload as Record<string, unknown> : {};
	const data = typeof source.user === "object" && source.user !== null ? source.user as Record<string, unknown> : source;

	return {
		id: String(data.id ?? data.userId ?? ""),
		email: typeof data.email === "string" ? data.email : undefined,
		name: typeof data.name === "string" ? data.name : undefined,
		role: normalizeRole(data.role),
	};
}

export async function authenticatedFetch(
	getToken: () => Promise<string | null>,
	input: RequestInfo | URL,
	init: RequestInit = {},
) {
	const token = await getToken();
	const headers = new Headers(init.headers);
	if (token) headers.set("Authorization", `Bearer ${token}`);
	return fetch(input, { ...init, credentials: "include", headers });
}

export function BeBaUserProvider({ children }: { children: ReactNode }) {
	const { getToken, isLoaded, isSignedIn } = useAuth();
	const [state, setState] = useState<BeBaUserContextValue>({ user: null, isLoading: true, error: null });

	useEffect(() => {
		if (!isLoaded) return;
		if (!isSignedIn) {
			queueMicrotask(() => setState({ user: null, isLoading: false, error: null }));
			return;
		}

		let cancelled = false;
		queueMicrotask(() => {
			if (!cancelled) setState((current) => ({ ...current, isLoading: true, error: null }));
		});
		void authenticatedFetch(getToken, "/api/auth/me", { signal: AbortSignal.timeout(8000) })
			.then(async (response) => {
				if (!response.ok) throw new Error(`Unable to load your BeBa profile (${response.status})`);
				return normalizeUser(await response.json());
			})
			.then((user) => {
				if (!cancelled) setState({ user, isLoading: false, error: null });
			})
			.catch((error: unknown) => {
				if (!cancelled) {
					const message = error instanceof DOMException && error.name === "TimeoutError"
						? "Admin verification timed out"
						: error instanceof Error ? error.message : "Unable to load your BeBa profile";
					setState({ user: null, isLoading: false, error: message });
				}
			});

		return () => {
			cancelled = true;
		};
	}, [getToken, isLoaded, isSignedIn]);

	return <BeBaUserContext.Provider value={state}>{children}</BeBaUserContext.Provider>;
}

export function useBeBaUser() {
	const context = useContext(BeBaUserContext);
	if (!context) throw new Error("useBeBaUser must be used inside BeBaUserProvider");
	return context;
}