import React from "react";
import { Mail, Phone, Star, Compass, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutModal = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center w-full  backdrop-blur-sm p-4 overflow-y-auto scroll-smooth"
      onClick={() => navigate("/")}
    >
      <div  
        className="relative w-full max-w-lg bg-white rounded-3xl border border-gray-500 shadow-2xl p-6 animate-[fadeIn_.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">About Me 👋</h2>
          <p className="text-sm text-gray-500">A quick intro about me</p>
        </div>

        {/* Info */}
        <div className="grid gap-3">
          <Card emoji="👨‍💻" title="Creator" value="Akash Prajapati" />
          <Card emoji="📍" title="Location" value="Unnao, Uttar Pradesh" />
          <Card emoji="🏫" title="College" value="Somdev Mahavidyalaya" />
        </div>

        {/* Sections */}
        <Section icon={<Star size={16} />} title="Passion">
          Coding aur UI/UX design mera main interest hai.
        </Section>

        <Section icon={<BookOpen size={16} />} title="Journey">
          2025 me CodeYogi se start kiya aur HTML, CSS, JS, React seekha.
        </Section>

        <Section icon={<Compass size={16} />} title="Hobbies">
          Coding, 3D printing aur new tech explore karna.
        </Section>

        {/* Contact */}
        <div className="mt-5 border-t pt-4">
          <p className="font-semibold text-gray-700 mb-2">Contact</p>
          <a
            href="mailto:akashprajapati1952@gmail.com"
            className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
          >
            <Mail size={14} /> akashprajapati1952@gmail.com
          </a>
          <a
            href="tel:9651073396"
            className="flex items-center gap-2 text-green-600 text-sm hover:underline mt-1"
          >
            <Phone size={14} /> 9651073396
          </a>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full py-3 bg-linear-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:scale-[1.02] active:scale-[0.98] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

interface CardProps {
  emoji: string;
  title: string;
  value: string;
}

const Card = ({ emoji, title, value }: CardProps) => (
  <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl">
    <span className="text-xl">{emoji}</span>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-sm font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const Section = ({ icon, title, children }: SectionProps) => (
  <div className="bg-gray-50 p-4 rounded-xl mt-4">
    <div className="flex items-center gap-2 mb-1 text-gray-700 font-semibold text-sm">
      {icon} {title}
    </div>
    <p className="text-sm text-gray-600">{children}</p>
  </div>
);

export default AboutModal;