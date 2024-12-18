'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { linkSchema } from "@/validation/userValidation"; // Import the schema
// import { z } from "zod";
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"; // Import your Card components

const FromCard = () => {
  const form = useForm({
    resolver: zodResolver(linkSchema), // Connect schema
    defaultValues: {
      name: "",
      instagram: "",
      linkedin: "",
      twitter: "",
      facebook: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/saveProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Profile saved:", result.profile);
      } else {
        console.error("Error saving profile:", result.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="bg-richblack-900 text-white max-w-lg w-full p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-white text-2xl font-bold">
            Update Your Social Media Profiles
          </CardTitle>
          <CardDescription className="text-gray-400">
            Please enter the links to your social media accounts below. 
            Remember to update your photo in Google Drive. The link has been shared in the WhatsApp group.
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
                      <Input
                        placeholder="Enter your name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Social Media Links */}
              {["instagram", "linkedin", "twitter", "facebook"].map((platform) => (
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
                        <Input
                          placeholder={`Enter your ${platform} profile link`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FromCard;
