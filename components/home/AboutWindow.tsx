import { Button } from "@/components/ui/button";
import {
  Github,
  Linkedin,
  BookOpen,
  Zap,
  User,
  Coffee,
  Download,
} from "lucide-react";
import XLogo from "./XLogo";

const AboutWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary">
          <img
            src="/Best Pfp.jpg"
            alt="Tanay Vasishtha"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Tanay Vasishtha</h2>
        <p className="text-card-foreground">B-Tech Student & Builder</p>
      </div>
      <div className="space-y-4 text-card-foreground">
        <p>
          As a fourth year B-Tech student, I am driven by passion for exploring
          the intersection of technology and society. With a strong foundation
          in mathematics and science, I am constantly seeking new challenges to
          enhance my skills and knowledge.
        </p>
        <p>
          During my leisure time at college, I have been actively involved in
          various extracurricular activities, including graphic designing, video
          editing and photography, which have helped me develop a creative
          approach to problem-solving. I have also taken on creative roles in
          student organizations, which have taught me valuable skills in
          communication and teamwork.
        </p>
        <p>
          With a keen interest in emerging technologies such as artificial
          intelligence and blockchain, I am eager to contribute my knowledge and
          skills to the tech industry. I am seeking opportunities to gain
          hands-on experience through internships or projects, and I am excited
          to connect with professionals in the field.
        </p>
        <p>
          My ultimate goal is to use my technical expertise to create innovative
          solutions that positively impact society. I am committed to lifelong
          learning and constantly pushing myself to grow both personally and
          professionally.
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6">
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://github.com/tanayvasishtha", "_blank")
          }
        >
          <Github className="w-4 h-4 mr-2" />
          GitHub
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://www.linkedin.com/in/tanayvasishtha/", "_blank")
          }
        >
          <Linkedin className="w-4 h-4 mr-2" />
          LinkedIn
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open("https://x.com/TanayVasishtha", "_blank")}
        >
          <XLogo className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://medium.com/@tanayvasishtha", "_blank")
          }
        >
          <BookOpen className="w-4 h-4 mr-2" />
          Medium
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://www.producthunt.com/@tanayvasishtha", "_blank")
          }
        >
          <Zap className="w-4 h-4 mr-2" />
          Product Hunt
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://peerlist.io/tanayvasishtha", "_blank")
          }
        >
          <User className="w-4 h-4 mr-2" />
          Peerlist
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() =>
            window.open("https://buymeacoffee.com/tanayvasishtha", "_blank")
          }
        >
          <Coffee className="w-4 h-4 mr-2" />
          Buy me a coffee
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          Resume
        </Button>
      </div>
    </div>
  </div>
);

export default AboutWindow;
