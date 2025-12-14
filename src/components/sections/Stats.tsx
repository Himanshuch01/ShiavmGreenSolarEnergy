import { Sun, Users, Leaf, Award } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import CountUp from "@/components/shared/CountUp";

const stats = [
  {
    icon: Sun,
    value: 10000,
    suffix: "+",
    label: "Solar Installations",
    description: "Across India",
  },
  {
    icon: Users,
    value: 15000,
    suffix: "+",
    label: "Happy Customers",
    description: "And growing",
  },
  {
    icon: Leaf,
    value: 50,
    suffix: "M+",
    label: "kg CO₂ Reduced",
    description: "Every year",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Years Experience",
    description: "Industry leader",
  },
];

export default function Stats() {
  return (
    <section className="py-20 bg-muted">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection key={stat.label} delay={index * 0.1}>
              <div className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-solar-gradient shadow-glow flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="font-medium text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
