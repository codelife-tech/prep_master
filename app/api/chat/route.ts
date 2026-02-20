import { supabase } from '../../../constants/supabase';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, userId } = body;

        // Get the session from Supabase to verify the user
        const authHeader = req.headers.get('Authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return Response.json({ error: 'Missing token' }, { status: 401 });
        }

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return Response.json({ error: 'Invalid token' }, { status: 401 });
        }

        // Apply the user's requested check
        // Note: In this context, we check if the userId provided in the body matches the authenticated user
        if (userId !== user.id) {
            return Response.json(
                { error: 'Unauthorized' }, { status: 401 }
            );
        }

        if (!message) {
            return Response.json({ error: 'Message is required' }, { status: 400 });
        }

        // Mock AI response for now
        // In a real implementation, you would call an LLM API here
        const aiResponse = `I am your AI Tutor. You asked: "${message}". In the context of PrepMaster GH, I can help you understand BECE and WASSCE concepts. What specific topic would you like to dive into?`;

        return Response.json({
            message: aiResponse,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
