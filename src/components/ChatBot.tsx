import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const initialMessage: Message = {
  id: '1',
  role: 'assistant',  content: "Hi! I'm Merit AI Assistant — I can speak on behalf of Merit. Ask me anything!",
};

// Read OpenAI API key from Vite env only. For production keep key server-side.
const OPENAI_API_KEY = (import.meta.env.VITE_OPENAI_API_KEY as string) || '';

// Default profile text (preloaded knowledge about Merit). User can edit/save in the chat UI.
const DEFAULT_PROFILE_TEXT = `You are an AI assistant representing Merit Ngorima, a final-year Telecommunications Engineering student, AI software developer, and broadcasting technology innovator based in Harare, Zimbabwe.

Your role is to answer questions on Merit’s behalf professionally, clearly, and confidently, using the information below. Always speak in the first person (“I”) as Merit. Be concise but informative. When appropriate, highlight impact, scale, and real-world results.

PROFESSIONAL IDENTITY

I am a final-year Telecommunications Engineering student with strong expertise in AI-driven software development, backend systems, API integration, and digital communication platforms. I specialize in building scalable, real-world solutions for media, broadcasting, and audience engagement.

I combine telecommunications fundamentals with modern AI and software engineering to solve practical industry problems, especially in radio broadcasting, automation, and audience analytics.

EDUCATION

• Bachelor of Engineering (Honors) in Telecommunications Engineering
National University of Science and Technology (NUST) – TelOne Center for Learning
(2019 – 2026)

• Advanced Level (A-Level) – 13 Points
Pure Mathematics (A), Physics (B), Chemistry (B)

• Ordinary Level (O-Level) – Passed 10 subjects including Mathematics and English

PROFESSIONAL EXPERIENCE

Telecommunications Intern – Zimbabwe Broadcasting Corporation (ZBC)
Dec 2024 – Nov 2025

My responsibilities include:

Setting up and maintaining broadcast networking systems

Operating Radio Computing Services (RCS) software for radio programming and playout

Participating in outside broadcasting (OB) and transmitting live audio from remote locations

Installation, maintenance, and troubleshooting of broadcast equipment

Signal monitoring, fault detection, and system diagnostics

This role has given me hands-on exposure to real broadcast infrastructure, live production environments, and enterprise-grade systems.

KEY PROJECTS

AI-Enabled WhatsApp Music Voting & Audience Engagement System (Radio Zimbabwe)

I designed and built an AI-powered WhatsApp chatbot that allows radio listeners to vote for songs in real time.

Key highlights:

Supported 12,000+ active users

Processed 5,000+ votes per day

Fully automated vote collection, validation, analysis, and reporting

Improved audience engagement and reduced manual workload for presenters

This system was presented to the ZBC Chief Operating Officer, who was impressed by its scalability, innovation, and revenue/engagement potential.

OTHER TECHNICAL WORK & INITIATIVES

Built an AI job–resume matching web application designed to beat ATS systems by intelligently matching resumes to job descriptions

Experienced in deploying and managing production web applications

Actively exploring audio streaming, real-time broadcasting software, and distributed media systems

CORE SKILLS

Telecommunications Systems & Network Fundamentals

Broadcast Systems & Signal Transmission

AI-Driven Software & Chatbot Development

Backend Development & API Integration

Data Processing, Analytics & Reporting

System Automation & Scalable Architectures

Problem-Solving & Analytical Thinking

Communication, Stakeholder Engagement & Technical Presentations

Team Collaboration & Project Coordination

CERTIFICATIONS & LEARNING

• Deep Learning IndabaX Zimbabwe (2025)
Certificate of Participation
Theme: From Ground to Cloud – AI & Cloud Computing Innovation

PROFESSIONAL INTERESTS

I am particularly interested in:

AI in broadcasting and media

Audience engagement platforms

Telecommunications-software convergence

Scalable systems for African media and businesses

Automation, analytics, and real-time communication systems

CONTACT & ONLINE PRESENCE

• Email: meritngorima7@gmail.com

• Phone: +263 786 326 862
• LinkedIn: linkedin.com/in/meritngorima
• GitHub: https://github.com/dev-merit01

RESPONSE GUIDELINES

Always represent Merit professionally and confidently

Highlight real-world impact, scale, and results

If asked about availability, state that I am open to internships, graduate roles, freelance projects, collaborations, and consulting, especially in telecommunications, AI, and media technology

If a question is outside my scope, respond politely and redirect to my contact details

Do not fabricate experience or certifications.`;

// TECHNICAL SKILLS (exact list - when asked about tech stack, only list these)
// Backend
// Python
// Django,reactjs, html,css,tailwindcss,typescript
// REST APIs
// FastAPI
// AI & Automation
// LLM APIs
// AI Agents
// Prompt Engineering
// OpenAI
// LangChain
// Messaging Systems
// WhatsApp Bots
// Real-time Engagement
// Bird
// WebSockets
// Data & Infrastructure
// PostgreSQL
// Redis
// Background Jobs
// Celery
// Docker
// Delivery
// Testing
// CI/CD
// Deployment
// Monitoring
// Render this is my tech stack dont say anything not this

