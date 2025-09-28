import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay, DialogPortal } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import * as DialogPrimitive from "@radix-ui/react-dialog@1.1.6";
import { XIcon } from "lucide-react@0.487.0";
import { cn } from "./ui/utils";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (user: { id: string; name: string; email: string }) => void;
}

export function AuthModal({ open, onClose, onLogin }: AuthModalProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');
    
    if (!loginForm.email || !loginForm.password) {
      setErrors('Please fill in all fields');
      return;
    }

    // Mock authentication - in real app this would call an API
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: loginForm.email.split('@')[0],
      email: loginForm.email
    };
    
    onLogin(user);
    onClose();
    setLoginForm({ email: '', password: '' });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors('');
    
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setErrors('Please fill in all fields');
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setErrors('Passwords do not match');
      return;
    }

    if (registerForm.password.length < 6) {
      setErrors('Password must be at least 6 characters');
      return;
    }

    // Mock registration - in real app this would call an API
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name: registerForm.name,
      email: registerForm.email
    };
    
    onLogin(user);
    onClose();
    setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogPortal>
        <DialogPrimitive.Overlay
          className="fixed inset-0 z-50 bg-gradient-to-br from-purple-900/30 via-pink-800/40 to-indigo-900/30 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        />
        <DialogPrimitive.Content
          className={cn(
            "bg-gradient-to-br from-indigo-50 via-white to-purple-50 border-2 border-purple-200 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg p-6 duration-200 sm:max-w-md"
          )}
        >
          <DialogHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg p-4 -mx-6 -mt-6 mb-6">
            <DialogTitle className="text-center text-xl font-bold">🎯 Welcome to QuizMaster 🌟</DialogTitle>
          </DialogHeader>
          <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 z-50">
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-indigo-100 p-1 rounded-lg">
            <TabsTrigger value="login" className="font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">🔐 Sign In</TabsTrigger>
            <TabsTrigger value="register" className="font-bold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-teal-600 data-[state=active]:text-white">✨ Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg -mx-6 -mt-6 mb-4">
                <CardTitle className="text-white">🔐 Login</CardTitle>
                <CardDescription className="text-white/90">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    />
                  </div>
                  {errors && <p className="text-sm text-red-600">{errors}</p>}
                  <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-300">
                    Login 🚀
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="register">
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-t-lg -mx-6 -mt-6 mb-4">
                <CardTitle className="text-white">✨ Register</CardTitle>
                <CardDescription className="text-white/90">
                  Create a new account to start creating quizzes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Full Name</Label>
                    <Input
                      id="register-name"
                      placeholder="Enter your full name"
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a password"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                    />
                  </div>
                  {errors && <p className="text-sm text-red-600">{errors}</p>}
                  <Button type="submit" className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-bold py-3 shadow-lg transform hover:scale-105 transition-all duration-300">
                    Register ✨
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}