export default function ReservationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-center">Rezervace celoročních setů</h1>
      {children}
    </div>
  );
}
