export function cn(...classes: (string | Record<string, boolean>)[]): string {
  return classes
    .flatMap((cls) =>
      typeof cls === "string"
        ? cls
        : Object.entries(cls)
            .filter(([_, value]) => value)
            .map(([key]) => key),
    )
    .filter(Boolean)
    .join(" ");
}
