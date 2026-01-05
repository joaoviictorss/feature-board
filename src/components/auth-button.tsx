import { authClient } from "@/lib/auth-client";
import { Loader2Icon, LogInIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const AuthButton = () => {
  const { signIn, signOut, useSession } = authClient;

  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignIn = async () => {
    signIn.social({
      provider: "github",
      callbackURL: `/`,
    });
  };

  const handleSignOut = async () => {
    signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center">
        <Loader2Icon className="size-3.5 text-navy-200 animate-spin" />
      </div>
    );
  }

  if (session?.user) {
    return (
      <button
        type="button"
        className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
        onClick={handleSignOut}
      >
        <Image
          src={session.user.image ?? ""}
          alt={session.user.name}
          width={32}
          height={32}
          className="object-cover"
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="size-8 rounded-full bg-navy-700 border-[0.5px] border-navy-500 flex items-center justify-center hover:bg-navy-600 transition-colors duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-navy-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      onClick={handleSignIn}
    >
      <LogInIcon className="size-3.5 text-navy-200" />
    </button>
  );
};
