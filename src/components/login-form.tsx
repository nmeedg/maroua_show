"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";

export function AdduserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");
  const [visible, setVisible] = useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setVisible(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Sauvegarder les infos utiles dans localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          accessToken: await user.getIdToken(), // si besoin
        })
      );
      setVisible(false);

      router.push("/admin"); // rediriger vers admin
    } catch (err: any) {
      toast.error(err.message);
      setVisible(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={handleLogin} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="m@yahoo.fr"
                  required
                  
                />
              </div>
              <div className="grid gap-3">
                <label>Nom utilisateur</label>
                <Input
                  type="name"
                  placeholder="tech manager"
                  required
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                </div>
                <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  required
                />
              </div>
              {visible ? (
                <Button disabled>
                  <Loader2Icon className="animate-spin" />
                  En cours
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full dark:bg-yellow-400 cursor-pointer dark:hover:bg-yellow-500"
                >
                  Se connecter
                </Button>
              )}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Bad Nova x Minks
                </span>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block overflow-hidden">
            <div className=" bg-neutral-950 inset-0 h-full w-full flex justify-center items-center ">
              <img
                src="/logo.png"
                alt="Image"
                className="absolute scale-75 object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
