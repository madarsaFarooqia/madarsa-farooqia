import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, X, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, title = 'Delete Item', message = 'Are you sure you want to delete this? This action cannot be undone.', loading = false }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="font-playfair font-bold text-foreground">{title}</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl" disabled={loading}>
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={loading}
              className="flex-1 rounded-xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Trash2 className="w-4 h-4 mr-2" />Delete</>}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}