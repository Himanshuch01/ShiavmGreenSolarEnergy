import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Star, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase, Testimonial } from "@/lib/supabase";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role/Title must be at least 2 characters").max(200),
  content: z.string().min(20, "Review must be at least 20 characters").max(1000),
  rating: z.number().min(1).max(5),
  image_url: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type TestimonialForm = z.infer<typeof testimonialSchema>;

export default function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<TestimonialForm>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      rating: 0,
      image_url: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data: TestimonialForm) => {
    setIsSubmitting(true);
    try {
      const testimonialData: Omit<Testimonial, "id" | "created_at" | "updated_at" | "is_approved"> = {
        name: data.name,
        role: data.role,
        content: data.content,
        rating: data.rating,
        image_url: data.image_url || null,
      };

      const { error } = await supabase.from("testimonials").insert([testimonialData]);

      if (error) throw error;

      toast({
        title: "Thank you!",
        description: "Your testimonial has been submitted and will be reviewed before being published.",
      });

      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error: any) {
      console.error("Error submitting testimonial:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit testimonial. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="glass-card p-8 text-center">
        <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          Your testimonial has been submitted successfully. It will be reviewed and published soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="glass-card p-6 sm:p-8 space-y-6">
      <div>
        <h3 className="font-display text-2xl font-bold mb-2">Share Your Experience</h3>
        <p className="text-muted-foreground">
          Help others make informed decisions by sharing your experience with Shivam GreenSolar Energy.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="John Doe"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="role">Your Role/Title *</Label>
          <Input
            id="role"
            {...register("role")}
            placeholder="Homeowner, Mumbai"
            className="mt-1"
          />
          {errors.role && (
            <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="rating">Rating *</Label>
        <div className="flex gap-2 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setValue("rating", star, { shouldValidate: true })}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="focus:outline-none"
            >
              <Star
                className={`w-8 h-8 transition-colors ${
                  star <= (hoveredRating || rating)
                    ? "fill-accent text-accent"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          ))}
        </div>
        {errors.rating && (
          <p className="text-sm text-destructive mt-1">Please select a rating</p>
        )}
      </div>

      <div>
        <Label htmlFor="content">Your Review *</Label>
        <Textarea
          id="content"
          {...register("content")}
          placeholder="Tell us about your experience with our solar installation..."
          className="mt-1 min-h-[120px]"
        />
        {errors.content && (
          <p className="text-sm text-destructive mt-1">{errors.content.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="image_url">Profile Image URL (Optional)</Label>
        <Input
          id="image_url"
          type="url"
          {...register("image_url")}
          placeholder="https://example.com/your-photo.jpg"
          className="mt-1"
        />
        {errors.image_url && (
          <p className="text-sm text-destructive mt-1">{errors.image_url.message}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          Leave empty to use a default avatar
        </p>
      </div>

      <Button
        type="submit"
        variant="hero"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          "Submitting..."
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Submit Testimonial
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Your testimonial will be reviewed before being published on our website.
      </p>
    </form>
  );
}
