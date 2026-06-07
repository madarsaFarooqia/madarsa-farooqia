import { FarooqiaLogoWithBg } from "../../assets/index";

export default function LoadingSpinner({
  text = "Loading...",
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />

        <img
          src={FarooqiaLogoWithBg}
          alt="Farooqia"
          className="relative h-20 w-20 animate-[spin_8s_linear_infinite]"
        />
      </div>

      {text && (
        <p className="text-sm text-muted-foreground">
          {text}
        </p>
      )}
    </div>
  );
}