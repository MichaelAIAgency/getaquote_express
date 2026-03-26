import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import OpenAI from "npm:openai@4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT =
  "You are an expert painting contractor's assistant. Analyze photos of surfaces or rooms to be painted and return structured assessments in JSON format only.";

const USER_PROMPT = `Analyze this photo and return ONLY a valid JSON object — no markdown, no explanation — with exactly these fields:

{
  "projectType": "interior" or "exterior",
  "surfaceCondition": "good" (minimal prep, surface is clean and sound) or "medium" (minor cracks or flaking) or "bad" (major repairs needed, heavily damaged),
  "hasCeiling": true or false (is a ceiling visible and likely in scope),
  "needsRepairs": true or false (visible holes, cracks, or damage that needs filling before painting),
  "needsPrimer": true or false (bare surfaces, stains, significant colour change, or poor adhesion likely),
  "estimatedAreaM2": a number estimate of visible paintable wall/surface area in square meters, or null if impossible to determine,
  "conditionReport": "A 2-3 sentence professional condition summary written for the painting contractor. Be specific: mention visible defects, surface type, prep requirements, and any risk factors.",
  "confidence": "low" or "medium" or "high" (overall confidence in the assessment)
}`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "OPENAI_API_KEY is not configured. Please add it to your Supabase project secrets." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { imageUrl } = await req.json();
    if (!imageUrl || typeof imageUrl !== "string") {
      return new Response(
        JSON.stringify({ error: "imageUrl (string) is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: imageUrl, detail: "high" },
            },
            { type: "text", text: USER_PROMPT },
          ],
        },
      ],
      max_tokens: 600,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("Empty response from OpenAI");

    const analysis = JSON.parse(content);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("analyze-photo error:", err);
    return new Response(
      JSON.stringify({ error: "Analysis failed", details: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
