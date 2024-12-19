import prisma from "@/lib/prisma";
import { linkSchema } from "@/validation/userValidation";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

// GET Handler
export async function GET() {
  try {
    const profiles = await prisma.profile.findMany();
    return NextResponse.json({ profiles });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json({ message: "Error fetching profiles" }, { status: 500 });
  }
}

// POST Handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = linkSchema.parse(body);

    const savedProfile = await prisma.profile.create({
      data: validatedData,
    });

    return NextResponse.json(
      {
        message: "Profile saved successfully!",
        profile: savedProfile,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Error saving profile:", error);
    return NextResponse.json(
      {
        message: "Internal server error.",
      },
      { status: 500 }
    );
  }
}
