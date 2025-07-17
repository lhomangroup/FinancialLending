import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Briefcase, Store, Building2 } from "lucide-react";

export default function PricingGrid() {
  const pricingData = [
    {
      type: "Particulier",
      price: "150",
      icon: Users,
      justification: "Moins de ressources, mais bénéficie d'un accès facilité au financement en Afrique.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      priceColor: "text-blue-700",
    },
    {
      type: "Indépendant",
      price: "250",
      icon: Briefcase,
      justification: "Cherche du financement pour lancer ou renforcer une activité. Bénéficie du réseau LhoMan Group.",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      priceColor: "text-green-700",
    },
    {
      type: "Commerçant",
      price: "300",
      icon: Store,
      justification: "Potentiel de transaction plus élevé, grâce rapide que sur financement ou à l'approvisionnement.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      priceColor: "text-orange-700",
    },
    {
      type: "Entreprise (SASU, SARL, etc.)",
      price: "500",
      icon: Building2,
      justification: "Accompagnement stratégique, mise en réseau, intermédiation professionnelle, service premium.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      priceColor: "text-purple-700",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Tarification France
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nos frais de dossier sont adaptés selon votre profil et vos besoins spécifiques
          </p>
          <Badge variant="outline" className="mt-4 bg-blue-100 text-blue-800 border-blue-300">
            Tarification personnalisée pour les clients basés en France
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
                    <span className={`text-4xl font-bold ${item.priceColor}`}>
                      {item.price}€
                    </span>
                    <p className="text-sm text-gray-600 mt-1">Frais de dossier</p>
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
          <div className="bg-gray-50 rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Informations importantes
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium mb-1">✓ Tarification transparente</p>
                <p>Prix fixes selon votre profil professionnel</p>
              </div>
              <div>
                <p className="font-medium mb-1">✓ Accompagnement personnalisé</p>
                <p>Service adapté à vos besoins spécifiques</p>
              </div>
              <div>
                <p className="font-medium mb-1">✓ Réseau LhoMan Group</p>
                <p>Accès privilégié à notre réseau de partenaires</p>
              </div>
              <div>
                <p className="font-medium mb-1">✓ Paiement à la soumission</p>
                <p>Frais dus uniquement lors de la validation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}