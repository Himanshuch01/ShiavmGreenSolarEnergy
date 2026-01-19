import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator as CalcIcon, Zap, IndianRupee, Leaf, Sun, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CountUp from "@/components/shared/CountUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import StructuredData, { organizationSchema } from "@/components/seo/StructuredData";

const baseUrl = "https://shivamgreensolarenergy.in";

const calculatorSchema = z.object({
  monthlyBill: z.number().min(500, "Minimum bill should be ₹500").max(1000000, "Maximum bill is ₹10,00,000"),
  city: z.string().min(1, "Please select a city"),
  rooftopSize: z.number().min(100, "Minimum area is 100 sq ft").max(100000, "Maximum area is 1,00,000 sq ft"),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const cities = [
  { name: "Mumbai", factor: 4.5, state: "Maharashtra" },
  { name: "Delhi", factor: 5.0, state: "Delhi" },
  { name: "Bangalore", factor: 4.8, state: "Karnataka" },
  { name: "Chennai", factor: 5.2, state: "Tamil Nadu" },
  { name: "Hyderabad", factor: 5.0, state: "Telangana" },
  { name: "Ahmedabad", factor: 5.3, state: "Gujarat" },
  { name: "Kolkata", factor: 4.2, state: "West Bengal" },
  { name: "Pune", factor: 4.7, state: "Maharashtra" },
  { name: "Jaipur", factor: 5.5, state: "Rajasthan" },
  { name: "Lucknow", factor: 4.8, state: "Uttar Pradesh" },
];

// Subsidy structure based on system capacity
const getSubsidy = (systemSize: number, state: string) => {
  let centralSubsidy = 0;
  let stateSubsidy = 0;

  if (systemSize >= 1 && systemSize < 2) {
    centralSubsidy = 30000;
    stateSubsidy = state === "Uttar Pradesh" ? 15000 : 0;
  } else if (systemSize >= 2 && systemSize < 3) {
    centralSubsidy = 60000;
    stateSubsidy = state === "Uttar Pradesh" ? 30000 : 0;
  } else if (systemSize >= 3 && systemSize < 4) {
    centralSubsidy = 78000;
    stateSubsidy = state === "Uttar Pradesh" ? 30000 : 0;
  } else if (systemSize >= 4 && systemSize <= 10) {
    centralSubsidy = 78000;
    stateSubsidy = state === "Uttar Pradesh" ? 30000 : 0;
  } else {
    // For systems > 10kW, no subsidy
    centralSubsidy = 0;
    stateSubsidy = 0;
  }

  return {
    central: centralSubsidy,
    state: stateSubsidy,
    total: centralSubsidy + stateSubsidy,
  };
};

interface Results {
  systemSize: number;
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  subsidyAmount: number;
  approxCostAfterSubsidy: number;
  centralSubsidy: number;
  stateSubsidy: number;
}

export default function Calculator() {
  const [results, setResults] = useState<Results | null>(null);
  const [showResults, setShowResults] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CalculatorForm>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      monthlyBill: 3000,
      city: "",
      rooftopSize: 500,
    },
  });

  const onSubmit = async (data: CalculatorForm) => {
    const cityData = cities.find((c) => c.name === data.city);
    const sunHours = cityData?.factor || 4.5;
    const state = cityData?.state || "Uttar Pradesh";

    // Calculate system size based on bill (assuming ₹8 per unit)
    const monthlyUnits = data.monthlyBill / 8;
    const dailyUnits = monthlyUnits / 30;
    const systemSize = Math.ceil((dailyUnits / sunHours) * 1.2); // 20% buffer

    // Calculate max system based on rooftop (100 sq ft per kW)
    const maxSystemByRoof = Math.floor(data.rooftopSize / 100);
    const finalSystemSize = Math.min(systemSize, maxSystemByRoof);

    // Approximate cost calculation (varies between ₹45,000 - ₹60,000 per kW)
    // Using average of ₹52,500 per kW as approximation
    const costPerKw = 52500;
    const estimatedCost = finalSystemSize * costPerKw;

    // Get subsidy based on system size and state
    const subsidy = getSubsidy(finalSystemSize, state);

    // Approximate cost after subsidy
    const approxCostAfterSubsidy = estimatedCost - subsidy.total;

    // Annual savings (approximately 85% of current bill)
    const annualSavings = data.monthlyBill * 12 * 0.85;

    // Approximate payback period
    const paybackPeriod = approxCostAfterSubsidy / annualSavings;

    // CO2 reduction (approximately 1500 kg per kW per year)
    const co2Reduction = finalSystemSize * 1500;

    const calculatedResults = {
      systemSize: finalSystemSize,
      estimatedCost: Math.round(estimatedCost),
      approxCostAfterSubsidy: Math.round(approxCostAfterSubsidy),
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: Math.round(co2Reduction),
      subsidyAmount: subsidy.total,
      centralSubsidy: subsidy.central,
      stateSubsidy: subsidy.state,
    };

    setResults(calculatedResults);
    setShowResults(true);

    // Save calculation to Supabase for lead tracking
    try {
      await supabase
        .from("calculator_results")
        .insert([
          {
            monthly_bill: data.monthlyBill,
            city: data.city,
            rooftop_size: data.rooftopSize,
            system_size: calculatedResults.systemSize,
            estimated_cost: calculatedResults.approxCostAfterSubsidy,
            annual_savings: calculatedResults.annualSavings,
            payback_period: calculatedResults.paybackPeriod,
            co2_reduction: calculatedResults.co2Reduction,
            subsidy_amount: calculatedResults.subsidyAmount,
          },
        ]);
    } catch (error) {
      // Silently fail - don't interrupt user experience if save fails
      console.error("Error saving calculator result:", error);
    }
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>Solar Calculator – Shivam Green Solar Energy</title>
        <meta
          name="description"
          content="Use our free solar calculator to estimate your solar system size, cost, and savings. Calculate approximate installation cost, subsidy amount, payback period, and annual savings for your home or business in India."
        />
        <meta
          name="keywords"
          /* SEO: Include primary keywords */
          content="shivam solar, shivam solar energy, shivamgreen solar, shivam green solar energy, solar energy company in India, rooftop solar solutions, solar calculator"
        />
        <link rel="canonical" href={`${baseUrl}/calculator`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${baseUrl}/calculator`} />
        <meta property="og:title" content="Solar Calculator - Calculate Your Solar Savings | Shivam GreenSolar Energy" />
        <meta property="og:description" content="Use our free solar calculator to estimate your solar system size, cost, and savings. Find out how much you can save with solar energy." />
        <meta property="og:image" content={`${baseUrl}/logoo1.png`} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Solar Calculator - Shivam GreenSolar Energy" />
        <meta name="twitter:description" content="Calculate your solar savings with our free calculator. Estimate system size, cost, and ROI." />
      </Helmet>

      <StructuredData
        type="Service"
        data={{
          serviceType: "Solar Energy Calculator",
          provider: organizationSchema,
          areaServed: "IN",
          description: "Free solar calculator to estimate system size, cost, savings, and payback period",
        }}
      />

      <Navbar />

      <main className="pt-24">
        {/* Hero */}
        <section className="section-padding bg-hero-pattern">
          <div className="container-custom">
            <AnimatedSection className="text-center max-w-4xl mx-auto">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Solar Calculator
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Calculate Your{" "}
                <span className="text-gradient">Solar Savings</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find out how much you can save with solar energy. Get instant estimates
                for system size, cost, and environmental impact.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* Calculator */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <div className="glass-card p-6 sm:p-8 md:p-12">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-xl bg-solar-gradient shadow-glow flex items-center justify-center shrink-0">
                      <CalcIcon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl sm:text-2xl font-bold">Solar Savings Calculator</h2>
                      <p className="text-muted-foreground text-sm sm:text-base">Enter your details below</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyBill">Monthly Electricity Bill (₹)</Label>
                        <Input
                          id="monthlyBill"
                          type="number"
                          placeholder="e.g., 5000"
                          {...register("monthlyBill", { valueAsNumber: true })}
                          className="h-12"
                        />
                        {errors.monthlyBill && (
                          <p className="text-sm text-destructive">{errors.monthlyBill.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="city">Select City</Label>
                        <Select onValueChange={(value) => setValue("city", value)}>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cities.map((city) => (
                              <SelectItem key={city.name} value={city.name}>
                                {city.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.city && (
                          <p className="text-sm text-destructive">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                        <Label htmlFor="rooftopSize">Rooftop Area (sq ft)</Label>
                        <Input
                          id="rooftopSize"
                          type="number"
                          placeholder="e.g., 500"
                          {...register("rooftopSize", { valueAsNumber: true })}
                          className="h-12"
                        />
                        {errors.rooftopSize && (
                          <p className="text-sm text-destructive">{errors.rooftopSize.message}</p>
                        )}
                      </div>
                    </div>

                    <Button type="submit" variant="hero" size="xl" className="w-full">
                      <CalcIcon className="w-5 h-5" />
                      Calculate Savings
                    </Button>
                  </form>
                </div>
              </AnimatedSection>

              {/* Results */}
              <AnimatePresence>
                {showResults && results && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-8"
                  >
                    <div className="glass-card p-6 sm:p-8 md:p-12">
                      <h3 className="font-display text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
                        Your Solar Estimate
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="glass-card p-6 text-center">
                          <Sun className="w-10 h-10 text-primary mx-auto mb-3" />
                          <p className="text-3xl font-display font-bold text-primary">
                            <CountUp end={results.systemSize} suffix=" kW" />
                          </p>
                          <p className="text-muted-foreground">Approx. System Size</p>
                        </div>

                        <div className="glass-card p-6 text-center">
                          <IndianRupee className="w-10 h-10 text-secondary mx-auto mb-3" />
                          <p className="text-3xl font-display font-bold text-secondary">
                            <CountUp end={results.approxCostAfterSubsidy} prefix="₹" />
                          </p>
                          <p className="text-muted-foreground">Approx. Cost (After Subsidy)</p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Total: ₹{results.estimatedCost.toLocaleString()}
                          </p>
                        </div>

                        <div className="glass-card p-6 text-center">
                          <Zap className="w-10 h-10 text-accent mx-auto mb-3" />
                          <p className="text-3xl font-display font-bold text-accent">
                            <CountUp end={results.annualSavings} prefix="₹" />
                          </p>
                          <p className="text-muted-foreground">Approx. Annual Savings</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl">
                            ~{results.paybackPeriod} Years
                          </p>
                          <p className="text-sm text-muted-foreground">Approx. Payback Period</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl">
                            ₹{results.subsidyAmount.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Subsidy
                            {results.stateSubsidy > 0 && (
                              <span className="block text-xs mt-1">
                                (Central: ₹{results.centralSubsidy.toLocaleString()} + State: ₹{results.stateSubsidy.toLocaleString()})
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl flex items-center justify-center gap-1">
                            <Leaf className="w-5 h-5 text-primary" />
                            ~{results.co2Reduction.toLocaleString()} kg
                          </p>
                          <p className="text-sm text-muted-foreground">Approx. CO₂ Reduced/Year</p>
                        </div>
                      </div>

                      <div className="mb-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm text-muted-foreground text-center">
                          <strong className="text-foreground">Note:</strong> All values are approximate and may vary based on actual system requirements, installation conditions, and current market rates. Final pricing will be provided after site inspection.
                        </p>
                      </div>

                      <div className="text-center">
                        <p className="text-muted-foreground mb-4">
                          Ready to start saving? Get a detailed quote from our experts.
                        </p>
                        <Button variant="hero" size="xl" asChild>
                          <Link to="/contact" className="group">
                            Get Free Quote
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
