import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Lazy GoogleGenAI client
  let aiClient: GoogleGenAI | null = null;
  function getGenAI(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is required');
      }
      aiClient = new GoogleGenAI({ apiKey });
    }
    return aiClient;
  }

  // Maps Grounding endpoint using gemini-3.5-flash with googleMaps tool
  app.post('/api/gemini/maps-grounding', async (req, res) => {
    try {
      const { query, location } = req.body;
      const ai = getGenAI();

      const userLocation = location || 'SoHo, Manhattan, New York, NY';
      const prompt = `You are the location intelligence engine for ProteinPath, an elite luxury high-protein food delivery app.
The user is searching near: ${userLocation}.
Search intent: ${query || 'Top verified high-protein, organic restaurants, macro-focused clean kitchens, and nutrient-dense bowls'}.

Ground your answer in real, live Google Maps data via the googleMaps tool:
1. Provide accurate names, physical street addresses, and neighborhood locations.
2. Note actual Google Maps ratings and popular dish highlights (especially protein count / organic protein sources).
3. Mention current open/closed status or delivery proximity if available.
Keep the style elegant, direct, and luxury-minimalist.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleMaps: {} }],
        },
      });

      const text = response.text || '';
      const groundingMetadata = response.candidates?.[0]?.groundingMetadata || null;

      res.json({
        success: true,
        text,
        groundingMetadata,
      });
    } catch (error: any) {
      console.error('Maps grounding error:', error);
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to fetch Maps Grounded information',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
