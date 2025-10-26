import { Trash2 } from "lucide-react";

const TrashWindow = () => (
  <div className="h-full bg-card p-6 overflow-y-auto">
    <h2 className="text-2xl font-bold text-foreground mb-6">Trash</h2>
    <div className="text-center py-12">
      <Trash2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
      <p className="text-card-foreground">Trash is empty</p>
    </div>
  </div>
);

export default TrashWindow;
