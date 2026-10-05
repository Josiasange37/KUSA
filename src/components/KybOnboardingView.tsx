import React, { useState } from "react";
import {
  ShieldCheck,
  Building2,
  FileText,
  UserCheck,
  CreditCard,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Eye,
  FileCheck,
} from "lucide-react";

interface KybOnboardingViewProps {
  kybApproved: boolean;
  setKybApproved: (approved: boolean) => void;
  kybStep: number;
  setKybStep: (step: number) => void;
  onKybValidatedSuccess: () => void;
}

export const KybOnboardingView: React.FC<KybOnboardingViewProps> = ({
  kybApproved,
  setKybApproved,
  kybStep,
  setKybStep,
  onKybValidatedSuccess,
}) => {
  const [formData, setFormData] = useState({
    legalName: "Afritech Solutions SARL",
    tradeName: "Afritech Pay",
    legalForm: "SARL",
    rccm: "RC/DLA/2024/B/1842",
    niu: "M052418920194P",
    country: "CM",
    address: "Akwa, Boulevard de la Liberté, Douala",
    repName: "Kwame Nkrumah Tchakounte",
    repRole: "Gérant Associé Unique",
    repNationality: "Camerounaise",
    payoutBank: "Ecobank Cameroun",
    payoutIban: "CM21 1002 5000 1234 5678 9012 345",
  });

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: boolean }>({
    rccmDoc: true,
    niuDoc: true,
    statutesDoc: true,
    cniDoc: true,
    ribDoc: true,
  });

  const [isSimulatingReview, setIsSimulatingReview] = useState(false);

  const handleNext = () => {
    if (kybStep < 4) {
      setKybStep(kybStep + 1);
    }
  };

  const handlePrev = () => {
    if (kybStep > 1) {
      setKybStep(kybStep - 1);
    }
  };

  const handleSimulateApproval = () => {
    setIsSimulatingReview(true);
    setTimeout(() => {
      setIsSimulatingReview(false);
      setKybApproved(true);
      onKybValidatedSuccess();
    }, 1800);
  };

  const steps = [
    { num: 1, title: "Identité Entreprise", icon: Building2 },
    { num: 2, title: "Documents Légaux", icon: FileText },
    { num: 3, title: "Dirigeant & CNI", icon: UserCheck },
    { num: 4, title: "Compte Règlement", icon: CreditCard },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <span
              className={`p-2.5 rounded-xl shadow-2xs ${
                kybApproved
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-[#0B3E33] text-[#DBAE40]"
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl font-jura font-bold text-[#0B3E33]">
                Conformité & Validation KYB Entreprise
              </h1>
              <p className="text-xs text-[#78848A]">
                Activez vos encaissements en mode Production sur les 12 pays (Exigences réglementaires BEAC / BCEAO).
              </p>
            </div>
          </div>
        </div>

        <div>
          {kybApproved ? (
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-jura font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-600" />
              Compte Validé en Production
            </span>
          ) : (
            <div className="flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-jura font-semibold bg-[#F6F4EE] text-[#0B3E33] border border-[#E3E5E2]">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-[#DBAE40]" />
                Étape {kybStep} sur 4
              </span>
              <button
                onClick={handleSimulateApproval}
                disabled={isSimulatingReview}
                className="px-4 py-2 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DBAE40]" />
                <span>
                  {isSimulatingReview
                    ? "Audit KUSA en cours..."
                    : "Simuler Approbation KYB"}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Stepper Wizard Bar */}
      <div className="bg-white p-3 rounded-2xl border border-[#E3E5E2] shadow-2xs">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s) => {
            const Icon = s.icon;
            const isDone = kybApproved || s.num < kybStep;
            const isCurrent = !kybApproved && s.num === kybStep;

            return (
              <button
                key={s.num}
                onClick={() => setKybStep(s.num)}
                className={`flex flex-col sm:flex-row items-center sm:space-x-3 p-2.5 rounded-xl transition-all text-left font-jura ${
                  isCurrent
                    ? "bg-[#0B3E33] text-white shadow-xs font-bold"
                    : isDone
                    ? "bg-[#F6F4EE] text-[#0B3E33] hover:bg-[#EAE8E0] font-semibold"
                    : "text-[#78848A] hover:bg-[#F6F4EE]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? "bg-[#DBAE40] text-[#101E29]"
                      : isDone
                      ? "bg-[#0B3E33] text-[#DBAE40]"
                      : "bg-[#EAE8E0] text-[#78848A]"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <div className="text-center sm:text-left mt-1 sm:mt-0">
                  <div className="text-xs font-bold leading-tight">{s.title}</div>
                  <div className="text-[10px] opacity-75 hidden sm:block">
                    {isDone ? "Complété" : isCurrent ? "En cours" : "À venir"}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Content by Step */}
      <div className="bg-white p-6 rounded-2xl border border-[#E3E5E2] shadow-2xs space-y-6">
        {/* STEP 1 */}
        {kybStep === 1 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#0D1B2A]">
                Étape 1 : Identité Légale de la Société
              </h2>
              <p className="text-xs text-gray-500">
                Informations enregistrées au Registre du Commerce et du Crédit Mobilier (RCCM).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Raison Sociale (Nom légal)
                </label>
                <input
                  type="text"
                  value={formData.legalName}
                  onChange={(e) =>
                    setFormData({ ...formData, legalName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Forme Juridique
                </label>
                <select
                  value={formData.legalForm}
                  onChange={(e) =>
                    setFormData({ ...formData, legalForm: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33] bg-white"
                >
                  <option value="SARL">SARL (Société à Responsabilité Limitée)</option>
                  <option value="SA">SA (Société Anonyme)</option>
                  <option value="SAS">SAS (Société par Actions Simplifiée)</option>
                  <option value="ETS">ETS (Entreprise Individuelle enregistrée)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Numéro RCCM
                </label>
                <input
                  type="text"
                  value={formData.rccm}
                  onChange={(e) =>
                    setFormData({ ...formData, rccm: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Numéro d'Identifiant Unique (NIU / NIF)
                </label>
                <input
                  type="text"
                  value={formData.niu}
                  onChange={(e) =>
                    setFormData({ ...formData, niu: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Adresse du Siège Social
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {kybStep === 2 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#0D1B2A]">
                Étape 2 : Pièces Justificatives Officielles
              </h2>
              <p className="text-xs text-gray-500">
                Téléversez les originaux numérisés en haute résolution (PDF ou image certifiée).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  id: "rccmDoc",
                  title: "Extrait RCCM (< 3 mois)",
                  filename: "RCCM_Afritech_2024.pdf",
                  size: "1.4 Mo",
                },
                {
                  id: "niuDoc",
                  title: "Attestation d'Immatriculation Fiscale (NIU)",
                  filename: "Attestation_NIU_M0524.pdf",
                  size: "820 Ko",
                },
                {
                  id: "statutesDoc",
                  title: "Statuts de la Société (signés et enregistrés)",
                  filename: "Statuts_Afritech_SARL.pdf",
                  size: "3.2 Mo",
                },
                {
                  id: "planDoc",
                  title: "Plan de Localisation / Facture de siège",
                  filename: "Justificatif_Domicile_2026.pdf",
                  size: "950 Ko",
                },
              ].map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-[#4E7C6B] bg-gray-50/50 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-lg bg-[#4E7C6B]/15 text-[#0E3B33]">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">
                        {doc.title}
                      </div>
                      <div className="text-[11px] text-gray-400 font-mono">
                        {doc.filename} · {doc.size}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Téléversé
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {kybStep === 3 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#0D1B2A]">
                Étape 3 : Représentant Légal & Bénéficiaire Effectif (UBO)
              </h2>
              <p className="text-xs text-gray-500">
                Identification du dirigeant signataire habilité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Nom & Prénoms du Dirigeant
                </label>
                <input
                  type="text"
                  value={formData.repName}
                  onChange={(e) =>
                    setFormData({ ...formData, repName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Fonction dans la société
                </label>
                <input
                  type="text"
                  value={formData.repRole}
                  onChange={(e) =>
                    setFormData({ ...formData, repRole: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div className="md:col-span-2 p-4 bg-[#F6F4EE] rounded-xl border border-[#EDECE6] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 rounded-lg bg-[#0E3B33] text-[#D4AF37]">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900">
                      Pièce d'Identité (CNI / Passeport biométrique)
                    </div>
                    <div className="text-[11px] text-gray-500 font-mono">
                      CNI_Kwame_RectoVerso.pdf · Vérifié par OCR
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Liveness Validé
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {kybStep === 4 && (
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="text-sm font-bold text-[#0D1B2A]">
                Étape 4 : Compte de Règlement (Payout Account)
              </h2>
              <p className="text-xs text-gray-500">
                Coordonnées bancaires ou compte marchand de réception de vos reversements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Établissement Bancaire Partenaire
                </label>
                <input
                  type="text"
                  value={formData.payoutBank}
                  onChange={(e) =>
                    setFormData({ ...formData, payoutBank: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Relevé d'Identité Bancaire (RIB / IBAN CEMAC)
                </label>
                <input
                  type="text"
                  value={formData.payoutIban}
                  onChange={(e) =>
                    setFormData({ ...formData, payoutIban: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs font-mono border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0E3B33]"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Le compte bancaire est formellement rattaché au nom légal de l'entreprise (Afritech Solutions SARL). Aucun virement vers compte personnel non autorisé.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E3E5E2]">
          <button
            onClick={handlePrev}
            disabled={kybStep === 1}
            className={`flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-jura font-semibold transition-all ${
              kybStep === 1
                ? "text-gray-300 cursor-not-allowed"
                : "text-[#5F6A70] hover:bg-[#F6F4EE] hover:text-[#0B3E33]"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Précédent</span>
          </button>

          {kybStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center space-x-1.5 px-5 py-2 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-semibold text-xs rounded-full shadow-xs transition-all"
            >
              <span>Continuer</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#DBAE40]" />
            </button>
          ) : (
            <button
              onClick={handleSimulateApproval}
              disabled={isSimulatingReview || kybApproved}
              className="flex items-center space-x-2 px-6 py-2.5 bg-[#0B3E33] hover:bg-[#101E29] text-white font-jura font-bold text-xs rounded-full shadow-xs transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4 text-[#DBAE40]" />
              <span>
                {kybApproved
                  ? "Dossier Validé (Production Active)"
                  : isSimulatingReview
                  ? "Vérification en cours..."
                  : "Soumettre & Valider Définitivement"}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
