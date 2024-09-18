import { HeartIcon, LogOut, Settings, Book, LogIn } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "next-auth";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Preferences } from "@/types/preferences";

export function SignedInProfile({ session }: { session: Session }) {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    function handleSettingsClick() {
        setIsSettingsOpen(true);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={session?.user?.image ?? ""}
                                alt={session?.user?.name ?? "User"}
                            />
                            <AvatarFallback>
                                {session?.user?.name?.[0] ?? "U"}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                        <DropdownMenuItem onSelect={handleSettingsClick}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/history" className="flex items-center">
                            <Book className="mr-2 h-4 w-4" />
                            <span>History</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/favorites" className="flex items-center">
                            <HeartIcon className="mr-2 h-4 w-4" />
                            <span>Favorites</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="border-t"
                        onClick={() => signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {settingsTab({
                session,
                open: isSettingsOpen,
                onOpen: () => setIsSettingsOpen(false),
            })}
        </>
    );
}

export function SignedOutProfile() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    function handleSettingsClick() {
        setIsSettingsOpen(true);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src="https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
                                alt="osu!"
                            />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem asChild>
                        <button
                            className="w-full flex items-center border-b"
                            onClick={() => signIn("discord")}
                        >
                            <LogIn className="mr-2 h-4 w-4" />
                            <span>Login with Discord</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem onSelect={handleSettingsClick}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/history" className="flex items-center">
                            <Book className="mr-2 h-4 w-4" />
                            <span>History</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/favorites" className="flex items-center">
                            <HeartIcon className="mr-2 h-4 w-4" />
                            <span>Favorites</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {settingsTab({
                session: null,
                open: isSettingsOpen,
                onOpen: () => setIsSettingsOpen(false),
            })}
        </>
    );
}

function settingsTab({
    session,
    open,
    onOpen,
}: {
    session: Session | null;
    open: boolean;
    onOpen: () => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                        Manage your account settings and preferences.
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-[60vh] pr-4">
                    {session && (
                        <Tabs defaultValue="account" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">
                                    Account
                                </TabsTrigger>
                                <TabsTrigger value="preferences">
                                    Preferences
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <AccountTab session={session} />
                            </TabsContent>
                            <TabsContent value="preferences">
                                <PreferencesTab session={session} />
                            </TabsContent>
                        </Tabs>
                    )}
                    {!session && (
                        <Tabs defaultValue="preferences" className="w-full">
                            <TabsContent value="preferences">
                                <PreferencesTab session={session} />
                            </TabsContent>
                        </Tabs>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}

function AccountTab({ session }: { session: Session }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Avatar</Label>
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={session.user.image ?? ""}
                            alt="Profile picture"
                        />
                    </Avatar>
                </div>
                <div className="space-y-2">
                    <Label>Username</Label>
                    <Input value={session.user.name ?? ""} disabled />
                </div>
                <h1 className="text-sm text-muted-foreground">
                    You cannot change your name yet.
                </h1>
            </CardContent>
        </Card>
    );
}

function PreferencesTab({ session }: { session: Session | null }) {
    const { toast } = useToast();

    const [preferences, setPreferences] = useState<Preferences>({
        language: "english",
        readingView: "continuous",
        imageQuality: "high",
        autoBookmark: true,
        showNSFW: false,
    });

    const [originalPreferences, setOriginalPreferences] = useState({
        ...preferences,
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (session) {
            fetchPreferences();
            return;
        }

        setIsLoading(false);
    }, [session]);

    async function fetchPreferences() {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/user/preferences`);

            if (!response.ok) {
                throw new Error("Failed to fetch preferences");
            }

            const data: Preferences | undefined = await response.json();

            if (typeof data === "undefined") {
                return;
            }

            setPreferences(data);
            setOriginalPreferences(data);
        } catch (error) {
            console.error("Error fetching preferences:", error);
            toast({
                title: "Error",
                description: "Failed to fetch preferences.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    function handlePreferenceChange(
        key: keyof Preferences,
        value: Preferences[keyof Preferences],
    ) {
        setPreferences((prev) => ({ ...prev, [key]: value }));
    }

    function hasChanges() {
        return (
            JSON.stringify(preferences) !== JSON.stringify(originalPreferences)
        );
    }

    async function handleSave() {
        if (!session) {
            toast({
                title: "Preferences",
                description:
                    "Saved changes locally, remember to login if you want the changes to persist.",
            });
            setOriginalPreferences({ ...preferences });
            return;
        }

        try {
            const response = await fetch("/api/user/preferences", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(preferences),
            });

            if (!response.ok) {
                throw new Error("Failed to save preferences");
            }

            toast({
                title: "Preferences",
                description: "Saved changes to account.",
            });
            setOriginalPreferences({ ...preferences });
        } catch (error) {
            console.error("Error saving preferences:", error);
            toast({
                title: "Error",
                description: "Failed to save preferences. Please try again.",
                variant: "destructive",
            });
        }
    }

    if (isLoading) {
        return <div>Loading preferences...</div>;
    }

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Preferences</CardTitle>
                {session === null && (
                    <p className="text-xs text-muted-foreground">
                        Note that these changes are local as you are not logged
                        in.
                    </p>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <Label
                            htmlFor="language"
                            className="text-base font-semibold"
                        >
                            Preferred Language
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Choose the language for manga translations.
                        </p>
                    </div>
                    <Select
                        value={preferences.language}
                        onValueChange={(value) =>
                            handlePreferenceChange("language", value)
                        }
                    >
                        <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="japanese">Japanese</SelectItem>
                            <SelectItem value="turkish">Turkish</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label className="text-base font-semibold">
                            Reading View
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Select how you want pages to be displayed.
                        </p>
                    </div>
                    <RadioGroup
                        value={preferences.readingView}
                        onValueChange={(value) =>
                            handlePreferenceChange("readingView", value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">Single Page</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="continuous"
                                id="continuous"
                            />
                            <Label htmlFor="continuous">
                                Continuous Scroll
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-4">
                    <div>
                        <Label className="text-base font-semibold">
                            Image Quality
                        </Label>
                        <p className="text-sm text-muted-foreground mb-2">
                            Choose between faster loading or higher quality
                            images.
                        </p>
                    </div>
                    <RadioGroup
                        value={preferences.imageQuality}
                        onValueChange={(value) =>
                            handlePreferenceChange("imageQuality", value)
                        }
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low" />
                            <Label htmlFor="low">Low (Faster loading)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high" />
                            <Label htmlFor="high">High (Better quality)</Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="mr-2">
                            <Label
                                htmlFor="auto-bookmark"
                                className="text-base font-semibold"
                            >
                                Auto-bookmark
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Automatically save your reading progress.
                            </p>
                        </div>
                        <Switch
                            id="auto-bookmark"
                            checked={preferences.autoBookmark}
                            onCheckedChange={(value) =>
                                handlePreferenceChange("autoBookmark", value)
                            }
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="mr-2">
                            <Label
                                htmlFor="show-nsfw"
                                className="text-base font-semibold"
                            >
                                Show NSFW Content
                            </Label>
                            <p className="text-sm text-muted-foreground">
                                Display content that may be inappropriate for
                                some users.
                            </p>
                        </div>
                        <Switch
                            id="show-nsfw"
                            checked={preferences.showNSFW}
                            onCheckedChange={(value) =>
                                handlePreferenceChange("showNSFW", value)
                            }
                        />
                    </div>
                </div>
                <Button onClick={handleSave} disabled={!hasChanges()}>
                    Save Changes
                </Button>
            </CardContent>
        </Card>
    );
}
