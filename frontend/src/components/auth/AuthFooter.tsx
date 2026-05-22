
import { NavLink } from 'react-router-dom'

const AuthFooter = () => {
  return (
  <div
          className="w-full mt-auto flex flex-col sm:flex-row justify-between items-center px-6 sm:px-12 md:px-16 py-8 bg-white text-[9px] sm:text-[10px] text-gray-400 font-bold uppercase tracking-widest gap-4 sm:gap-0"
        >
          <div className="flex gap-6">
            <NavLink to="/privacy-policy" className="hover:text-gray-700 transition-colors"
              >Privacy Policy</NavLink>
            
            <NavLink to="/terms-condition" className="hover:text-gray-700 transition-colors">Terms</NavLink>
          </div>
          <div>
            © 2026
            <NavLink to="/" className="hover:text-gray-700 transition-colors"
              >Infinity Horizon</NavLink>
            
          </div>
        </div>
  )
}

export default AuthFooter