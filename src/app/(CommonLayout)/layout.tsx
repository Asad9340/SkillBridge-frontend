import { Navbar } from "@/components/layout/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4">
          <Navbar />
        </div>
      </div>

      {/* Page Content */}
      <main className="pt-20 max-w-7xl mx-auto px-4">{children}</main>
    </div>
  );
};

export default RootLayout;
