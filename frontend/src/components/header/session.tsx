import { useSession } from "next-auth/react";
import { SignedInProfile, SignedOutProfile } from "./profile";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function SessionButton() {
    const { data: session } = useSession();

    console.log(session);

    return session ? (
        <SignedInProfile session={session} />
    ) : (
        <SignedOutProfile />
    );
}
