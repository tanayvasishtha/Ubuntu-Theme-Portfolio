import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";
import XLogo from "./XLogo";

const ContactWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        Get In Touch
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">Email</p>
            <p className="text-card-foreground">edgepersonal2004@gmail.com</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Github className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">GitHub</p>
            <p className="text-card-foreground">@tanayvasishtha</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Linkedin className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">LinkedIn</p>
            <p className="text-card-foreground">/in/tanayvasishtha</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <XLogo className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">X</p>
            <p className="text-card-foreground">@TanayVasishtha</p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => window.open("https://x.com/TanayVasishtha", "_blank")}
        >
          <Mail className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>
    </div>
  </div>
);

export default ContactWindow;
