"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { doc, getDoc } from "firebase/firestore";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      const adminDocRef = doc(db, "admins", user.uid);
      const adminDocSnap = await getDoc(adminDocRef);

      const adminData = adminDocSnap.data();

      // Step 3: Merge Firebase Auth data and Firestore admin data
      const mergedUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        ...adminData,
      };

      // Sauvegarder les infos utiles dans localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(mergedUser)
      );
      setVisible(false);

      router.push("/dashboard"); // rediriger vers admin
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
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-4 mt-2 md:hidden ">
                  <img
                    src="/logo.png"
                    alt="Image"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold mb-4">Administration</h1>
                <p className="text-muted-foreground text-balance">
                  Connexion à l’espace de gestion des billets pour le concert à
                  Maroua.
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  type="email"
                  placeholder="username@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Mot de passe</Label>
                  <a
                    href="https://wa.me/237657120240"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
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
                  className="w-full dark:bg-primary cursor-pointer dark:hover:bg-yellow-500"
                >
                  Se connecter
                </Button>
              )}
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Bad Nova x Minks Concert
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
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
