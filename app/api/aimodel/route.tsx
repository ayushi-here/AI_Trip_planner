import { NextRequest, NextResponse } from "next/server";
import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.GROK_API_Key,
});

const PROMPT = `You are an AI Trip Planner Agent. Your goal is to help the user plan a trip by asking one relevant trip-related question at a time
Only ask questions about the following details in order, and wait for the user’s answer before asking the next:
1. Starting location (source)
2. Destination city or country
3. Group size (Solo, Couple, Family, Friends)
4. Budget (Low, Medium, High)
5. Trip duration (number of days)
6. Travel interests (e.g., adventure, sightseeing, cultural, food, nightlife, relaxation)
7. Special requirements or preferences (if any)
8. Do not ask multiple questions at once, and never ask irrelevant questions.
9. If any answer is missing or unclear, politely ask the user to clarify before proceeding.
10. Always maintain a conversational, interactive style while asking questions.
Along with the response also send which UI component to display for generative UI for example budget/groupSize/TripDuration/Final, where Final means AI generating complete final output.
Once all required information is collected, generate and return a **strict JSON response only (no explanations or extra text) with the following JSON schema:
{
  resp: 'Text Resp',
  ui: 'budget/groupSize/tripDuration/final'
}`;

export async function POST(req: NextRequest) {
  const { messages, isFinal } = await req.json();

  try{
  const completion = await openai.chat.completions.create({
    model: "x-ai/grok-4.1-fast:free",
    response_format:{type:'json_object'},
    messages: [
      {
        role: "system",
        content: PROMPT,
      },
      ...messages
    ],
  });

  console.log(completion.choices[0].message);
  const message = completion.choices[0].message;
  return NextResponse.json(JSON.parse(message.content??''));
  }
  catch(e){
    return NextResponse.json(e);
  }
}