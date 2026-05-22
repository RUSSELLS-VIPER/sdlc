
import AuthBanner from '../../components/auth/AuthBanner'
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import AuthFooter from '../../components/auth/AuthFooter'

const ForgotPassword = () => {
  return (
   <div className="flex w-full min-h-screen bg-white">
    <AuthBanner/>
    <div className="w-full lg:w-1/2 lg:ml-[50%] flex flex-col min-h-screen">
    <ForgotPasswordForm/>
    <AuthFooter/>
    </div>
   </div>
  )
}

export default ForgotPassword