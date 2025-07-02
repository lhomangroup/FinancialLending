import { Button } from "@/components/ui/button";
import { Coins, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navigationItems = [
    { label: "Simulateur", id: "calculator" },
    { label: "Comment ça marche", id: "how-it-works" },
    { label: "Support", id: "support" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex-shrink-0 flex items-center cursor-pointer">
                <Coins className="text-primary text-2xl mr-2" />
                <span className="text-xl font-bold text-gray-900">MoneyFlow</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-gray-600 hover:text-primary transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link href="/dashboard">
                    <Button variant="outline">
                      Tableau de bord
                    </Button>
                  </Link>
                  <span className="text-sm text-gray-600">
                    {user?.firstName}
                  </span>
                  <Button onClick={handleLogout} variant="ghost">
                    Déconnexion
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline">
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-primary text-white hover:bg-primary-dark">
                      Créer un compte
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="text-xl" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-gray-600 hover:text-primary transition-colors duration-200 py-2"
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  {isAuthenticated ? (
                    <>
                      <Link href="/dashboard">
                        <Button variant="outline" className="w-full">
                          Tableau de bord
                        </Button>
                      </Link>
                      <Button onClick={handleLogout} variant="ghost" className="w-full">
                        Déconnexion
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="outline" className="w-full">
                          Connexion
                        </Button>
                      </Link>
                      <Link href="/register">
                        <Button className="bg-primary text-white hover:bg-primary-dark w-full">
                          Créer un compte
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}