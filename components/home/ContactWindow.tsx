import { Button } from "@/components/ui/button";
import { Mail, Github, Linkedin } from "lucide-react";
import XLogo from "./XLogo";
import { en } from "@/data/en";

const ContactWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
        {en.contact.title}
      </h2>
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Mail className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">
              {en.contact.fields.email.label}
            </p>
            <p className="text-card-foreground">
              {en.contact.fields.email.value}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Github className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">
              {en.contact.fields.github.label}
            </p>
            <p className="text-card-foreground">
              {en.contact.fields.github.value}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <Linkedin className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">
              {en.contact.fields.linkedin.label}
            </p>
            <p className="text-card-foreground">
              {en.contact.fields.linkedin.value}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3 p-3 border border-border rounded-lg">
          <XLogo className="w-5 h-5 text-primary" />
          <div>
            <p className="font-medium text-foreground">
              {en.contact.fields.twitter.label}
            </p>
            <p className="text-card-foreground">
              {en.contact.fields.twitter.value}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => window.open(en.social.twitter.url, "_blank")}
        >
          <Mail className="w-4 h-4 mr-2" />
          {en.contact.button}
        </Button>
      </div>
    </div>
  </div>
);

export default ContactWindow;
