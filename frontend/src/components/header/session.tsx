import { useSession } from "next-auth/react";
import { SignedInProfile, SignedOutProfile } from "./profile";

export default function SessionButton() {
    const { data: session } = useSession();

    return session ? (
        <SignedInProfile session={session} />
    ) : (
        <SignedOutProfile />
    );
}
