import React, { useState, useEffect } from "react";
import { AfricanMotifPattern } from "./AfricanMotifPattern";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Lock,
  Sparkles,
} from "lucide-react";

interface CheckoutWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  amount?: number;
  currency?: string;
}

export const CheckoutWidgetModal: React.FC<CheckoutWidgetModalProps> = ({
  isOpen,
  onClose,
  title = "Commande E-commerce #CMD-8921",
  amount = 15000,
  currency = "XAF",
}) => {
  const [selectedChannel, setSelectedChannel] = useState<string>("orange");
  const [phone, setPhone] = useState<string>("699001122");
  const [step, setStep] = useState<"INPUT" | "USSD_WAITING" | "SUCCESS">("INPUT");
  const [timer, setTimer] = useState<number>(60);
  const [simulatedPin, setSimulatedPin] = useState<string>("");

  useEffect(() => {
    let interval: any;
    if (step === "USSD_WAITING" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleTriggerPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("USSD_WAITING");
    setTimer(60);
  };

  const handleSimulatePinValidation = () => {
    setStep("SUCCESS");
  };

  const handleReset = () => {
    setStep("INPUT");
    setTimer(60);
    setSimulatedPin("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col">
        {/* African Heritage Header */}
        <AfricanMotifPattern className="h-2 w-full bg-[#0D1B2A]" variant="gold" />

        {/* Brand Banner */}
        <div className="bg-[#0E3B33] p-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0D1B2A] border border-[#D4AF37]/40 flex items-center justify-center font-extrabold text-sm text-[#D4AF37]">
              K
            </div>
            <div>
              <div className="text-xs font-bold tracking-wider">KUSA CHECKOUT</div>
              <div className="text-[10px] text-[#D4AF37] font-medium flex items-center space-x-1">
                <Lock className="w-2.5 h-2.5" />
                <span>Paiement 100% Sécurisé</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: PAYMENT FORM */}
        {step === "INPUT" && (
          <form onSubmit={handleTriggerPayment} className="p-5 space-y-4">
            {/* Merchant and Amount Recap */}
            <div className="text-center p-3.5 bg-[#F6F4EE] rounded-2xl border border-[#EDECE6]">
              <div className="text-xs text-gray-500 font-medium">Afritech Solutions SARL</div>
              <div className="text-2xl font-extrabold text-[#0D1B2A] font-mono mt-0.5">
                {amount.toLocaleString("fr-FR")}{" "}
                <span className="text-sm font-sans text-[#0E3B33] font-bold">
                  {currency}
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">{title}</div>
            </div>

            {/* Channels Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-2">
                Choisissez votre moyen de paiement :
              </label>

              <div className="grid grid-cols-2 gap-2">
                {/* Orange Money */}
                <button
                  type="button"
                  onClick={() => setSelectedChannel("orange")}
                  className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                    selectedChannel === "orange"
                      ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 border-orange-500">
                    {selectedChannel === "orange" && (
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">🇨🇲 Orange Money</div>
                    <div className="text-[10px] text-gray-400">USSD Direct</div>
                  </div>
                </button>

                {/* MTN MoMo */}
                <button
                  type="button"
                  onClick={() => setSelectedChannel("mtn")}
                  className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                    selectedChannel === "mtn"
                      ? "border-yellow-500 bg-yellow-50/50 ring-1 ring-yellow-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 border-yellow-500">
                    {selectedChannel === "mtn" && (
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">🇨🇲 MTN MoMo</div>
                    <div className="text-[10px] text-gray-400">USSD Direct</div>
                  </div>
                </button>

                {/* Wave */}
                <button
                  type="button"
                  onClick={() => setSelectedChannel("wave")}
                  className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                    selectedChannel === "wave"
                      ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 border-sky-500">
                    {selectedChannel === "wave" && (
                      <div className="w-2 h-2 rounded-full bg-sky-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">🇨🇮 Wave Money</div>
                    <div className="text-[10px] text-gray-400">Paiement 1-clic</div>
                  </div>
                </button>

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setSelectedChannel("card")}
                  className={`p-2.5 rounded-xl border text-left flex items-center space-x-2 transition-all ${
                    selectedChannel === "card"
                      ? "border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 border-indigo-500">
                    {selectedChannel === "card" && (
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">💳 Visa / Master</div>
                    <div className="text-[10px] text-gray-400">3D-Secure 2</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Numéro de téléphone mobile :
              </label>
              <div className="flex rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#0E3B33]">
                <span className="inline-flex items-center px-3 bg-gray-50 text-xs font-bold text-gray-600 border-r border-gray-200">
                  🇨🇲 +237
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="6 99 00 11 22"
                  className="w-full px-3 py-2 text-xs font-mono font-semibold text-gray-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#0E3B33] hover:bg-[#0D1B2A] text-[#D4AF37] font-extrabold text-xs rounded-xl shadow-kusa-gold transition-transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 uppercase tracking-wide"
            >
              <span>Payer {amount.toLocaleString("fr-FR")} {currency}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center text-[10px] text-gray-400 flex items-center justify-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4E7C6B]" />
              <span>Paiement crypté et orchestré par KUSA.cm</span>
            </div>
          </form>
        )}

        {/* STEP 2: USSD WAITING SCREEN */}
        {step === "USSD_WAITING" && (
          <div className="p-6 text-center space-y-4">
            {/* Animated Pulse Ring */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 ussd-pulse flex items-center justify-center">
                <Smartphone className="w-8 h-8 text-[#0E3B33]" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#0D1B2A]">
                Validation sur votre téléphone
              </h3>
              <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                Un message USSD a été envoyé au <strong>+237 {phone}</strong>. Saisissez votre code PIN secret pour confirmer.
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-amber-800 text-xs font-mono font-bold flex items-center justify-center space-x-2">
              <Clock className="w-4 h-4 animate-spin" />
              <span>Délai d'attente restant : {timer}s</span>
            </div>

            {/* Interactive Simulation Helper */}
            <div className="pt-2 border-t border-gray-100 space-y-2">
              <p className="text-[11px] text-gray-400">
                Mode Simulateur de test :
              </p>
              <button
                type="button"
                onClick={handleSimulatePinValidation}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simuler Saisie PIN Réussie</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: SUCCESS CONFIRMATION */}
        {step === "SUCCESS" && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="font-extrabold text-base text-[#0D1B2A]">
                Paiement Confirmé !
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Votre transaction de <strong>{amount.toLocaleString("fr-FR")} {currency}</strong> a été enregistrée avec succès.
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-left text-xs font-mono space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-400">Réf. KUSA :</span>
                <span className="font-bold text-gray-800">tx_98f1a23c</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Canal :</span>
                <span className="text-gray-800 uppercase">{selectedChannel} Mobile Money</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Statut :</span>
                <span className="text-emerald-600 font-bold">SUCCESSFUL</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 bg-[#0E3B33] hover:bg-[#0D1B2A] text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Terminer & Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
