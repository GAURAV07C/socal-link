import Profile from "@/model/Profile";
import { linkSchema } from "@/validation/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// GET Handler
export async function GET() {
    try {
        // Fetch all profiles from the database
        const profiles = await Profile.find({});
        return NextResponse.json({ profiles });
      } catch (error) {
        console.error("Error fetching profiles:", error);
        return NextResponse.json({ message: "Error fetching profiles" }, { status: 500 });
      }
    }


// POST Handler
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const validatedData = linkSchema.parse(body);

    // Save validated data to MongoDB
    const newProfile = new Profile(validatedData);
    const savedProfile = await newProfile.save();

    return NextResponse.json(
      {
        message: "Profile saved successfully!",
        profile: savedProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      // Handle Zod validation errors
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error saving profile:", error);

    // Handle other errors
    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
