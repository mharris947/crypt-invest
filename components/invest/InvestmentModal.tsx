import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { InvestmentPlan } from "./InvestmentPlanCard";
import {
  ArrowRight,
  User,
  Mail,
  Wallet,
  DollarSign,
  Calendar,
  Upload,
  X,
  Image,
} from "lucide-react";
import { FileUploadField } from "./FileUploadField";

interface InvestmentModalProps {
  plan: InvestmentPlan | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FileUpload {
  file: File | null;
  preview: string | null;
}

export function InvestmentModal({
  plan,
  open,
  onOpenChange,
}: InvestmentModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    walletAddress: "",
    amount: "",
  });
  const [idCardFront, setIdCardFront] = useState<FileUpload>({
    file: null,
    preview: null,
  });
  const [idCardBack, setIdCardBack] = useState<FileUpload>({
    file: null,
    preview: null,
  });
  const [paymentScreenshot, setPaymentScreenshot] = useState<FileUpload>({
    file: null,
    preview: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const idFrontRef = useRef<HTMLInputElement>(null);
  const idBackRef = useRef<HTMLInputElement>(null);
  const paymentRef = useRef<HTMLInputElement>(null);

  if (!plan) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<FileUpload>>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setter({ file, preview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (
    setter: React.Dispatch<React.SetStateAction<FileUpload>>
  ) => {
    setter({ file: null, preview: null });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const amount = parseFloat(formData.amount);
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.dateOfBirth ||
      !formData.walletAddress ||
      !formData.amount
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!idCardFront.file || !idCardBack.file || !paymentScreenshot.file) {
      toast({
        title: "Missing Documents",
        description:
          "Please upload all required documents (ID card front, back, and payment screenshot).",
        variant: "destructive",
      });
      return;
    }

    if (amount < plan.minInvestment || amount > plan.maxInvestment) {
      toast({
        title: "Invalid Amount",
        description: `Amount must be between $${plan.minInvestment.toLocaleString()} and $${plan.maxInvestment.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Investment Submitted!",
      description: `Your ${
        plan.name
      } investment of $${amount.toLocaleString()} has been submitted successfully.`,
    });

    setFormData({
      fullName: "",
      email: "",
      dateOfBirth: "",
      walletAddress: "",
      amount: "",
    });
    setIdCardFront({ file: null, preview: null });
    setIdCardBack({ file: null, preview: null });
    setPaymentScreenshot({ file: null, preview: null });
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const expectedReturn =
    parseFloat(formData.amount || "0") * (1 + plan.returnRate / 100);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] bg-black overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Invest in {plan.name}
          </DialogTitle>
          <DialogDescription>
            {plan.returnRate}% return over {plan.duration}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-foreground">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="fullName"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-foreground">
              Date of Birth
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="walletAddress" className="text-foreground">
              Bitcoin Wallet Address
            </Label>
            <div className="relative">
              <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="walletAddress"
                name="walletAddress"
                placeholder="bc1q..."
                value={formData.walletAddress}
                onChange={handleChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-foreground">
              Investment Amount (USD)
            </Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="amount"
                name="amount"
                type="number"
                placeholder={`${plan.minInvestment} - ${plan.maxInvestment}`}
                value={formData.amount}
                onChange={handleChange}
                className="pl-10"
                min={plan.minInvestment}
                max={plan.maxInvestment}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Min: ${plan.minInvestment.toLocaleString()} • Max: $
              {plan.maxInvestment.toLocaleString()}
            </p>
          </div>

          {/* File Upload Fields */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Image className="h-4 w-4" />
              <span>Required Documents</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <FileUploadField
                label="ID Card (Front)"
                fileState={idCardFront}
                setFileState={setIdCardFront}
                inputRef={idFrontRef}
                onFileChange={handleFileChange}
              />
              <FileUploadField
                label="ID Card (Back)"
                fileState={idCardBack}
                setFileState={setIdCardBack}
                inputRef={idBackRef}
                onFileChange={handleFileChange}
              />
              <FileUploadField
                label="Payment Screenshot"
                fileState={paymentScreenshot}
                setFileState={setPaymentScreenshot}
                inputRef={paymentRef}
                onFileChange={handleFileChange}
              />
            </div>
          </div>

          {parseFloat(formData.amount) > 0 && (
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">
                  Expected Return
                </span>
                <span className="font-display text-xl font-bold text-primary">
                  $
                  {expectedReturn.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-muted-foreground text-xs">
                  After {plan.duration}
                </span>
                <span className="text-sm text-success">
                  +$
                  {(
                    expectedReturn - parseFloat(formData.amount)
                  ).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  profit
                </span>
              </div>
            </div>
          )}

          <Button
            type="submit"
            variant="hero"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm Investment"}
            <ArrowRight className="h-4 w-4" />
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
