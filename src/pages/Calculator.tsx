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

const calculatorSchema = z.object({
  monthlyBill: z.number().min(500, "Minimum bill should be ₹500").max(1000000, "Maximum bill is ₹10,00,000"),
  city: z.string().min(1, "Please select a city"),
  rooftopSize: z.number().min(100, "Minimum area is 100 sq ft").max(100000, "Maximum area is 1,00,000 sq ft"),
});

type CalculatorForm = z.infer<typeof calculatorSchema>;

const cities = [
  { name: "Mumbai", factor: 4.5 },
  { name: "Delhi", factor: 5.0 },
  { name: "Bangalore", factor: 4.8 },
  { name: "Chennai", factor: 5.2 },
  { name: "Hyderabad", factor: 5.0 },
  { name: "Ahmedabad", factor: 5.3 },
  { name: "Kolkata", factor: 4.2 },
  { name: "Pune", factor: 4.7 },
  { name: "Jaipur", factor: 5.5 },
  { name: "Lucknow", factor: 4.8 },
];

interface Results {
  systemSize: number;
  estimatedCost: number;
  annualSavings: number;
  paybackPeriod: number;
  co2Reduction: number;
  subsidyAmount: number;
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

    // Calculate system size based on bill (assuming ₹8 per unit)
    const monthlyUnits = data.monthlyBill / 8;
    const dailyUnits = monthlyUnits / 30;
    const systemSize = Math.ceil((dailyUnits / sunHours) * 1.2); // 20% buffer

    // Calculate max system based on rooftop (100 sq ft per kW)
    const maxSystemByRoof = Math.floor(data.rooftopSize / 100);
    const finalSystemSize = Math.min(systemSize, maxSystemByRoof);

    // Cost calculation (₹50,000 per kW average)
    const estimatedCost = finalSystemSize * 50000;

    // Subsidy (40% for first 3kW, 20% for next 7kW)
    let subsidy = 0;
    if (finalSystemSize <= 3) {
      subsidy = estimatedCost * 0.4;
    } else if (finalSystemSize <= 10) {
      subsidy = 3 * 50000 * 0.4 + (finalSystemSize - 3) * 50000 * 0.2;
    } else {
      subsidy = 3 * 50000 * 0.4 + 7 * 50000 * 0.2;
    }

    const netCost = estimatedCost - subsidy;
    const annualSavings = data.monthlyBill * 12 * 0.85; // 85% savings
    const paybackPeriod = netCost / annualSavings;
    const co2Reduction = finalSystemSize * 1500; // 1500 kg per kW per year

    const calculatedResults = {
      systemSize: finalSystemSize,
      estimatedCost: netCost,
      annualSavings: Math.round(annualSavings),
      paybackPeriod: Math.round(paybackPeriod * 10) / 10,
      co2Reduction: co2Reduction,
      subsidyAmount: Math.round(subsidy),
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
            estimated_cost: calculatedResults.estimatedCost,
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
        <title>Solar Calculator - Shivam GreenSolar Energy | Calculate Your Solar Savings</title>
        <meta
          name="description"
          content="Use our free solar calculator to estimate your solar system size, cost, and savings. Find out how much you can save with solar energy."
        />
      </Helmet>

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
                          <p className="text-muted-foreground">Recommended System</p>
                        </div>

                        <div className="glass-card p-6 text-center">
                          <IndianRupee className="w-10 h-10 text-secondary mx-auto mb-3" />
                          <p className="text-3xl font-display font-bold text-secondary">
                            <CountUp end={results.estimatedCost} prefix="₹" />
                          </p>
                          <p className="text-muted-foreground">Net Cost (After Subsidy)</p>
                        </div>

                        <div className="glass-card p-6 text-center">
                          <Zap className="w-10 h-10 text-accent mx-auto mb-3" />
                          <p className="text-3xl font-display font-bold text-accent">
                            <CountUp end={results.annualSavings} prefix="₹" />
                          </p>
                          <p className="text-muted-foreground">Annual Savings</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl">
                            {results.paybackPeriod} Years
                          </p>
                          <p className="text-sm text-muted-foreground">Payback Period</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl">
                            ₹{results.subsidyAmount.toLocaleString()}
                          </p>
                          <p className="text-sm text-muted-foreground">Govt Subsidy</p>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-muted">
                          <p className="font-display font-bold text-xl flex items-center justify-center gap-1">
                            <Leaf className="w-5 h-5 text-primary" />
                            {results.co2Reduction.toLocaleString()} kg
                          </p>
                          <p className="text-sm text-muted-foreground">CO₂ Reduced/Year</p>
                        </div>
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
