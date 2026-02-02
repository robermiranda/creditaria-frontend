import { NavLink } from "react-router";


export function AppNavigator () {

  return (
    <nav className="border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex gap-8 px-6 py-4 max-w-7xl mx-auto">
        <NavLink 
          to="/main-form"
          className={({ isActive }) => `
            relative font-medium transition-all duration-300 text-sm
            ${isActive 
              ? 'text-purple-600 font-semibold' 
              : 'text-gray-600 hover:text-gray-900'
            }
            pb-2
            ${isActive ? 'border-b-2 border-purple-600' : 'border-b-2 border-transparent hover:border-gray-300'}
          `}
        >
          Main Form
        </NavLink>
        <NavLink 
          to="/second-form"
          className={({ isActive }) => `
            relative font-medium transition-all duration-300 text-sm
            ${isActive 
              ? 'text-purple-600 font-semibold' 
              : 'text-gray-600 hover:text-gray-900'
            }
            pb-2
            ${isActive ? 'border-b-2 border-purple-600' : 'border-b-2 border-transparent hover:border-gray-300'}
          `}
        >
          Seconf Form
        </NavLink>
      </div>
    </nav>
  );
}
