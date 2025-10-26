const NotepadWindow = () => (
  <div className="h-full bg-card p-4 font-mono text-sm">
    <div className="h-full overflow-y-auto whitespace-pre-wrap text-foreground">
      {`# Ubuntu Portfolio Commands Guide
# Welcome to my interactive portfolio!

## Basic Commands:
help           - Show this help guide
clear          - Clear terminal history
banner         - Display the header
history        - View command history

## About Commands:
whois          - Who is Tanay?
whoami         - Who are you?
social         - Display social networks
projects       - View coding projects
email          - Contact me
sponsor me     - Support me on Buy Me a Coffee

## AI & Fun Commands:
ai             - Ask the AI assistant
matrix         - Enter the Matrix
hack           - Hacker mode activated
love           - Show some love
sudo           - Only use if you're admin

## Secret Commands:
secret         - Find the password (hint: try 'Banger')

## Social Links:
github         - Open GitHub profile
linkedin       - Open LinkedIn profile
twitter        - Open Twitter profile

## Project Commands:
darkmodebang   - Open Dark Mode Bang extension
volumebang     - Open Volume Bang extension
speedbang      - Open Speed Bang extension
weloveqr       - Open WeLoveQR web app

## Tips:
- All commands are case-sensitive
- Use arrow keys to navigate command history
- Type 'help' anytime for this guide
- Some commands have hidden features!

Happy exploring! 🐧`}
    </div>
  </div>
);

export default NotepadWindow;
