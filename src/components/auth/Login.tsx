import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
//google
import { gapiInit, signIn } from "@/lib/google";

// Declare gapi as a global variable
declare const gapi: any;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  //google
  useEffect(() => {
    gapiInit();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, allow any login
      // In a real app, you would validate credentials
      localStorage.setItem("isAuthenticated", "true");

      toast({
        title: "Inicio de sesión exitoso",
        description: "Bienvenido a PhysioApp",
      });

      navigate("/dashboard");
    }, 1500);
  };

  //google --------------------------------------------------------------------
  const handleGoogleLogin = async () => {
    try {
      await signIn();
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      const profile = user.getBasicProfile();
      console.log("Usuario conectado con Google:", profile.getEmail());

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("googleEmail", profile.getEmail());
      toast({
        title: "Inicio con Google",
        description: `Bienvenido, ${profile.getName()}`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error al iniciar sesión con Google",
        description: String(error),
        variant: "destructive",
      });
    }
  };

  //google --------------------------------------------------------------------

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">PhysioApp</CardTitle>
            <CardDescription className="text-center">
              Inicia sesión para acceder a tu cuenta
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-2 pt-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  type="button"
                  onClick={handleGoogleLogin}
                >
                  Iniciar sesión con Google
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

{
  /* </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}; */
}

export default Login;
