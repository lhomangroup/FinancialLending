import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Store, MapPin } from "lucide-react";

export default function PricingGridIvoryCoast() {
  const pricingData = [
    {
      type: "Particulier",
      price: "50 000",
      currency: "FCFA",
      icon: Users,
      justification: "Petit ticket, service d'orientation et de suivi minimum.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      priceColor: "text-blue-700",
    },
    {
      type: "Indépendant",
      price: "75 000",
      currency: "FCFA",
      icon: Briefcase,
      justification: "Accès au réseau, support pour obtenir financement ou clients.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      priceColor: "text-green-700",
    },
    {
      type: "Commerçant",
      price: "100 000",
      currency: "FCFA",
      icon: Store,
      justification: "Forte valeur perçue, logistique ou sourcing intégré.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      priceColor: "text-orange-700",
    },
    {
      type: "Entreprise locale",
      price: "150 000",
      currency: "FCFA",
      icon: MapPin,
      justification: "Conseil, appui au financement structuré, formalisation.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      priceColor: "text-purple-700",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tarification Côte d'Ivoire
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tarifs adaptés au marché local avec accompagnement personnalisé
          </p>
          <Badge variant="outline" className="mt-4 bg-orange-100 text-orange-800 border-orange-300">
            Tarification en francs CFA pour les clients basés en Côte d'Ivoire
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {pricingData.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Card 
                key={index} 
                className={`${item.bgColor} ${item.borderColor} border-2 hover:shadow-lg transition-shadow duration-300`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 ${item.bgColor} rounded-full flex items-center justify-center border-2 ${item.borderColor}`}>
                      <IconComponent className={`${item.iconColor} text-2xl`} size={32} />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                    {item.type}
                  </CardTitle>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${item.priceColor} mb-1`}>
                      {item.price}
                    </div>
                    <div className={`text-lg font-semibold ${item.priceColor} mb-1`}>
                      {item.currency}
                    </div>
                    <p className="text-sm text-gray-600">Frais de dossier</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2">
                        Justification
                      </h4>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {item.justification}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto border border-orange-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Avantages spécifiques Côte d'Ivoire
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium mb-1">🌍 Adaptation locale</p>
                <p>Tarifs ajustés au marché ivoirien</p>
              </div>
              <div>
                <p className="font-medium mb-1">🤝 Réseau local</p>
                <p>Partenaires financiers en Côte d'Ivoire</p>
              </div>
              <div>
                <p className="font-medium mb-1">📋 Accompagnement</p>
                <p>Support pour la formalisation des entreprises</p>
              </div>
              <div>
                <p className="font-medium mb-1">💼 Services intégrés</p>
                <p>Logistique et sourcing pour les commerçants</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-sm text-orange-800">
                <strong>Paiement mobile disponible :</strong> Orange Money, MTN Money, Moov Money
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}