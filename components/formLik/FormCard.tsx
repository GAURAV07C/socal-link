'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema } from "@/validation/userValidation";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";

const FormCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage loading
  const form = useForm({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      name: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const onSubmit = async (data: Record<string, string>) => {
    setIsSubmitting(true); // Start loader
    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Profile saved successfully!");
        console.log("Profile saved:", result.profile);
        form.reset(); // Reset the form after successful submission
      } else {
        toast.error(result.message || "Failed to save profile.");
        console.error("Error saving profile:", result.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false); // Stop loader
    }
  };

  const platforms: ("instagram" | "linkedin" | "twitter" | "facebook")[] = [
    "instagram",
    "linkedin",
    "twitter",
    "facebook",
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="bg-richblack-900 text-white max-w-lg w-full p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-bold">
            Update Your Social Media Profiles
          </CardTitle>
          <CardDescription className="text-gray-400">
            Please enter the links to your social media accounts below and update your image in drive link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social Media Links */}
              {platforms.map((platform) => (
                <FormField
                  key={platform}
                  name={platform}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {platform.charAt(0).toUpperCase() + platform.slice(1)} Profile Link
                      </FormLabel>
                      <FormControl>
                        <Input placeholder={`Enter your ${platform} profile link`} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Submit Button */}
              <Button
                type="submit"
                className={`w-full ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                disabled={isSubmitting} // Disable button during submission
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormCard;
