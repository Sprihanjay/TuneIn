import { NextRequest, NextResponse } from "next/server";
import { CohereClient } from "cohere-ai";

// Ensure to replace this with your actual API key management approach
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || "", // Read from environment variables
});

// Define the handler for the POST method
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Call Cohere API
    const response = await cohere.chat({ message });

    // Return the response from the Cohere API
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error with Cohere API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
