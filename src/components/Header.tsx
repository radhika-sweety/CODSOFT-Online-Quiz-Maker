import { Button } from "./ui/button";
import { User, LogOut, Home, Plus, List } from "lucide-react@0.487.0";

interface HeaderProps {
  currentUser: { id: string; name: string; email: string } | null;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onShowAuth: () => void;
}

export function Header({ currentUser, currentPage, onNavigate, onLogout, onShowAuth }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 border-b-4 border-yellow-400 px-4 py-4 sticky top-0 z-50 shadow-xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold text-white drop-shadow-lg">🎯 QuizMaster ✨</h1>
          
          {currentUser && (
            <nav className="flex items-center space-x-2">
              <Button
                variant={currentPage === 'home' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('home')}
                className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                  currentPage === 'home' 
                    ? 'bg-yellow-400 text-purple-900 hover:bg-yellow-300 shadow-lg scale-105' 
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">🏠 Home</span>
              </Button>
              
              <Button
                variant={currentPage === 'create' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('create')}
                className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                  currentPage === 'create' 
                    ? 'bg-yellow-400 text-purple-900 hover:bg-yellow-300 shadow-lg scale-105' 
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">➕ Create</span>
              </Button>
              
              <Button
                variant={currentPage === 'browse' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onNavigate('browse')}
                className={`flex items-center space-x-2 font-medium transition-all duration-300 ${
                  currentPage === 'browse' 
                    ? 'bg-yellow-400 text-purple-900 hover:bg-yellow-300 shadow-lg scale-105' 
                    : 'text-white hover:bg-white/20 hover:scale-105'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="hidden sm:inline">📚 Browse</span>
              </Button>
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-2 rounded-full backdrop-blur-sm">
                <User className="w-4 h-4 text-white" />
                <span className="hidden sm:inline text-sm font-medium text-white">
                  👋 {currentUser.name}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onLogout}
                className="flex items-center space-x-2 bg-white/20 border-white/30 text-white hover:bg-white/30 font-medium transition-all duration-300 hover:scale-105"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">🚪 Logout</span>
              </Button>
            </div>
          ) : (
            <Button 
              onClick={onShowAuth}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-purple-900 font-bold px-6 py-2 rounded-full shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse"
            >
              🌟 Sign In / Register 🌟
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}