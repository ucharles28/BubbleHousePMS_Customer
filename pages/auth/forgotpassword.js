import { useState } from 'react';
import ForgotPasswordEmail from '../../components/ForgotPasswordEmail'
import OtpVerification from '../../components/OtpVerification'
import ResetPassword from '../../components/ResetPassword'

export default function ForgotPassword() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const gotoNextStep = () => {
        setStep(step + 1)
    };

    const showAlert = (alertMessage) => {
        setAlertMessage(alertMessage)
        setOpen(true)
    }

    return (
        <div>
            {step === 0 && <ForgotPasswordEmail setEmail={setEmail} email={email} gotoNextStep={gotoNextStep} />}
            {step === 1 && <OtpVerification setOtp={setOtp} email={email} gotoNextStep={gotoNextStep} otp={otp} />}
            {step === 2 && <ResetPassword email={email} />}
        </div>
    )
}
