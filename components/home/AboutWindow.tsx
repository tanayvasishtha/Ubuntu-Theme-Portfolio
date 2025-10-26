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
import { en } from "@/data/en";

const AboutWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary">
          <img
            src={en.personal.profileImage}
            alt={en.personal.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          {en.personal.name}
        </h2>
        <p className="text-card-foreground">{en.personal.title}</p>
      </div>
      <div className="space-y-4 text-card-foreground">
        {en.about.paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 pt-6">
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.github.url, "_blank")}
        >
          <Github className="w-4 h-4 mr-2" />
          {en.about.buttons.github}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.linkedin.url, "_blank")}
        >
          <Linkedin className="w-4 h-4 mr-2" />
          {en.about.buttons.linkedin}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.twitter.url, "_blank")}
        >
          <XLogo className="w-4 h-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.medium.url, "_blank")}
        >
          <BookOpen className="w-4 h-4 mr-2" />
          {en.about.buttons.medium}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.productHunt.url, "_blank")}
        >
          <Zap className="w-4 h-4 mr-2" />
          {en.about.buttons.productHunt}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.peerlist.url, "_blank")}
        >
          <User className="w-4 h-4 mr-2" />
          {en.about.buttons.peerlist}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={() => window.open(en.social.buyMeACoffee.url, "_blank")}
        >
          <Coffee className="w-4 h-4 mr-2" />
          {en.about.buttons.buyMeACoffee}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Download className="w-4 h-4 mr-2" />
          {en.about.buttons.resume}
        </Button>
      </div>
    </div>
  </div>
);

export default AboutWindow;
