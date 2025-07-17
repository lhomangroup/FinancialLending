import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Smartphone, Bitcoin, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  processingFee: number;
  currency: string;
  clientType: string;
  country: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  processingFee,
  currency,
  clientType,
  country
}: PaymentModalProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const isCoteIvoire = country === "Côte d'Ivoire";
  const isEuropeAmericaAsia = ["France"].includes(country); // Peut être étendu

  const mobileMoneyOptions = [
    { id: "orange-money", name: "Orange Money", icon: "🟠", description: "Paiement via Orange Money" },
    { id: "mtn-money", name: "MTN Money", icon: "🟡", description: "Paiement via MTN Mobile Money" },
    { id: "moov-money", name: "Moov Money", icon: "🔵", description: "Paiement via Moov Money" },
  ];

  const cryptoOptions = [
    { id: "bitcoin", name: "Bitcoin", icon: "₿", description: "Paiement en Bitcoin" },
    { id: "ethereum", name: "Ethereum", icon: "Ξ", description: "Paiement en Ethereum" },
    { id: "usdt", name: "USDT", icon: "₮", description: "Paiement en Tether USD" },
  ];

  const cardOptions = [
    { id: "visa", name: "Visa", icon: "💳", description: "Carte Visa" },
    { id: "mastercard", name: "Mastercard", icon: "💳", description: "Carte Mastercard" },
    { id: "paypal", name: "PayPal", icon: "🟦", description: "Paiement PayPal" },
  ];

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      toast({
        title: "Méthode de paiement requise",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulation du processus de paiement
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Paiement réussi",
        description: `Votre paiement de ${processingFee}${currency} a été traité avec succès.`,
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du traitement du paiement.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentOptions = () => {
    if (isCoteIvoire) {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Smartphone className="h-5 w-5 mr-2" />
              Mobile Money
            </h3>
            <div className="grid gap-2">
              {mobileMoneyOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedPaymentMethod === option.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Bitcoin className="h-5 w-5 mr-2" />
              Crypto-monnaies
            </h3>
            <div className="grid gap-2">
              {cryptoOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedPaymentMethod === option.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Carte bancaire
            </h3>
            <div className="grid gap-2">
              {cardOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedPaymentMethod === option.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Bitcoin className="h-5 w-5 mr-2" />
              Crypto-monnaies
            </h3>
            <div className="grid gap-2">
              {cryptoOptions.map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all ${
                    selectedPaymentMethod === option.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPaymentMethod(option.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <p className="font-medium">{option.name}</p>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Globe className="h-6 w-6" />
            <span>Paiement des frais de dossier</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Résumé du paiement */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Résumé du paiement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Profil client :</span>
                  <Badge variant="outline">{clientType}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Localisation :</span>
                  <Badge variant="outline">{country}</Badge>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Frais de dossier :</span>
                  <span className="text-2xl font-bold text-primary">
                    {processingFee}{currency}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Options de paiement */}
          <div>
            <h2 className="text-lg font-semibold mb-4">
              Choisissez votre méthode de paiement
            </h2>
            {renderPaymentOptions()}
          </div>
          
          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={onClose} disabled={isProcessing}>
              Annuler
            </Button>
            <Button 
              onClick={handlePayment} 
              disabled={!selectedPaymentMethod || isProcessing}
              className="min-w-[120px]"
            >
              {isProcessing ? "Traitement..." : "Payer maintenant"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}