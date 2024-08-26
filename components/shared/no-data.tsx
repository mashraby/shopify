import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageX } from "lucide-react";

interface NoDataProps {
  message?: string;
  desc?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function NoData({
  message = "No data available",
  desc = "The requested information is currently unavailable.",
  actionLabel,
  onAction,
}: NoDataProps) {
  return (
    <Card className="w-full flex justify-center items-center">
      <CardContent className="flex flex-col items-center justify-center space-y-4 text-center p-6">
        <PackageX className="h-12 w-12 text-muted-foreground" />
        <h2 className="text-xl font-semibold">{message}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="outline">
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
