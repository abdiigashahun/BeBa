import { SignUp } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";

export default function SignupPage() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-[#f4f1eb] px-5 py-12">
			<SignUp path="/signup" routing="path" signInUrl="/login" appearance={{ theme: shadcn }} />
		</main>
	);
}