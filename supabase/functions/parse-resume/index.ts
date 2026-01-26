import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Read file content
    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    
    // Convert to base64 for AI processing
    const base64Content = btoa(String.fromCharCode(...bytes));
    
    // Determine file type
    const fileType = file.name.endsWith('.pdf') ? 'pdf' : 'docx';
    
    // Use Lovable AI Gateway to extract resume information
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    // For PDF/DOCX, we'll send the text extraction request
    // First, let's extract text content based on file type
    let textContent = '';
    
    if (fileType === 'pdf') {
      // Extract text from PDF using pdf-parse logic
      textContent = extractTextFromPDF(bytes);
    } else {
      // Extract text from DOCX
      textContent = extractTextFromDOCX(bytes);
    }

    // Use AI to analyze the resume text
    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a resume parser. Extract the following information from the resume text and return ONLY a valid JSON object with no additional text:
{
  "skills": ["list of technical and soft skills"],
  "experience": "experience level description (e.g., 'Fresher (0-1 years)', '2-3 years', '5+ years')",
  "education": "highest education qualification with field",
  "tools": ["list of tools and technologies mentioned"],
  "keywords": ["important keywords and phrases from the resume"]
}

Be thorough in extracting skills, including programming languages, frameworks, databases, and soft skills.`
          },
          {
            role: 'user',
            content: `Parse this resume and extract the information:\n\n${textContent}`
          }
        ],
        temperature: 0.1,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error('AI Gateway error:', errorText);
      throw new Error('Failed to analyze resume with AI');
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || '';
    
    // Parse the JSON response from AI
    let parsedData;
    try {
      // Clean the response - remove markdown code blocks if present
      let cleanedContent = aiContent.trim();
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.slice(7);
      }
      if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith('```')) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      parsedData = JSON.parse(cleanedContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      // Fallback to basic extraction
      parsedData = {
        skills: extractSkillsFromText(textContent),
        experience: extractExperienceFromText(textContent),
        education: extractEducationFromText(textContent),
        tools: extractToolsFromText(textContent),
        keywords: extractKeywordsFromText(textContent),
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: parsedData,
        rawText: textContent.substring(0, 500) + '...' // Preview of extracted text
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error parsing resume:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to parse resume';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

// Basic PDF text extraction
function extractTextFromPDF(bytes: Uint8Array): string {
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  
  // Extract text between stream markers (simplified PDF parsing)
  const textParts: string[] = [];
  
  // Look for text objects in PDF
  const streamRegex = /stream\s*([\s\S]*?)\s*endstream/g;
  let match;
  
  while ((match = streamRegex.exec(text)) !== null) {
    const content = match[1];
    // Extract text from Tj/TJ operators
    const tjRegex = /\(([^)]*)\)\s*Tj/g;
    let tjMatch;
    while ((tjMatch = tjRegex.exec(content)) !== null) {
      textParts.push(tjMatch[1]);
    }
  }
  
  // Also look for plain text content
  const plainTextRegex = /\/Contents\s*\(([^)]+)\)/g;
  while ((match = plainTextRegex.exec(text)) !== null) {
    textParts.push(match[1]);
  }
  
  // Fallback: extract any readable ASCII text
  if (textParts.length === 0) {
    const readableText = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return readableText;
  }
  
  return textParts.join(' ').trim();
}

