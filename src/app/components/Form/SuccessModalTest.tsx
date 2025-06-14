import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation"
import { useEffect } from "react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    path: string;
    isEdditing: boolean
}

export const SuccessModalTest = ({ isOpen, onClose, path, isEdditing }: SuccessModalProps) => {
    const router = useRouter();
    
    useEffect(() => {
        if (isOpen) {
            router.prefetch(path);
        }
    }, [path, router, isOpen]);

    const handleClose = () => {
        onClose();
        router.push(path);
    };

    const header = {
        title: isEdditing ? "Rezervace byla úspěšně upravena" : "Rezervace byla úspěšně vytvořena",
        description: isEdditing ? "" : "Děkujeme za rezervaci. Na váš email jsme zaslali potvrzení."
    }

    return (
        <Dialog defaultOpen>
            <DialogContent className="">
                <CircleCheck  color="green" size={70} className="mx-auto"/>
                <DialogHeader>
                    <DialogTitle className="text-center">{header.title}</DialogTitle>
                    <DialogDescription className="text-center">
                        {header.description}
                    </DialogDescription>
                    <DialogDescription className="text-center">
                        Těšíme se na vás!
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-2">
                    <Button onClick={handleClose}>
                        Zavřít
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}