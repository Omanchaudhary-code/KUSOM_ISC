import Navbar from '@/components/Navbar';
import EventDetail from '@/components/EventDetail';
import Footer from '@/components/Footer';

const events = [
  {
    id: "web-dev-workshop",
    title: "Web Development Workshop",
    date: "March 30, 2025 onwards",
    time: "12:00 PM - 3:00 PM",
    location: "Computer Lab, Block 10",
    description: "Learn the fundamentals of modern web development with HTML, CSS, and JavaScript.",
    imageUrl: "https://i.imgur.com/wMJkWRA.jpeg",
    longDescription: `
      Join us for an immersive workshop focused on modern web development technologies and best practices. 
      This hands-on session will guide you through the fundamentals of HTML, CSS, and JavaScript, 
      equipping you with the skills to build responsive and interactive websites.
      
      You'll learn how to structure content with semantic HTML, style your pages with CSS, and add 
      interactivity with JavaScript. By the end of this workshop, you'll have built a fully functional 
      website from scratch and gained valuable skills applicable to frontend development careers.
    `,
    targetAudience: "Students interested in web development, from beginners to those with some coding experience.",
    prerequisites: [
      "Basic computer knowledge",
      "Laptop with a modern browser installed",
      "Text editor (VS Code recommended)"
    ],
  
    speakers: [
      {
        name: "Oman Chaudhary",
        role: "Technical Head at IS Club",
        imageUrl: "https://i.imgur.com/vlHPt4T.jpeg"
      },
      {
        name: "Niraj Prasad Sah",
        role: "Secretary at IS Club",
        imageUrl: "https://i.imgur.com/ozI1oZ2.jpeg"
      }
    ]
  },
  {
    id: "design-thinking",
    title: "Hack For Business",
    date: "June 21-23, 2025",
    time: "48 Hours",
    location: "Multipurpose Hall, KU",
    description: "A 48-hour hackathon where teams will compete to build innovative solutions to real-world problems.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    longDescription: `
      Design Thinking is a methodology used by designers to solve complex problems and find desirable solutions for clients. 
      In this seminar, we'll explore how design thinking can be applied to various business challenges.
      
      The workshop will cover the five stages of design thinking: Empathize, Define, Ideate, Prototype, and Test. 
      Through hands-on activities and case studies, you'll learn how to apply these principles to create innovative 
      solutions that are centered around user needs and experiences.
    `,
    targetAudience: "Business students, aspiring entrepreneurs, and anyone interested in innovative problem-solving.",
    prerequisites: [
      "No technical prerequisites required",
      "Bring your laptop"
    ],
    schedule: [
      { time: "1:00 PM", activity: "Introduction to Design Thinking" },
      { time: "1:30 PM", activity: "Empathize & Define Stages" },
      { time: "2:15 PM", activity: "Coffee Break" },
      { time: "2:30 PM", activity: "Ideate, Prototype & Test Stages" },
      { time: "3:15 PM", activity: "Case Study Discussion & Closing" }
    ]
  },
  {
    id: "tech-symposium",
    title: "Annual Tech Symposium",
    date: "December 10, 2023",
    time: "9:00 AM - 4:00 PM",
    location: "KUSOM Main Hall",
    description: "Our flagship event featuring industry speakers, tech showcases, and networking opportunities.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    longDescription: `
      The Annual Tech Symposium is our flagship event bringing together industry leaders, innovative startups, 
      and passionate students for a day of learning, networking, and inspiration.
      
      This year's symposium focuses on emerging technologies and their impact on business and society. 
      The event will feature keynote speeches, panel discussions, tech demonstrations, and networking sessions. 
      It's a perfect opportunity to gain insights into the latest tech trends and connect with professionals in the field.
    `,
    targetAudience: "Students, faculty, industry professionals, and anyone interested in technology and its applications.",
    prerequisites: [],
    schedule: [
      { time: "9:00 AM", activity: "Registration & Breakfast" },
      { time: "10:00 AM", activity: "Opening Keynote: 'The Future of Tech'" },
      { time: "11:00 AM", activity: "Panel Discussion: 'AI in Business'" },
      { time: "12:00 PM", activity: "Lunch & Networking" },
      { time: "1:30 PM", activity: "Tech Showcase & Demonstrations" },
      { time: "2:30 PM", activity: "Breakout Sessions" },
      { time: "3:30 PM", activity: "Closing Keynote & Awards" }
    ],
    speakers: [
      {
        name: "Dr. James Wong",
        role: "CTO, FutureTech Inc.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
      },
      {
        name: "Lisa Patel",
        role: "AI Research Scientist",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
      },
      {
        name: "Mark Anderson",
        role: "Startup Founder & Tech Entrepreneur",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
      }
    ]
    
  },
  {
    id: "ai-bootcamp",
    title: "AI Innovation Bootcamp",
    date: "August 1, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "KUSOM Innovation Lab",
    description: "A comprehensive one-day bootcamp exploring the latest developments in Artificial Intelligence and its applications.",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcc9e20d",
    longDescription: `
      Join us for an intensive one-day bootcamp focused on Artificial Intelligence and its transformative impact across industries. 
      This event is designed to provide both theoretical knowledge and practical experience in AI technologies.
      
      Through hands-on workshops, expert-led sessions, and real-world case studies, participants will gain insights into:
      - Machine Learning fundamentals and applications
      - Natural Language Processing and its business uses
      - Computer Vision and image recognition
      - Ethical considerations in AI development
      - AI implementation strategies for businesses
      
      Whether you're a student, professional, or entrepreneur, this bootcamp will equip you with valuable knowledge and skills 
      to navigate the AI landscape and leverage its potential in your field.
    `,
    targetAudience: "Students, professionals, and entrepreneurs interested in AI and its applications across various industries.",
    prerequisites: [
      "Basic understanding of programming concepts",
      "Laptop with Python installed (we'll provide setup instructions)",
      "Curiosity and enthusiasm for AI technology"
    ],
    schedule: [
      { time: "9:00 AM", activity: "Registration & Welcome" },
      { time: "9:30 AM", activity: "Introduction to AI & Machine Learning" },
      { time: "11:00 AM", activity: "Hands-on ML Workshop" },
      { time: "12:30 PM", activity: "Lunch & Networking" },
      { time: "1:30 PM", activity: "NLP & Computer Vision Applications" },
      { time: "3:00 PM", activity: "Coffee Break" },
      { time: "3:30 PM", activity: "AI Ethics & Implementation Strategies" },
      { time: "4:30 PM", activity: "Q&A and Closing Remarks" }
    ],
    speakers: [
      {
        name: "Dr. Sarah Chen",
        role: "AI Research Lead at TechInnovate",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2"
      },
      {
        name: "Alex Kumar",
        role: "Machine Learning Engineer",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
      },
      {
        name: "Dr. Emily Park",
        role: "AI Ethics Specialist",
        imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
      }
    ]
  }
];

const EventDetailPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <EventDetail events={events} />
      </main>
      <Footer />
    </div>
  );
};

export default EventDetailPage;