// Basic DOCX text extraction
function extractTextFromDOCX(bytes: Uint8Array): string {
  const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
  
  // DOCX is a ZIP file containing XML
  // Try to find text content in the XML
  const textParts: string[] = [];
  
  // Look for text between XML tags
  const textRegex = /<w:t[^>]*>([^<]*)<\/w:t>/g;
  let match;
  
  while ((match = textRegex.exec(text)) !== null) {
    if (match[1].trim()) {
      textParts.push(match[1]);
    }
  }
  
  // Fallback: extract readable text
  if (textParts.length === 0) {
    const readableText = text.replace(/[^\x20-\x7E\n\r\t]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return readableText;
  }
  
  return textParts.join(' ').trim();
}

// Fallback extraction functions
function extractSkillsFromText(text: string): string[] {
  const skillPatterns = [
    /\b(JavaScript|TypeScript|Python|Java|C\+\+|C#|Ruby|Go|Rust|PHP|Swift|Kotlin)\b/gi,
    /\b(React|Angular|Vue|Node\.js|Express|Django|Flask|Spring|\.NET)\b/gi,
    /\b(SQL|MySQL|PostgreSQL|MongoDB|Redis|Firebase|GraphQL)\b/gi,
    /\b(AWS|Azure|GCP|Docker|Kubernetes|Jenkins|Git)\b/gi,
    /\b(HTML|CSS|SASS|LESS|Tailwind|Bootstrap)\b/gi,
    /\b(Machine Learning|AI|Deep Learning|NLP|Computer Vision)\b/gi,
    /\b(Agile|Scrum|JIRA|Confluence|Trello)\b/gi,
  ];
  
  const skills = new Set<string>();
  skillPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(skill => skills.add(skill));
    }
  });
  
  return Array.from(skills);
}

function extractExperienceFromText(text: string): string {
  const expPatterns = [
    /(\d+)\s*\+?\s*years?\s*(of)?\s*experience/i,
    /experience\s*[:]\s*(\d+)\s*years?/i,
    /fresher|fresh graduate|entry.?level/i,
  ];
  
  for (const pattern of expPatterns) {
    const match = text.match(pattern);
    if (match) {
      if (match[1]) {
        const years = parseInt(match[1]);
        if (years <= 1) return 'Fresher (0-1 years)';
        if (years <= 3) return `${years} years experience`;
        if (years <= 5) return `${years} years experience`;
        return `${years}+ years experience`;
      }
      return 'Fresher (0-1 years)';
    }
  }
  
  return 'Not specified';
}

function extractEducationFromText(text: string): string {
  const eduPatterns = [
    /\b(Ph\.?D|Doctorate|Doctor)\b.*?(Computer Science|Engineering|Business|Science)/i,
    /\b(M\.?S\.?|M\.?Tech|MBA|Master'?s?)\b.*?(Computer Science|Engineering|Business|Science)/i,
    /\b(B\.?E\.?|B\.?Tech|B\.?S\.?|Bachelor'?s?)\b.*?(Computer Science|Engineering|Electronics|Mechanical|Civil)/i,
    /\b(Diploma)\b.*?(Engineering|Computer)/i,
  ];
  
  for (const pattern of eduPatterns) {
    const match = text.match(pattern);
    if (match) {
      return match[0].trim();
    }
  }
  
  return 'Not specified';
}

function extractToolsFromText(text: string): string[] {
  const toolPatterns = [
    /\b(VS Code|Visual Studio|IntelliJ|Eclipse|PyCharm|Sublime|Atom|Vim)\b/gi,
    /\b(Git|GitHub|GitLab|Bitbucket|SVN)\b/gi,
    /\b(Postman|Insomnia|Swagger|curl)\b/gi,
    /\b(Figma|Sketch|Adobe XD|Photoshop|Illustrator)\b/gi,
    /\b(Slack|Teams|Zoom|Discord)\b/gi,
    /\b(JIRA|Confluence|Trello|Asana|Monday)\b/gi,
    /\b(npm|yarn|pip|maven|gradle)\b/gi,
  ];
  
  const tools = new Set<string>();
  toolPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(tool => tools.add(tool));
    }
  });
  
  return Array.from(tools);
}

function extractKeywordsFromText(text: string): string[] {
  const keywordPatterns = [
    /\b(Full Stack|Frontend|Backend|DevOps|Cloud|Mobile|Web)\b/gi,
    /\b(Agile|Scrum|Waterfall|Kanban)\b/gi,
    /\b(Team Lead|Tech Lead|Manager|Senior|Junior|Principal)\b/gi,
    /\b(Problem Solving|Communication|Leadership|Teamwork)\b/gi,
    /\b(REST|API|Microservices|Architecture|Design Patterns)\b/gi,
  ];
  
  const keywords = new Set<string>();
  keywordPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(kw => keywords.add(kw));
    }
  });
  
  return Array.from(keywords);
}
