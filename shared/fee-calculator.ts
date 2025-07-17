// Fee calculator for segmented processing fees
// Based on client type, country, and payment capacity

export type ClientType = "particulier" | "indépendant" | "commerçant" | "entreprise";
export type Country = "France" | "Côte d'Ivoire";

export interface FeeCalculationParams {
  clientType: ClientType;
  country: Country;
  monthlyIncome: string;
  loanAmount: number;
}

export interface FeeResult {
  processingFee: number;
  description: string;
  breakdown: {
    baseRate: number;
    countryMultiplier: number;
    incomeAdjustment: number;
    finalFee: number;
  };
}

// Base fees by client type (in euros) - Updated based on France pricing grid
const BASE_FEES: Record<ClientType, number> = {
  particulier: 150,
  indépendant: 250,
  commerçant: 300,
  entreprise: 500,
};

// Country multipliers
const COUNTRY_MULTIPLIERS: Record<Country, number> = {
  France: 1.0,
  "Côte d'Ivoire": 0.75, // Lower fees for Côte d'Ivoire market
};

// Income-based adjustments
const getIncomeAdjustment = (monthlyIncome: string, loanAmount: number): number => {
  const incomeRanges = {
    "moins-1000": 0.85,
    "1000-1500": 0.90,
    "1500-2000": 1.0,
    "2000-2500": 1.1,
    "2500-3000": 1.2,
    "3000-4000": 1.3,
    "plus-4000": 1.4,
  };

  const incomeMultiplier = incomeRanges[monthlyIncome as keyof typeof incomeRanges] || 1.0;
  
  // Additional adjustment based on loan amount to income ratio
  const baseIncome = getAverageIncome(monthlyIncome);
  const loanToIncomeRatio = loanAmount / baseIncome;
  
  let ratioAdjustment = 1.0;
  if (loanToIncomeRatio > 2.0) {
    ratioAdjustment = 1.15; // Higher fee for higher risk
  } else if (loanToIncomeRatio > 1.5) {
    ratioAdjustment = 1.05;
  } else if (loanToIncomeRatio < 0.8) {
    ratioAdjustment = 0.95; // Lower fee for lower risk
  }

  return incomeMultiplier * ratioAdjustment;
};

const getAverageIncome = (monthlyIncome: string): number => {
  const incomeAverages = {
    "moins-1000": 800,
    "1000-1500": 1250,
    "1500-2000": 1750,
    "2000-2500": 2250,
    "2500-3000": 2750,
    "3000-4000": 3500,
    "plus-4000": 4500,
  };

  return incomeAverages[monthlyIncome as keyof typeof incomeAverages] || 1750;
};

export const calculateProcessingFee = (params: FeeCalculationParams): FeeResult => {
  const { clientType, country, monthlyIncome, loanAmount } = params;
  
  const baseRate = BASE_FEES[clientType];
  const countryMultiplier = COUNTRY_MULTIPLIERS[country];
  const incomeAdjustment = getIncomeAdjustment(monthlyIncome, loanAmount);
  
  const finalFee = Math.round(baseRate * countryMultiplier * incomeAdjustment);
  
  // Ensure minimum fee of 100€ and maximum of 500€
  const cappedFee = Math.max(100, Math.min(500, finalFee));
  
  const descriptions = {
    particulier: "Particulier",
    indépendant: "Travailleur indépendant",
    commerçant: "Commerçant",
    entreprise: "Entreprise",
  };

  return {
    processingFee: cappedFee,
    description: `Frais de dossier pour ${descriptions[clientType]} - ${country}`,
    breakdown: {
      baseRate,
      countryMultiplier,
      incomeAdjustment,
      finalFee: cappedFee,
    },
  };
};

// Helper function to get fee ranges for display - Updated based on France pricing grid
export const getFeeRanges = (): Record<ClientType, { min: number; max: number }> => {
  return {
    particulier: { min: 150, max: 150 }, // Fixed price for France
    indépendant: { min: 250, max: 250 }, // Fixed price for France
    commerçant: { min: 300, max: 300 }, // Fixed price for France
    entreprise: { min: 500, max: 500 }, // Fixed price for France
  };
};