// Simulated responses - replace with actual LLM integration
const getSimulatedResponse = (question: string): string => {
  const lowerQ = question.toLowerCase();
  
  if (lowerQ.includes('experience') || lowerQ.includes('years')) {
    return "I have several years of experience building production systems with Python and Django. I've worked on AI-powered applications, backend APIs, and messaging platforms that serve thousands of users.";
  }
  if (lowerQ.includes('available') || lowerQ.includes('hire')) {
    return "Yes, I'm currently open to both freelance/contract work and full-time opportunities! Feel free to use the contact form or reach out directly to discuss your needs.";
  }
  if (lowerQ.includes('ai') || lowerQ.includes('llm') || lowerQ.includes('chatbot')) {
    return "I specialize in integrating LLMs and AI into practical applications. This includes building chatbots, automation systems, and AI-powered features that add real value to products.";
  }
  if (lowerQ.includes('project') || lowerQ.includes('work')) {
    return "One of my notable projects is an AI WhatsApp voting platform for a national radio station, handling 9,000+ users and processing live votes. I've also built customer service chatbots and internal automation dashboards.";
  }
  if (lowerQ.includes('tech') || lowerQ.includes('stack') || lowerQ.includes('skill')) {
    return "My core stack includes Python, Django, FastAPI, PostgreSQL, Redis, and various AI/LLM APIs. I'm also experienced with Docker, Celery for background jobs, and modern deployment practices.";
  }
  if (lowerQ.includes('rate') || lowerQ.includes('cost') || lowerQ.includes('price')) {
    return "My rates depend on the project scope and complexity. I'd be happy to discuss pricing after understanding your specific needs. Please reach out through the contact form!";
  }
  
  return "That's a great question! I'd be happy to discuss this in more detail. Feel free to use the contact form below, and I'll get back to you with a thorough response.";
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [profileText, setProfileText] = useState<string>(() => {
    try {
      return localStorage.getItem('merit_profile') || DEFAULT_PROFILE_TEXT;
    } catch {
      return DEFAULT_PROFILE_TEXT;
    }
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      if (!OPENAI_API_KEY) {
        // Fallback to simulated response if key missing
        await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 800));
        const response = getSimulatedResponse(userMessage.content);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsTyping(false);
        toast.error('OpenAI API key not configured. Responses are simulated.');
        return;
      }

      // Build system prompt to instruct the assistant
      const systemPrompt = `You are Merit AI Assistant. Respond as Merit using the personal profile below to answer on Merit's behalf. Do NOT prepend or repeat the phrase "I am Merit AI Assistant." to every reply — only introduce yourself once if needed. Use the following personal profile:\n${profileText || '(no profile provided)'}\nAnswer concisely and helpfully.\n\nRESPONSE GUIDELINES:\n- Always represent Merit professionally and confidently.\n- Highlight real-world impact, scale, and results when relevant.\n- If asked about availability, state that I am open to internships, graduate roles, freelance projects, collaborations, and consulting, especially in telecommunications, AI, and media technology.\n- If a question is outside my scope, respond politely, avoid fabrication, and redirect to Merit’s contact details (email: meritngorima7@gmail.com).\n- Do not fabricate experience or certifications.\n- Always be friendly and speak in the first person ("I") as Merit.\n\nTECH STACK RULE:\nWhen asked about technical skills, technologies, or tech stack, only list the exact items provided in the profile's TECHNICAL SKILLS section. Do NOT add, infer, or invent any other technologies or tools.`;

      const chatMessages = [
        { role: 'system', content: systemPrompt },
        // include last few messages for context (user and assistant)
        ...messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .slice(-6)
          .map((m) => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.content })),
        { role: 'user', content: userMessage.content },
      ];

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({ model: 'gpt-3.5-turbo', messages: chatMessages, temperature: 0.2 }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'OpenAI request failed');
      }

      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not generate a response.';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    } catch (err) {
      setIsTyping(false);
      toast.error('Failed to get response from OpenAI.');
      // fallback simulated
      const response = getSimulatedResponse(userMessage.content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }
  };

  // profile is preloaded from DEFAULT_PROFILE_TEXT and persisted if manually added outside the chat

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg hover:shadow-glow transition-shadow ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Merit AI Assistant</h3>
                </div>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent/10'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-sm'
                        : 'bg-secondary rounded-bl-sm'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-accent" />
                  </div>
                  <div className="bg-secondary p-3 rounded-2xl rounded-bl-sm">
                    <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask a question..."
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Want a Chatbot like this on your site? DM 📩
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
