import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RegisterForm from "../../components/auth/RegisterForm";
import VerificationStep from "../../components/auth/VerificationStep";
import StoreDetailsModal from "../../components/auth/StoreDetailsModal";
import PaymentConfigModal from "../../components/auth/PaymentConfigModal";
import AuthBackground from "../../components/auth/AuthBackground";
import AuthCard from "../../components/auth/AuthCard";

function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState("form");
    const [formData, setFormData] = useState({
        businessName: "",
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [storeDetails, setStoreDetails] = useState({
        storeName: "",
        storeAddress: "",
    });

    const [paymentConfig, setPaymentConfig] = useState({
        upiId: "",
        cardProcessor: "",
    });

    const [verifiedFields, setVerifiedFields] = useState({
        email: false,
        phone: false,
    });

    const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

    const handleSubmit = () => {
        setStep("verify");
    };

    const handleVerify = async (field, otp) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVerifiedFields((prev) => ({ ...prev, [field]: true }));

        if (verifiedFields[field === "email" ? "phone" : "email"]) {
            toast.success("Registration successful!");
            navigate("/login");
        } else {
            toast.success(`${field} verified successfully`);
        }
    };

    return (
        <div className="min-h-screen flex relative">
            <AuthBackground />

            <div className="relative w-full flex">
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12">
                    <div className="max-w-md text-white text-center">
                        <div className="mb-8">
                            <svg
                                className="w-32 h-32 mx-auto text-white/90"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19 8H5C3.89 8 3 8.89 3 10V16H5V10H19V16H21V10C21 8.89 20.11 8 19 8ZM19 4H5C3.89 4 3 4.89 3 6H21C21 4.89 20.11 4 19 4ZM19 18H5C3.89 18 3 18.89 3 20H21C21 18.89 20.11 18 19 18Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </div>
                        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
                            Transform Your Business
                        </h1>
                        <div className="space-y-4">
                            <p className="text-2xl font-medium text-primary-200">
                                Join POS Manager Today
                            </p>
                            <p className="text-lg text-primary-300/80">
                                Experience seamless POS management with advanced
                                features designed for modern businesses
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Panel - Register Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <AuthCard>
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">
                                Get Started
                            </h2>
                            <p className="mt-2 text-lg text-primary-600 font-medium">
                                Register for the Best POS Experience
                            </p>
                            <p className="mt-1 text-sm text-gray-600">
                                Join thousands of businesses already using our
                                platform
                            </p>
                        </div>

                        {step === "verify" ? (
                            <VerificationStep
                                email={formData.email}
                                phone={formData.phone}
                                verifiedFields={verifiedFields}
                                onVerify={handleVerify}
                                onBack={() => setStep("form")}
                            />
                        ) : (
                            <RegisterForm
                                formData={formData}
                                storeDetails={storeDetails}
                                paymentConfig={paymentConfig}
                                onSubmit={handleSubmit}
                                onOpenStoreModal={() =>
                                    setIsStoreModalOpen(true)
                                }
                                onOpenPaymentModal={() =>
                                    setIsPaymentModalOpen(true)
                                }
                                setFormData={setFormData}
                            />
                        )}
                    </AuthCard>
                </div>
            </div>

            <StoreDetailsModal
                isOpen={isStoreModalOpen}
                onClose={() => setIsStoreModalOpen(false)}
                storeDetails={storeDetails}
                onSave={setStoreDetails}
            />

            <PaymentConfigModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                paymentConfig={paymentConfig}
                onSave={setPaymentConfig}
            />
        </div>
    );
}

export default Register;
