import { SignIn } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function LoginPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#f4f1eb] px-5 py-12">
			<SignIn path="/login" routing="path" signUpUrl="/signup" appearance={{ theme: shadcn }} />
		</main>
	);
}