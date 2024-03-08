import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogDemoProps {
  onContinue?: () => void;
}

export const AlertDialogDemo: React.FC<AlertDialogDemoProps> = ({
  onContinue,
}) => {
  const handleContinue = () => {
    if (onContinue) {
      onContinue();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="h-8 rounded px-3">
          Odstranit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Jste si jistý?</AlertDialogTitle>
          <AlertDialogDescription className="text-red-500">
            Tahle akce vymaže váš úkol!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction className="bg-red-500" onClick={handleContinue}>
            Ano, chci odstranit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
