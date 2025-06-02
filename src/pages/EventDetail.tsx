import Navbar from '@/components/Navbar';
import EventDetail from '@/components/EventDetail';
import Footer from '@/components/Footer';

const events = [
  {
    id: "design-thinking",
    title: "Hack For Business",
    date: "June 21-23, 2025",
    time: "48 Hours",
    location: "Multipurpose Hall, KU",
    description: "A 48-hour hackathon where teams will compete to build innovative solutions to real-world problems.",
    imageUrl: "https://i.imgur.com/SZIDrs6.png",
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
