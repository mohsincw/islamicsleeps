import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { ageGroup, theme, childName } = await req.json();

    if (!ageGroup || !theme) {
      return NextResponse.json(
        { error: "Age group and theme are required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Story generation is not configured. Please add your xAI API key." },
        { status: 500 }
      );
    }

    const ageDescriptions: Record<string, string> = {
      toddler:
        "a toddler aged 2-5. Use very simple words, short sentences, and a gentle tone. The story should be about 200-300 words.",
      kids: "a child aged 5-10. Use moderate vocabulary with some descriptive language. The story should be about 400-600 words.",
      preteen:
        "a preteen aged 10+. Use rich vocabulary and complex narrative structure. The story should be about 600-800 words.",
    };

    const nameInstruction = childName
      ? `The main character's name should be "${childName}".`
      : "Give the main character a common Muslim name.";

    const prompt = `You are a skilled Islamic storyteller. Write a beautiful, heartwarming bedtime story for ${ageDescriptions[ageGroup] || ageDescriptions.kids}

The story should revolve around the Islamic theme of: ${theme}

${nameInstruction}

Requirements:
- The story must be grounded in authentic Islamic values from the Quran and Sunnah
- Include a clear moral lesson at the end
- Use a warm, gentle, soothing tone appropriate for bedtime
- Avoid any scary, violent, or disturbing content
- You may reference Prophets, Companions, or Islamic teachings where appropriate
- Make the story engaging with vivid but calming imagery

Format your response as:
TITLE: [story title]
STORY:
[the full story text]`;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3",
        messages: [
          {
            role: "system",
            content:
              "You are a warm, gentle Islamic storyteller who crafts beautiful bedtime stories for Muslim children. Your stories are rooted in the Quran and Sunnah, promoting good character, love for Allah, and Islamic values.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("xAI API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate story. Please try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "";

    // Parse title and story from the response
    let title = "A Bedtime Story";
    let story = content;

    const titleMatch = content.match(/TITLE:\s*(.+?)(?:\n|STORY:)/);
    if (titleMatch) {
      title = titleMatch[1].trim();
    }

    const storyMatch = content.match(/STORY:\s*([\s\S]+)/);
    if (storyMatch) {
      story = storyMatch[1].trim();
    }

    return NextResponse.json({ title, story });
  } catch (error) {
    console.error("Generate error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
